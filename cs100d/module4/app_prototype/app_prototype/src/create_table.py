# Module Imports
import mariadb
import sys
from read_data import lines


# Connect to MariaDB Platform
try:
    conn = mariadb.connect(
        user="root",
        password="2101",
        #host="http://127.0.0.1:5000",
        #port=3306,
        database="images"

    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB Platform: {e}")
    sys.exit(1)

mycursor = conn.cursor()
 
mycursor.execute("Show databases;")
 
myresult = mycursor.fetchall()
 
for x in myresult:
    print(x)

def loadpic(x, lines):
    #assign variables to different lines of data file (is there an easy way to do this better?)
    #make sure to have the right number of things!!!
    line0 = lines[x]
    line1 = lines[x+1]
    line2 = lines[x+2]
    line3 = lines[x+3]
    line4 = lines[x+4]

    linelist = (line0, line1, line2, line3, line4)
    return linelist

# Get Cursor
cur = conn.cursor()

delet = 'DROP TABLE IF EXISTS `img_table`;'
cur.execute(delet)

sql = 'CREATE TABLE `img_table` (`id` INT NOT NULL AUTO_INCREMENT, `filename` VARCHAR(200) NULL, `decade` VARCHAR(200) NULL, `source` VARCHAR(200) NULL, `info` VARCHAR(200) NULL, `title` VARCHAR(200) NULL, PRIMARY KEY (`id`));'
cur.execute(sql)

#insert values while looping
for x in range(0, len(lines), 5):
    linelist = loadpic(x, lines)
    (line0, line1, line2, line3, line4) = linelist
    try: cur.execute("INSERT INTO img_table (filename, decade, source, info, title) VALUES (%s, %s, %s, %s, %s)", (line0, line1, line2, line3, line4))
    except mariadb.Error as e: 
        print(f"Error: {e}")
    print('line0: ' + line0)

    conn.commit() 
    print(f"Last Inserted ID: {cur.lastrowid}")
    
print('done')
conn.close()

