from flask import Flask, jsonify, request
from flask_cors import CORS
import os
import pymysql

app = Flask(__name__)
CORS(app)

# Test API
@app.route('/')
def index():
    return 'Hello World'

if __name__ == '__main__':
    app.run()