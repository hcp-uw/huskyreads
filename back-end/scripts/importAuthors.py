import json
import mysql.connector
from mysql.connector import errorcode
import requests

CONFIG = {
  'user': 'b9845397f0efbd',
  'password': 'b7ddb604',
  'host': 'us-cdbr-east-05.cleardb.net',
  'database': 'heroku_b0ffa4bc48eba93',
  'port': 3306,     # MAKE SURE THIS PORT ALIGNS WITH YOUR PORT IN THE .env FILE
  'raise_on_warnings': True
}

def connectToDatabase():
    """ Creates connection to the MySQL Database

    Returns:
        The database connection object
    """
    try:
        cnx = mysql.connector.connect(**CONFIG)
        return cnx
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)

def retrieveAuthorIds(filePath: str):
    """ Retrieves unique author ids for authors who wrote the books in the provided file

        Args:
            filePath:
                The file-path to the JSON file containing the data

        Expected:
            JSON file to contain field "data", with value [arr] where each indice contains book data

        Returns:
            Set of author ids
    """
    f = open(filePath)
    data = json.load(f)
    # Assumes data field is called "data" - this is controlled by the data modifying code
    authorIds = set()
    for book in data["data"]:
        authors = book.get("authors")
        if authors:
            for author in authors:
                authorId = author.get("key").split("/")[2]
                authorIds.add(authorId)
    f.close()
    return authorIds

def getAuthorData(authorIds: set):
    """ Gets data for each author from the Open Library Authors API

        Args:
            authorIds:
                A set containing author ids

        Returns:
            A list of author data objects.
            Author data is in the format: {"id": author_id, "name": author_name}
    """
    authors = list()
    for authorId in authorIds:
        response = requests.get(f'https://openlibrary.org/authors/{authorId}.json')
        if response.status_code == requests.codes.ok:
            responseBody = response.json()
            authorName = responseBody.get("name")
            author = {"id": authorId, "name": authorName}
            authors.append(author)
        else:
            print(f'error getting author: {authorId}')
            print(f'request HTTP code: {response.status_code}')
    return authors

def importAuthorData(authors: list, cnx: object):
    """ Imports author data into the Author Table

        Args:
            authorsData:
                List of Authors
            cnx:
                The connection object to the database
        Expected:
            Each element of authors list is a dictionary with format {"id": author_id, "name": author_name}
            author_id, author_name expected to be strings
    """
    cursor = cnx.cursor()
    for author in authors:
        query = "INSERT INTO Authors (id, name) VALUES (%s, %s)"
        placeholders = (author['id'], author['name'])
        cursor.execute(query, placeholders)
    cnx.commit()
    cursor.close()

def main():
    file_path_books = "../data/processed/demo_books_40.json"
    authorIds = retrieveAuthorIds(file_path_books)
    authorsData = getAuthorData(authorIds)
    cnx = connectToDatabase()
    print("Connection Successful!")
    importAuthorData(authorsData, cnx)
    print("Data import successful! Please refresh database")
    cnx.close()

if __name__ == '__main__':
    main()