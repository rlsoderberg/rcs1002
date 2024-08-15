import os
import pymysql
import random

def login():
    #log into sql
    server = "localhost"
    user = "root"
    pwd = "2101"
    db = "img_db"

    conn = pymysql.connect(host=server, user=user, password=pwd, database=db)
    conn.autocommit(True)
    return conn

def grab_slide(conn):
    #i reallly ought to make all these length counts computerized, but for now i'm just doing them manually
    rand = random.randrange(105)
    
    #get all the different variables. what is the most efficient way to do this?
    crsr = conn.cursor()
    crsr.execute("SELECT filename, decade, copyright, info, title FROM img WHERE ID = %s" % rand)
    result_row = crsr.fetchone()

    return result_row

conn = login()
result_row = grab_slide(conn)
(filename, decade, copyright, info, title) = result_row
img_path = fr"cs100d\module4\tracker\tracker-app\src\popdecades\{filename}"



