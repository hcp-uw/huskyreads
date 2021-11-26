import json
# python3 -m pip install mysql-connector-python
# MAKE SURE YOUR PACKAGES ARE INSTALLED UNDER THE CORRECT PYTHON INTERPRETER
import mysql.connector
from mysql.connector import errorcode
# TODO: Generic-this! Or Gitignore in the future so we dont have some public access rando accessing our database
config = {
  'user': 'root',
  'password': 'root',
  'host': '127.0.0.1',
  'database': 'huskyreads',
  'raise_on_warnings': True
}

def connectToDatabase():
    try:
        cnx = cnx = mysql.connector.connect(**config)
    except mysql.connector.Error as err:
        if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
            print("Something is wrong with your user name or password")
        elif err.errno == errorcode.ER_BAD_DB_ERROR:
            print("Database does not exist")
        else:
            print(err)
    else:
        cnx.close()


def importToSQL(filePath: str):
    """ Parses Book Data from JSON File into SQL Database

        Args:
            filePath:
                The file-path to the JSON file containing the data

        Expected:
            JSON file to contain field "Books", with value [arr] where each indice contains book data

        Returns:
            The processed line from the book data
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
        # TODO: import vals into database for Books table

    f.close()


def main():
    # Relative Path
    file_path = "back-end/data/processed/processed_output.json"
    importToSQL(file_path)

if __name__ == '__main__':
    main()
