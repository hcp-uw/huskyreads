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


def retrieveData(filePath: str):
    """ Retrieves necessary data from a json file for insertion into SQL database

        Args:
            filePath:
                The file-path to the JSON file containing the data

        Expected:
            JSON file to contain field "Books", with value [arr] where each indice contains book data

        Returns:
            Array of values to be inserted into database: with format
            [title, isbn, publish-date, author, subjects]
    """
    f = open(filePath)
    data = json.load(f)

    """
    Data that we want:
    - ISBN (10)
    - title
    - book description
    - date published
    - author(s)
    - genre(s) / subject(s)

    Data that we have (ones that I think is important):
    - title
    - subtitle (do we want to include this?)
    - author (sometimes this is missing, also represented as something like /authors/[author-id] as a string)
    - isbn_10 / isbn_13 (i guess we want 10)    Not all books have isbn_13, but isbn_10 needs additional parsing
    - languages (do we want to include this?)
    - number of pages (do we want to include this?)
    - publish date
    - subjects (genres)
    """
    # Assumes data field is called "books" - this is controlled by the data modifying code
    # Assumes "isbn_10" refers to an integer (decimal); NOTE: isbn_10 can have leading zeros.
    for book in data["books"]:
        getISBN10 = book.get("isbn_10")
        if len(getISBN10) > 0:
            # Should be guaranteed at least one of the values is a valid decimal number
            for isbn in getISBN10:
                try:
                    getISBN10 = int(isbn)
                except:
                    continue
        # Parses data out from authors field
        author = book.get("authors")
        if author is not None:
            author = author[0].get("key")
        vals = [book.get("title"), getISBN10, book.get("publish_date"), author, book.get("subjects")]

    f.close()
    return vals


def insertDataToSQL(vals: list, cnx: object):
    """ Parses Book Data from JSON File into SQL Database

        Args:
            vals:
                The list of values to add to database: of format
                [title, isbn, publish-date, author, subjects]
            cnx:
                The connection object to the database
    """
    cursor = cnx.cursor()
    query = ("INSERT INTO Books "
            "(ISBN, title, date_published)"
            "(VALUES (%s, %s, %s))")
    values = (vals[1], vals[0], vals[3]) # NOTE: vals[3] needs to be a datetime object!
    # Or should we modify database to have the date_published be a string? Since every entry varies in accuracy
    cursor.execute(query, values)
    # Do this for authors, subjects (genres) too.
    cnx.commit()
    cursor.close()


def main():
    # Relative Path
    file_path = "back-end/data/processed/processed_output.json"
    vals = retrieveData(file_path)
    cnx = connectToDatabase()
    #insertDataToSQL(vals, cnx)
    cnx.close()

if __name__ == '__main__':
    main()
