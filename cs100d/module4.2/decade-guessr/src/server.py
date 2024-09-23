from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import sys
from read_data import lines
import pymysql

app = Flask(__name__)
CORS(app)

@app.route('/resetdb')
def reset():
    # Make sure you modify this connection string to connect to your database, and not mine.
    server = os.environ['DATAHOST']
    user = os.environ['DATAUSER']
    pwd = os.environ['DATAPWD']
    db = os.environ['DATADATABASE']

    conn = pymysql.connect(host=server, user=user, password=pwd, database=db)
    conn.autocommit(True)
    crsr = conn.cursor()

    # Drop the tables if they already exist
    sql = 'DROP TABLE IF EXISTS `tracker`.`login`;'
    crsr.execute(sql)
    sql = 'DROP TABLE IF EXISTS `tracker`.`user`;'
    crsr.execute(sql)
    # Create the two tables we'll need for our app
    sql = 'CREATE TABLE `tracker`.`user` (`id` INT NOT NULL AUTO_INCREMENT,`login` VARCHAR(255) NULL, PRIMARY KEY (`id`));'
    crsr.execute(sql)
    sql = 'CREATE TABLE `tracker`.`login` (`id` INT NOT NULL AUTO_INCREMENT,`userid` INT NULL,`date` DATETIME, PRIMARY KEY (`id`), FOREIGN KEY (userid) REFERENCES `user`(id));'
    crsr.execute(sql)

    return 'Reset Successful'

'''
# Test API
@app.route('/')
def index():
    return 'Hello World'

@app.route('/create_table')
def create_table():
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

    conn.autocommit(True)
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

    delet = 'DROP TABLE IF EXISTS `img_table`;'
    mycursor.execute(delet)

    sql = 'CREATE TABLE `img_table` (`id` INT NOT NULL AUTO_INCREMENT, `filename` VARCHAR(200) NULL, `decade` VARCHAR(200) NULL, `source` VARCHAR(200) NULL, `info` VARCHAR(200) NULL, `title` VARCHAR(200) NULL, PRIMARY KEY (`id`));'
    mycursor.execute(sql)

    #insert values while looping
    for x in range(0, len(lines), 5):
        linelist = loadpic(x, lines)
        (line0, line1, line2, line3, line4) = linelist
        try: mycursor.execute("INSERT INTO img_table (filename, decade, source, info, title) VALUES (%s, %s, %s, %s, %s)", (line0, line1, line2, line3, line4))
        except mariadb.Error as e: 
            print(f"Error: {e}")
        print('line0: ' + line0)

        conn.commit() 
        print(f"Last Inserted ID: {mycursor.lastrowid}")
        
    print('done')
    conn.close()

    return 'Reset Successful'


@app.route('/login', methods=['POST'])
def login():
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


    json = request.get_json()
    filename = json['filename']

    rand = int(random.random() * 54) + 1

    getRow = f"select * from img_table where id = {rand};"
    print(getRow)
    mycursor.execute(getRow)

    myresult = mycursor.fetchall()

    print(myresult)

    for n in myresult:
        (id, filename, decade, source, info, title) = n

    print('filename: '+filename)

    # json = request.get_json()
    # filename = json['filename']

    return jsonify({'filename': filename, 'title':title, 'decade':decade})

if __name__ == '__main__':
    app.run()
'''