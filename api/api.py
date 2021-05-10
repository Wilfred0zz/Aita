import mysql.connector
from mysql.connector import authentication
from flask import Flask, jsonify, request, json, make_response, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)

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
    return jsonify([*map(userinfo_serializer, userinfo.query.all())])


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
            sql = "SELECT userId, username from userinfo WHERE username = @username"
            mycursor.execute(sql)
            return "succes"
        except:
            return "nope"


@app.route('/setcookie', methods=['POST', 'GET'])
def setcookie():
    sql = "SELECT userId, username from userinfo"
    if request.method == "POST":
        user = request.mycursor.execute(sql)
        resp = make_response(render_template('home.html'))
        resp.set_cookie('userId', user)

    return resp


@app.route('/getcookie')
def getcookie():
    name = request.cookies.get('userId')
    return '<h1>welcome ' + name + '</h1>'


if __name__ == "__main__":
    app.run(debug=True)
