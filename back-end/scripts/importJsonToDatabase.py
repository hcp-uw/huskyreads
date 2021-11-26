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

    for book in data["books"]:  # Assumes data field is called "books"
        print(type(book))             # Filler code - making sure file reading works.
        print()
        # Adding this code in once the data is in correct format

    f.close()


def main():
    # Relative Path
    file_path = "back-end/data/processed/processed_output.json"
    importToSQL(file_path)

if __name__ == '__main__':
    main()
