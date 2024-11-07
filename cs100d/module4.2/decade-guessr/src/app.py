from flask import Flask, jsonify, request, render_template
from flask_cors import CORS
import os
import sys
from read_data import lines
import pymysql
import random

app = Flask(__name__)
CORS(app)


# Test API
@app.route('/', methods=['GET','POST'])
def index():
    return render_template('index.html')

@app.route('/check', methods=['POST'])
def check():
    json = request.get_json()
    dun = json['decade']
    decade = dun.strip('\n')
    
    json = request.get_json()
    vun = json['value']
    value = vun.strip('\n')

    correct = 'null'
    if(str(value) == str(decade)):
        correct = 'CORRECT'
    else:
        correct = 'INCORRECT'

    return jsonify({'correct': correct, 'value': value, 'decade': decade})
    json = request.get_json()
    filename = json['filename']

    img = os.path.join('static', 'Image')
    file = os.path.join(img, filename)
    return render_template('image_render.html', image=file)

def loadpic(x, lines):
    #assign variables to different lines of data file (is there an easy way to do this better?)
    #make sure to have the right number of things!!!
    print('loadpic init')
    line0 = lines[x]
    line1 = lines[x+1]
    line2 = lines[x+2]
    line3 = lines[x+3]
    line4 = lines[x+4]
    line5 = lines[x+5]

    linelist = (line0, line1, line2, line3, line4, line5)
    return linelist

@app.route('/createtable', methods=['GET'])
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

    #Reset Database
    delet = 'DROP TABLE IF EXISTS `img_table`;'
    crsr.execute(delet)

    sql = 'CREATE TABLE `img_table` (`url` VARCHAR(200) NULL, `id` INT NOT NULL AUTO_INCREMENT, `filename` VARCHAR(200) NULL, `decade` VARCHAR(200) NULL, `source` VARCHAR(200) NULL, `info` VARCHAR(200) NULL, `title` VARCHAR(200) NULL, PRIMARY KEY (`id`));'
    crsr.execute(sql)

    #Read Data
    #not sure about this splitlines thing. i just grabbed that from somewhere on the internet!!! so, i'm trying to replace that...
    #wait, can i just use readlines instead???
    data_file = open("img_data.txt", "r", encoding='utf-8')
    lines = data_file.readlines()
    data_file.close()

    #Create Table
    for x in range(0, len(lines), 6):
        #loadpic gets its own function, where you take lines 1-6 from lines
        linelist = loadpic(x, lines)
        (line0, line1, line2, line3, line4, line5) = linelist
        crsr.execute("INSERT INTO img_table (url, filename, decade, source, info, title) VALUES (%s, %s, %s, %s, %s, %s)", (line0, line1, line2, line3, line4, line5))
        conn.commit() 

    return 'Reset Successful'

@app.route('/nextphoto', methods=['GET'])
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

    #Select random number
    rand = int(random.random() * 105) + 1

    #Select row with random number in sql+-
    getRow = f"select * from img_table where id = %s;"
    crsr.execute(getRow, (rand))

    #fetch row
    myresult = crsr.fetchone()
    conn.commit()

    print(f'myresult: {myresult}')

    (url, id, filename, decade, source, info, title) = myresult
    return jsonify({'url': url, 'id': id, 'filename':filename, 'decade':decade, 'source':source, 'info':info, 'title':title})

if __name__ == '__main__':
    app.run()