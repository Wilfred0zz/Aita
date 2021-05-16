#!/usr/bin/env python

from flask.wrappers import Response
import mysql.connector
from mysql.connector import authentication
from flask import Flask, jsonify, request, json, make_response, render_template, url_for
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_cors import cross_origin
from helper import toUserJsonObj

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


def toUserJsonObj(tup):
    jsonObj = {
        "userId": tup[0],
        "username": tup[1],
        "password": tup[2],
        "balance": tup[3]
    }
    return jsonObj


@app.route('/api', methods=['GET'])
def index():
    return

# login, register, & authentication


@app.route('/api/create', methods=['POST'])
def create():
    request_data = request.get_json()
    sql = "INSERT INTO userInfo (username,password) VALUES (%s,%s)"
    try:
        mycursor.execute(
            sql, (request_data['username'], request_data['password'],))
        mydb.commit()
        return "success"
    except:
        return "failed"


@app.route('/api/setcookie', methods=['POST', 'GET'])
@cross_origin()
def setcookie():
    request_data = request.get_json()
    sql = "SELECT * from userInfo WHERE username = %s AND password = %s"
    try:
        mycursor.execute(
            sql, (request_data['username'], request_data['password']))
        if request.method == "POST":
            user = mycursor.fetchone()
            userJson = toUserJsonObj(user)
            resp = make_response(userJson)
            resp.set_cookie('userId', str(user[0]), httponly=False)
            return resp
    except:
        return "failed"


@app.route('/api/getCookie')
def getCookie():
    userId = request.cookies['userId']
    return userId

# logout route
@app.route('/api/logout', methods=['GET'])
def logout():
    resp = make_response('logged out')
    resp.delete_cookie('userId')
    return resp

# get user inventory
@app.route('/api/getUserInventory', methods=['GET'])
@cross_origin()
def getUserInventory():
    try: 
        userId = request.cookies['userId']
        sql = "SELECT userItemInventory.*, itemEncyclopedia.name FROM userItemInventory INNER JOIN itemEncyclopedia ON userItemInventory.itemId=itemEncyclopedia.itemId WHERE userId = %s"
        mycursor.execute(sql, (userId,))
        userInv = mycursor.fetchall()
        print(userInv)
        resp = make_response((jsonify(userInv)))
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp
    except:
        return "failed to get user inventory"

# get PLANTS
@app.route('/api/getPlants', methods=['GET'])
@cross_origin()
def getPlants():
    try: 
        userId = request.cookies['userId']
        sql = "SELECT plants.*, itemEncyclopedia.name FROM plants INNER JOIN itemEncyclopedia ON plants.itemId=itemEncyclopedia.itemId WHERE userId = %s;"
        mycursor.execute(sql, (userId,))
        userPlants = mycursor.fetchall()
        print(userPlants)
        resp = make_response((jsonify(userPlants)))
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp
    except:
        return "failed to get plants"

# get store items
@app.route('/api/getStoreItems', methods=['GET'])
def getStoreItems():
    try:
        request_data = request.get_json()
        sql = "SELECT * FROM itemEncyclopedia"
        mycursor.execute(sql)
        allStoreItems = mycursor.fetchall()
        print('got store items successfully')
        resp = make_response((jsonify(allStoreItems)))
        return resp
    except:
        return 'failed to get store items'

# GET PLANT TRANSACTIONS
@app.route('/api/getPlantTrans', methods=['GET'])
@cross_origin()
def getPlantTrans():
    try: 
        userId = request.cookies['userId']
        sql = "SELECT plantTransactions.*, plants.name, plants.itemId, itemEncyclopedia.name, ROUND(itemEncyclopedia.price*plants.priceEffect, 2) as price FROM plantTransactions INNER JOIN plants ON plants.plantId=plantTransactions.plantId INNER JOIN itemEncyclopedia ON plants.itemId = itemEncyclopedia.itemId WHERE plantTransactions.userId = %s;"
        mycursor.execute(sql, (userId,))
        plantsTrans = mycursor.fetchall()
        print(plantsTrans)
        resp = make_response((jsonify(plantsTrans)))
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp
    except:
        return "failed to get plant transactions"
        
# buying route
@app.route('/api/buyItem', methods=['POST'])
@cross_origin()
def buyItem():
    request_data = request.get_json()
    userId = request.cookies['userId']
    comparison = "SELECT balance FROM userInfo WHERE userId= %s"
    mycursor.execute(comparison, (userId,))

    balance = mycursor.fetchall()[0][0]
    itemsprice = "SELECT price from itemEncyclopedia WHERE itemId = %s"
    mycursor.execute(itemsprice, (request_data['itemId'],))
    price = mycursor.fetchall()[0][0]

    if balance < price:
        return Response('NOT ENOUGH FUNDS BOIII', status=400)

    transactions = "INSERT INTO itemTransactions(userId, quantity, amount, itemId) VALUES(%s, %s,  %s, %s);"
    userInventory = "INSERT INTO userItemInventory(itemId,userId, quantity) VALUES (%s,%s, %s);"
    mycursor.execute(transactions,
                     (userId, request_data['quantity'], price, request_data['itemId']))
    mydb.commit()
    mycursor.execute(
        userInventory, (request_data['itemId'], userId, request_data['quantity']))
    mydb.commit()
    mycursor.execute(
        "UPDATE userInfo SET balance = balance - %s WHERE userId = %s", (price, userId))
    mydb.commit()
    userInv = mycursor.fetchall()
    print((userInv))
    resp = make_response((jsonify(userInv)))
    return resp
    # return 'failed to get inventory'

if __name__ == "__main__":
    app.run(debug=True)
