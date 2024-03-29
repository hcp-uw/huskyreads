import json
# python3 -m pip install mysql-connector-python
# MAKE SURE YOUR PACKAGES ARE INSTALLED UNDER THE CORRECT PYTHON INTERPRETER
import mysql.connector
from mysql.connector import errorcode
# TODO: Generic-this! Or Gitignore in the future so we dont have some public access rando accessing our database
CONFIG = {
  'user': 'root',
  'password': 'root',
  'host': '127.0.0.1',
  'database': 'huskyreads',
  'port': 3307,     # MAKE SURE THIS PORT ALIGNS WITH YOUR PORT IN THE .env FILE
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


def retrieveBookData(filePath: str):
    """ Retrieves necessary book data from a json file for insertion into SQL database

        Args:
            filePath:
                The file-path to the JSON file containing the data

        Expected:
            JSON file to contain field "data", with value [arr] where each indice contains book data

        Returns:
            Array of books to be inserted into database:
            books have format: [title, isbn, publish-date, author, subjects]
    """
    f = open(filePath)
    data = json.load(f)
    # Assumes data field is called "data" - this is controlled by the data modifying code
    # Uses "isbn_13" if exists, it doesn't for every book! isbn_10 guaranteed exists for each book
    # Assumes "isbn_10" and "isbn_13" refers to an integer (decimal);
    # NOTE: isbns can have leading zeros.
    bookdata = []
    for book in data["data"]:
        getISBN = book.get("isbn_13") if "isbn_13" in book else book.get("isbn_10")
        if len(getISBN) > 0:
            # Should be guaranteed at least one of the values is a valid decimal number
            for isbn in getISBN:
                if isbn.isnumeric():
                    getISBN = isbn
                    break
        # Parses data out from authors field
        author = book.get("authors")
        if author:
            author = author[0].get("key")
        bookdata.append([book.get("title"), getISBN, book.get("publish_date"), author, book.get("subjects")])

    f.close()
    return bookdata


def retrieveAuthorData(filePath: str):
    """ Retrieves necessary author data from a json file for insertion into SQL database

        Args:
            filePath:
                The file-path to the JSON file containing the data

        Returns:
            Array of authors to be inserted into database:
            Authors have format: [author_id, author_name]
    """
    f = open(filePath)
    data = json.load(f)
    authorData = []
    # Assumes json object table name is author
    for author in data["data"]:
        authorData.append([author.get("key")[9:], author.get("name")])
    return authorData


def insertBookData(books: list, cnx: object):
    """ Parses Book Data from JSON File into SQL Database

        Args:
            books:
                The list of values to add to database: each value is of format
            cnx:
                The connection object to the database

        Expected:
            Each element of the books list is a list of format
            [title, isbn, publish-date, author, subjects].
            title, publish-date, author is a string, isbn is an int, subject is a list
    """
    cursor = cnx.cursor()
    for book in books:
        # Inserting books into Book table
        query = "INSERT INTO Books (ISBN, title, date_published) VALUES (%s, %s, %s)"
        values = (book[1], book[0], book[2])
        cursor.execute(query, values)
        # Inserts subjects into Genre table, Inserts connections in Book_Genre
        if book[4] is not None:
            for subject in book[4]:
                query = "SELECT * FROM Genres WHERE name = %s" # Checks for duplicates
                values = (subject,)
                cursor.execute(query, values)
                res = cursor.fetchall()
                # Add if there isn't a duplicate
                if res == []:
                    query = "INSERT INTO Genres (name) VALUES (%s)"
                    values = (subject,)
                    cursor.execute(query, values)
                rowid = cursor.lastrowid if len(res) == 0 else res[0][0]
                query = "INSERT INTO Book_Genres (ISBN_book, id_genre) VALUES (%s, %s)"
                values = (book[1], rowid)
                cursor.execute(query, values)
        # Insert author references into Book_Authors table
        if book[3] is not None:
            authorID = book[3].split("/")[2]
            query = "INSERT INTO Book_Authors (ISBN_book, id_author) VALUES (%s, %s)"
            values = (book[1], authorID)
            cursor.execute(query, values)
    cnx.commit()
    cursor.close()


def insertAuthorData(authors: list, cnx: object):
    """ Parses Author Data from JSON File into Author table

        Args:
            authors:
                List of Authors
            cnx:
                The connection object to the database
        Expected:
            Each element of authors list is a list with format [author_id, author_name]
            author_id, author_name expected to be strings
    """
    cursor = cnx.cursor()
    for author in authors:
        query = "INSERT INTO Authors (id, name) VALUES (%s, %s)"
        values = (author[0], author[1])
        cursor.execute(query, values)
    cnx.commit()
    cursor.close()


def main():
    file_path_books = "../data/processed/sample_data.json"
    # file_path_authors = "../data/processed/sample_author_data.json"
    books = retrieveBookData(file_path_books)
    # authors = retrieveAuthorData(file_path_authors)
    cnx = connectToDatabase()
    print("Connection Successful!")
    insertBookData(books, cnx)
    # insertAuthorData(authors, cnx)
    print("Data import successful! Please refresh database")
    cnx.close()

if __name__ == '__main__':
    main()
