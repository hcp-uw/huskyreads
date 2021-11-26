import json
# python3 -m pip install mysql-connector-python
# Frank: I'm having import issues w/ VSCode, always seems to be a problem lol
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
        print(book)             # Filler code - making sure file reading works.
        # Adding this code in once the data is in correct format

    f.close()


def main():
    # TODO: Make a file containing all specified paths (sample), and !gitignore file containing private paths
    # TODO: Make path generic: "/Users/[name]/Documents/GitHub/huskyreads/back-end/data/processed/processed_output.json"
    file_path = "/Users/frankhou/Documents/GitHub/huskyreads/back-end/data/processed/processed_output.json"
    importToSQL(file_path)

if __name__ == '__main__':
    main()
