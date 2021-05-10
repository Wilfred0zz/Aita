import mysql.connector
from mysql.connector import authentication
from flask import Flask, jsonify, request, json, make_response, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_cors import cross_origin
app = Flask(__name__)
CORS(app)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

mydb = mysql.connector.connect(
    host='aita.cypm9erlnb71.us-east-2.rds.amazonaws.com',
    port=3306,
    user='admin',
    password='plants123',
    database='Aita'
)
print(mydb)

mycursor = mydb.cursor()


@app.route('/api', methods=['GET'])
def index():
    return


@app.route('/api/create', methods=['POST'])
def create():
    request_data = request.get_json()
    sql = "INSERT INTO userinfo (username,password) VALUES (%s,%s)"
    try:
        mycursor.execute(
            sql, (request_data['username'], request_data['password'],))
        mydb.commit()
        return "success"
    except:
        return "failed"


@app.route('/api/login', methods=['POST', 'GET'])
def login():
    if mydb:
        try:
            sql = "SELECT userId from userinfo WHERE username = @username"
            mycursor.execute(sql)
            return "succes"
        except:
            return "nope"


@app.route('/api/setcookie', methods=['POST', 'GET'])
@cross_origin()
def setcookie():
    request_data = request.get_json()
    sql = "SELECT * from userinfo WHERE username = %s"
    mycursor.execute(sql, (request_data['username'],))
    if request.method == "POST":
        user = mycursor.fetchone()
        resp = make_response({'blah': 'what up crack head'})
        print(user[0])
        resp.set_cookie('userId', str(user[0]))
        return resp
    else:
        name = request.cookies['userId']
        return name


@app.route('/api/getcookie')
def getcookie():
    name = request.cookies['userId']
    return name


if __name__ == "__main__":
    app.run(debug=True)
