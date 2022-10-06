import csv
import sys


input_file = 'INPUT_FILE_PATH'          # Example: '/Users/username/Desktop/ol_dump_editions_2021-08-11.txt'
output_file = 'OUTPUT_FILE_PATH'        # Example: '/Users/username/Desktop/ol_dump_editions_2021-08-11-processed.csv'
csv.field_size_limit(sys.maxsize)
with open(output_file, 'w', newline='') as csv_output_file:
    csv_writer = csv.writer(csv_output_file, delimiter='\t', quotechar='|', quoting=csv.QUOTE_MINIMAL)
    with open(input_file, 'r') as csv_input_file:
        csv_reader = csv.reader(csv_input_file, delimiter='\t')
        for row in csv_reader:
            if len(row) > 4:
                csv_writer.writerow([row[0], row[1], row[2], row[3], row[4]])
    print('Finished reading')
print('Finished writing')
