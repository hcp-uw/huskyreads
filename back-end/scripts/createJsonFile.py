""" This program creates a clean JSON file from dirty book data.

This program uses regex and OS commands to edit and manipulate the
original dirty book data
"""

import re
import os

#TODO(nboren@uw.edu): Change this global variable not to be dependent on my machine.
PROCESSED_DATA_PATH = "/Users/nboren/huskyreads/back-end/data/processed/"

def text_cleaner(current_line: str) -> str:
    """ Removes text not within the bounds of curly braces

        Args:
            current_line:
                The current line being looked at

        Returns:
            The processed line from the book data
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
    with open(output_path, 'a+', encoding='utf-8') as f_out:
        append_at_end = False
        f_out.seek(0)
        data = f_out.read(100)
        if len(data) > 0:
            append_at_end = True

        for line in lines_to_append:
            if append_at_end:
                f_out.write('\n')
            else:
                append_at_end = True

            cleaned_line = text_cleaner(line)
            f_out.write(cleaned_line)

def main():
    file_path = "/Users/nboren/huskyreads/back-end/data/raw/sample_data.txt"
    file_lines = parse_text_file(file_path)
    append_multiple_lines(file_lines)

if __name__ == '__main__':
    main()
