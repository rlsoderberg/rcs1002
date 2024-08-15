import os
import pymysql
from read_data import lines

#log into sql (really should be using .env, but the import was having some weird problem)
def login():
    server = "localhost"
    user = "root"
    pwd = "2101"
    db = "img_db"

    conn = pymysql.connect(host=server, user=user, password=pwd, database=db)
    conn.autocommit(True)
    crsr = conn.cursor()

    #create the two tables we'll need for our app
    sql = 'CREATE TABLE `img_db`.`img` (`id` INT NOT NULL AUTO_INCREMENT, `filename` VARCHAR(200) NULL, `decade` VARCHAR(200) NULL, `copyright` VARCHAR(200) NULL, `info` VARCHAR(200) NULL, `title` VARCHAR(200) NULL, PRIMARY KEY (`id`));'
    crsr.execute(sql)

    return crsr, conn

#load image data into SQL
def loadpic(crsr, conn, x, lines):
    #assign variables to different lines of data file (is there an easy way to do this better?)
    #make sure to have the right number of things!!!
    line0 = lines[x]
    line1 = lines[x+1]
    line2 = lines[x+2]
    line3 = lines[x+3]
    line4 = lines[x+4]
    
    #make an image path, using the filename (first line of every five lines of data file)
    #img_path = fr'C:\Users\rlsod\rebeccaCS100\cs100d\module4\tracker\tracker-app\src\popdecades\{img_filename}'

    #read binary data from image file at this image path
    #img_file = open(img_path, 'rb')
    #img_data = img_file.read()
    #img_file.close()
    
    #sql statement to insert variables (not image data)
    sql = """INSERT INTO img (filename, decade, copyright, info, title) VALUES (%s, %s, %s, %s, %s)"""

    #define params and then execute with them
    params = (line0, line1, line2, line3, line4)

    #why did it have 'crsr.execute(sql, (user))' up in server?
    crsr.execute(sql, params)

    conn.commit()
   

#put in more safeguards with open and try except later?

crsr, conn = login()
#do the loop until you are out of lines
for x in range(0, len(lines), 5):
  loadpic(crsr, conn, x, lines)

