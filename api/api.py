import mysql.connector
from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

mydb = mysql.connector.connect(
    host='localhost',
    user='root',
    password='password',
    database='aita.tst'
)

mycursor = mydb.cursor()


@app.route('/api', methods=['GET'])
def index():
    return jsonify([*map(userinfo_serializer, userinfo.query.all())])


@app.route('/api/create', methods=['POST'])
def create():
    request_data = request.get_json()
    sql = "INSERT INTO userinfo (username,password, balance ) VALUES (%s,%s,'5')"
    try:
        mycursor.execute(
            sql, (request_data['username'], request_data['password'],))
        return "success"
    except:
        return "damn son"


@app.route('/api/login', methods=['POST'])
def login():

    request_data = json.loads(request.data)
    todo = userinfo(username=request_data['username'])


if __name__ == "__main__":
    app.run(debug=True)
