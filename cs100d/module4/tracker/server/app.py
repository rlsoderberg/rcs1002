from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pymysql

app = Flask(__name__)
CORS(app)

#Test API
@app.route('/')
def index():
    return 'WELCOME TO BROWSER 5000'

def login():
    server = os.environ['DATAHOST']
    user = os.environ['DATAUSER']
    pwd = os.environ['DATAPWD']
    db = os.environ['DATADATABASE']

    conn = pymysql.connect(host=server, user=user, password=pwd, database=db)
    conn.autocommit(True)
    crsr = conn.cursor()

    json = request.get_json()
    user = json['user']


    # First, check if this user already exists
    sql = 'select id from user where login=%s'
    crsr.execute(sql, (user))
    print('returned ' + str(crsr.rowcount) + ' rows')
    if crsr.rowcount == 0:
        print('adding ' + user)
        crsr.execute('insert into user (login) values (%s)', user)
        print('adding ' + str(crsr.rowcount) + ' user')
        print('re-executing ' + sql)
        crsr.execute(sql, (user))
    res = crsr.fetchone()
    userid = res[0]
    # Now, add the login information
    # Note, CURRENT_TIMESTAMP is built into MySQL to get the current time
    sql = 'insert into login (userid, `date`) values (%s, CURRENT_TIMESTAMP)'
    crsr.execute(sql, (userid))

    conn.commit()

    # Finally, get the user's login count and the total login count
    sql = 'select count(*) as logins from login where userid=%s'
    crsr.execute(sql, (userid))
    res = crsr.fetchone()
    usercount = res[0]
    sql = 'select count(*) as logins from login'
    crsr.execute(sql)
    res = crsr.fetchone()
    totalcount = res[0]

    return jsonify({'user': user, 'user count':usercount, 'total count':totalcount })

    conn.commit()



if __name__ == '__main__':
    app.run()