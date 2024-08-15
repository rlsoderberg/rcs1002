from flask import Flask, jsonify, request
import mariadb
import random
import sys

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

rand = int(random.random() * 104) + 1

getRow = f"select * from img_table where id = {rand};"
print(getRow)
mycursor.execute(getRow)

myresult = mycursor.fetchall()

print(myresult)

for n in myresult:
    (id, filename, decade, source, info, title) = n

print('filename: '+filename)

json = request.get_json()
filename = json['filename']