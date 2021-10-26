import re
import os

def parse_text_file(file_path):
    with open(file_path, 'r') as file:
        fileLines = file.readlines()    

    for line in fileLines:
       regex_result = re.search("{.*", line)
       print(regex_result[0])


def main():
    file_path = "/Users/nboren/Husky-Coding-Project/huskyreads/back-end/data/sample_data.txt"    
    parse_text_file(file_path)

main()
