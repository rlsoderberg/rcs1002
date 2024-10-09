from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import sys
from read_data import lines
import pymysql
import random


app = Flask(__name__)
CORS(app)


# Test API
@app.route('/')
def index():
    return 'Hello World'

def loadpic(x, lines):
    #assign variables to different lines of data file (is there an easy way to do this better?)
    #make sure to have the right number of things!!!
    print('loadpic init')
    line0 = lines[x]
    line1 = lines[x+1]
    line2 = lines[x+2]
    line3 = lines[x+3]
    line4 = lines[x+4]

    linelist = (line0, line1, line2, line3, line4)
    return linelist

@app.route('/createtable', methods=['POST'])
def createtable():
    print('nextphoto init')
    # Connect to MySQL
    server = os.environ['DATAHOST']
    user = os.environ['DATAUSER']
    pwd = os.environ['DATAPWD']
    db = os.environ['DATADATABASE']

    #i just put in the actual values to check! the .env might be working!
    conn = pymysql.connect(host=server, user=user, password=pwd, database=db)
    conn.autocommit(True)
    crsr = conn.cursor()
    print('connected with' + crsr)

    #Reset Database
    delet = 'DROP TABLE IF EXISTS `img_table`;'
    crsr.execute(delet)

    sql = 'CREATE TABLE `img_table` (`id` INT NOT NULL AUTO_INCREMENT, `filename` VARCHAR(200) NULL, `decade` VARCHAR(200) NULL, `source` VARCHAR(200) NULL, `info` VARCHAR(200) NULL, `title` VARCHAR(200) NULL, PRIMARY KEY (`id`));'
    crsr.execute(sql)

    #Read Data
    #not sure about this splitlines thing. i just grabbed that from somewhere on the internet!!! so, i'm trying to replace that...
    #wait, can i just use readlines instead???
    data_file = open("img_data.txt", "r", encoding='utf-8')
    lines = data_file.readlines()
    data_file.close()

    #print to test
    for line in (0, 10):
        count += 1
        print("Line{}: {}".format(count, line.strip()))

    #Create Table
    for x in range(0, len(lines), 5):
        #loadpic gets its own function, where you take lines 1-5 from lines
        linelist = loadpic(x, lines)
        (line0, line1, line2, line3, line4) = linelist
        crsr.execute("INSERT INTO img_table (filename, decade, source, info, title) VALUES (%s, %s, %s, %s, %s)", (line0, line1, line2, line3, line4))
        if(x < 15):
            print('line0: ' + line0)

        conn.commit() 
        if(x > 60):
            print(f"Last Inserted ID: {crsr.lastrowid}")

    return 'Reset Successful'

@app.route('/nextphoto', methods=['POST'])
def nextphoto():
    print('nextphoto init')
    # Connect to MySQL
    server = os.environ['DATAHOST']
    user = os.environ['DATAUSER']
    pwd = os.environ['DATAPWD']
    db = os.environ['DATADATABASE']

    conn = pymysql.connect(host=server, user=user, password=pwd, database=db)
    conn.autocommit(True)
    crsr = conn.cursor()
    print('connected with' + crsr)

    #Select random number
    rand = int(random.random() * 104) + 1
    print('random number: ' + rand)

    #Select row with random number in sql+-
    getRow = f"select * from img_table where id = {rand};"
    crsr.execute(getRow)

    #fetch row
    myresult = crsr.fetchall()

    print(myresult)

    for n in myresult:
        #(id, filename, decade, source, info, title) = n
        (filename) = n
    json = request.get_json()
    filename = json['filename']

    return jsonify({'filename': filename})



if __name__ == '__main__':
    app.run()