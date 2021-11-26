""" This program creates a clean JSON file from dirty book data.

This program uses regex and OS commands to edit and manipulate the
original dirty book data
"""

import re
import os
import json

#TODO(nboren@uw.edu): Change this global variable not to be dependent on my machine.
PROCESSED_DATA_PATH = "/Users/nboren/personal/huskyreads/back-end/data/processed/"

def text_cleaner(current_line: str) -> str:
    """ Removes the current line into cleaned JSON text

        Args:
            current_line:
                The current line being looked at

        Returns:
            The processed and correctly formatted JSON line
    """
    regex_result = re.search("{.*", current_line)
    return regex_result[0]

def parse_text_file(file_path: str) -> str:
    with open(file_path, 'r', encoding='utf-8') as file:
        file_lines = file.readlines()

    return file_lines

#TODO(nboren@uw.edu): Change the output file not to be the same every single run.
def append_multiple_lines(lines_to_append: str, output_path=os.path.join(PROCESSED_DATA_PATH,
                          "processed_output.json")):
    """
    Creates and Appends the clean book data into a JSON file

    If the file has not been created, it will create the file.
    Appends each book as its own separate line

    Args:
        lines_to_append:
            A list of all books within the dirty data

        output_path:
            The location of where the processed output will go.
            Defaults to a text file in data/processed called processed_output.
    """

    books = list()
    for line in lines_to_append:
        cleaned_line = text_cleaner(line)
        books.append(cleaned_line)
        
    with open(output_path, 'a+', encoding='utf-8') as f_out:
        json_result = json.dumps({'books': books}, indent=4, sort_keys = False) 
        f_out.write(json_result)

def main():
    file_path = "/Users/nboren/personal/huskyreads/back-end/data/raw/sample_data.txt"
    file_lines = parse_text_file(file_path)
    append_multiple_lines(file_lines)

if __name__ == '__main__':
    main()

