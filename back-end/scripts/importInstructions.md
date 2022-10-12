## <span style="color:deepskyblue">How to import data into the database</span>
---
### Step 1: Download raw book data

1.1) Go to [Open Library's data dump page](https://openlibrary.org/developers/dumps) and download the **works dump**

1.2) Unzip the file if it zipped

### Step 2: Clean book Data

2.1) Open the file `/HuskyReads/back-end/scripts/convertFileToCSV.py`

2.2) Replace the text `INPUT_FILE_PATH` with the absolute path to the text file from step 1

2.3) Replace the text `OUTPUT_FILE_PATH` with the absolute path of the file you would like to write to. This file should be placed into the folder `HuskyReads/back-end/data/raw`

**Note:** Make sure a file with the path `OUTPUT_FILE_PATH` doesn't already exist.

2.4) Open a command line/terminal window and change your current directory to the `/HuskyReads/back-end/scripts` directory

2.4) Run the `convertFileToCSV.py` script with the command `python3 convertFileToCSV.py`

### Step 3: Turn the book data into JSON

3.1) Run the `createJsonFile.py` script with the command `python3 createJsonFile.py`

### Step 4: Import the JSON book data in the database

4.1) Open the file `/HuskyReads/back-end/scripts/importJsonToDatabase.py`

4.2) Replace the values in the `CONFIG` dictionary to reflect the values necessary to connect to the database

4.3) Replace the value of the variable `file_path_books` with the path to the output file from step 3

4.4) Run the `importJsonToDatabase.py` script with the command `python3 importJsonToDatabase.py`

### Step 5: Import necessary authors into the database

5.1) Open the file `/HuskyReads/back-end/scripts/importAuthors.py`

5.2) Replace the value of the variable `file_path_books` with the path to the output file from step 3

5.3) Run the `importAuthors.py` script with the command `python3 importAuthors.py`
