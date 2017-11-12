import os
import json
import sys
import csv
import optparse
import subprocess

# this script depends on node tables
# install with:  npm install tables -g

#course = "NewcastleX-"
def filterFiles(course, table, filename):
		return ((table in filename) and (course in filename))

def main():
	parser = optparse.OptionParser()
	parser.add_option('-c', '--course', dest='courses', help='Course to pull data from. \'MTN101x, SWL101x\'')
	#parser.add_option('-o', '--output', dest='output_filename',  help='CSV filename, without extension')
	parser.add_option('-d', '--directory', dest='data_directory', help='Data directory')
	parser.add_option('-t', '--tables', dest='tables', help='Database tables to extract e.g. \'auth_user auth_userprofile\'')
	parser.add_option('-D', '--drop-tables', dest='drop_tables', help='Drop existing tables', action='store_true')

	options, args = parser.parse_args()

	if len(sys.argv)==1:
		parser.print_help()
		sys.exit(1)

	courses = options.courses.split(' ')
	directory = options.data_directory
	directory = directory + '/'
#	output = options.output_filename
#	output = output + '.db'
	sql_tables = options.tables.split(' ')
	drop_tables = '-D' if options.drop_tables else ''

	print ("NewcastleX - Course Progress Extraction Tool")
	print ("Written by: Paul Sijpkes")
	print ("")
	print ("Processing...")

	count = 0
	num_files = 0
	export_count = 0
	fileList = os.listdir(directory)

	w_course = []
	c_course = []

	for course in courses:
		for table in sql_tables:
			c_course = list(filter(lambda t: filterFiles(course, table, t), fileList))
			w_course = w_course + c_course

	num_files = len(w_course)
	print ("%d files to be processed" % num_files)

	processed = []
	count = 0
	for name in w_course:
		if not name in processed:
			sys.stdout.write("\r" + "File: %d / %d\n" % (count, num_files))
			sys.stdout.flush()
			fileName = directory + name

			print("Processing %s" % name)
			print("as %s" % fileName)

			fin = open(fileName, "rt")
			in_txt = csv.reader(fin, delimiter = '\t')

			tokens = name.split('.')

			cleanFile = os.environ['EDI_BASE_DIR']+'edx-download-packages/clean/'+tokens[0]

			fout = open(fileName, "rt")
			out_csv = csv.writer(open(cleanFile, 'wt'))

			out_csv.writerows(in_txt)

			fout.flush()
			fout.close()
			fin.close()

			process = "tables -i %s --db=sqlite://./%s" % (cleanFile, "newcastlex_research.db")
			print (process)

			lp = process.split(' ');

			subprocess.call(lp)
		else:
			print("SKIPPING -- %s already processing" % cleanFile)

		processed.append(name) #don't need to poll the process if we know its running.
	print ("")
	print ("Completed database update")

#--------------------------------------
if __name__ == "__main__":
	main()
#--------------------------------------
