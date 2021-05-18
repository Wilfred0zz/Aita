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

# get user profile
@app.route('/api/getProfile', methods=['GET'])
@cross_origin()
def getProfile():
    try: 
        userId = request.cookies['userId']
        sql = "SELECT userInfo.userId, userInfo.username, userInfo.balance FROM userInfo WHERE userInfo.userId = %s"
        mycursor.execute(sql, (userId,))
        userProf = mycursor.fetchall()
        print(userProf)
        resp = make_response((jsonify(userProf)))
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp
    except:
        return "failed to get user user profile"

# get PLANTS
@app.route('/api/getPlants', methods=['GET'])
@cross_origin()
def getPlants():
    try: 
        userId = request.cookies['userId']
        sql = "SELECT plants.*, itemEncyclopedia.name, plantEncyclopedia.timeTakesToGrow, plantEncyclopedia.waterInterval FROM plants INNER JOIN itemEncyclopedia ON plants.itemId=itemEncyclopedia.itemId INNER JOIN plantEncyclopedia ON itemEncyclopedia.itemId=plantEncyclopedia.itemId WHERE userId = %s;"
        mycursor.execute(sql, (userId,))
        userPlants = mycursor.fetchall()
        resp = make_response((jsonify(userPlants)))
        resp.headers.add("Access-Control-Allow-Origin", "*")
        print('successfully got plants')
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
        sql = "SELECT plantTransactions.*, plants.name, plants.itemId, itemEncyclopedia.name, plantEncyclopedia.sellingPrice FROM plantTransactions INNER JOIN plants ON plants.plantId=plantTransactions.plantId INNER JOIN itemEncyclopedia ON plants.itemId = itemEncyclopedia.itemId INNER JOIN plantEncyclopedia on plantEncyclopedia.itemId = itemEncyclopedia.itemId WHERE plantTransactions.userId = %s;"
        mycursor.execute(sql, (userId,))
        plantsTrans = mycursor.fetchall()
        print(plantsTrans)
        resp = make_response((jsonify(plantsTrans)))
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp
    except:
        return "failed to get plant transactions"

# GET PLANT TRANSACTIONS
@app.route('/api/getItemTrans', methods=['GET'])
@cross_origin()
def getItemTrans():
    try: 
        userId = request.cookies['userId']
        sql = "SELECT itemTransactions.*, itemEncyclopedia.name, itemEncyclopedia.price, ROUND(itemEncyclopedia.price * itemTransactions.quantity, 2) as amount FROM itemTransactions INNER JOIN itemEncyclopedia ON itemTransactions.itemId=itemEncyclopedia.itemId WHERE itemTransactions.userId = %s"
        mycursor.execute(sql, (userId,))
        itemTrans = mycursor.fetchall()
        print(itemTrans)
        resp = make_response((jsonify(itemTrans)))
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp
    except:
        return "failed to get item transactions"
        
# buying route
@app.route('/api/buyItem', methods=['POST'])
@cross_origin()
def buyItem():
    request_data = request.get_json()
    userId = request.cookies['userId']
    comparison = "SELECT balance FROM userInfo WHERE userId= %s"
    try:
        mycursor.execute(comparison, (userId,))
        balance = mycursor.fetchall()[0][0]
    except:
        print('could not get balance')
        return make_response('not enough balance', 400)

    itemsprice = "SELECT price from itemEncyclopedia WHERE itemId = %s"
    mycursor.execute(itemsprice, (request_data['itemId'],))
    price = mycursor.fetchall()[0][0] * request_data['quantity']
    if balance < price:
        print('not enough balance')
        errorRes = make_response('not enough balance', 400)
        return errorRes

    transactions = "INSERT INTO itemTransactions(userId, quantity, itemId) VALUES(%s, %s,  %s);"
    
    ifWeHaveItemSql = "SELECT quantity from userItemInventory WHERE userId = %s AND itemId = %s"
    row_count = mycursor.execute(ifWeHaveItemSql, (userId, request_data['itemId'],))
    ifWeHaveItem = mycursor.fetchone()
    if ifWeHaveItem is None:
        print('does not exist')
        userInventory = "INSERT INTO userItemInventory(itemId, userId, quantity) VALUES (%s,%s, %s);"
        mycursor.execute(
            userInventory, (request_data['itemId'], userId, request_data['quantity']))
        mydb.commit()
    else:
        newQuantity = int(ifWeHaveItem[0])+request_data['quantity']
        print(newQuantity)
        userInventory = "UPDATE userItemInventory SET quantity=(%s) WHERE userId = %s AND itemId = %s;"
        mycursor.execute(
            userInventory, (newQuantity, userId, request_data['itemId']))
        mydb.commit()
        
    mycursor.execute(transactions,
                     (userId, request_data['quantity'], request_data['itemId'],))
    mydb.commit()
    mycursor.execute(
        "UPDATE userInfo SET balance = balance - %s WHERE userId = %s", (price, userId))
    mydb.commit()
    userInv = mycursor.fetchall()
    print((userInv))
    resp = make_response((jsonify(userInv)))
    return resp

@app.route('/api/plantSeed', methods=['POST'])
def plantSeed():
    userId = request.cookies['userId']
    request_data = request.get_json()
    addToPlants = "INSERT INTO plants(itemId, userId, name) VALUES (%s, %s, %s)"
    mycursor.execute(addToPlants, (request_data['itemId'], userId, request_data['plantName']))
    mydb.commit()

    seedCntSql = "SELECT quantity FROM userItemInventory WHERE itemId=%s AND userId=%s"
    potCntSql = "SELECT quantity FROM userItemInventory WHERE itemId=1 AND userId=%s"
    soilCntSql = "SELECT quantity FROM userItemInventory WHERE itemId=3 AND userId=%s"

    mycursor.execute(seedCntSql, (request_data['itemId'], userId,))
    seedCnt = mycursor.fetchone()[0]
    print('seed count is: ' + str(seedCnt))

    if seedCnt < 1:
        print('You do not have the seed')
        errorRes = make_response('You do not have the seed', 400)
        return errorRes

    mycursor.execute(potCntSql, (userId,))
    potCnt = mycursor.fetchone()[0]
    print('pot count is: ' + str(potCnt))

    if potCnt < 1:
        print('You do not have a pot')
        errorRes = make_response('You do not have a pot', 400)
        return errorRes

    mycursor.execute(soilCntSql, (userId,))
    soilCnt = mycursor.fetchone()[0]
    print('soil count is: ' + str(soilCnt))

    if soilCnt < 1:
        print('You do not have soil')
        errorRes = make_response('You do not have soil', 400)
        return errorRes

    updateUserInventoryPot = "UPDATE userItemInventory SET quantity = quantity - 1 WHERE itemId=1 AND userId=%s"
    mycursor.execute(updateUserInventoryPot, (userId,))
    mydb.commit()
    updateUserInventorySoil = "UPDATE userItemInventory SET quantity = quantity - 1 WHERE itemId=3 AND userId=%s"
    mycursor.execute(updateUserInventorySoil, (userId,))
    mydb.commit()
    updateUserInventorySeed = "UPDATE userItemInventory SET quantity = quantity - 1 WHERE itemId=%s AND userId=%s"
    mycursor.execute(updateUserInventorySeed, (request_data['itemId'], userId,))
    mydb.commit()

    successRes = "successfully planted %s" % (request_data['plantName'])
    resp = make_response((jsonify(successRes)))
    return resp


@app.route('/api/sellPlant', methods=['POST'])
def sellItem():
    userId = request.cookies['userId']
    request_data = request.get_json()
    itemsprice = "SELECT sellingPrice from plantEncyclopedia WHERE itemId = %s"
    mycursor.execute(itemsprice, (request_data['itemId'],))
    price = mycursor.fetchall()[0][0]
    print(price)
    mycursor.execute(
        "UPDATE userInfo SET balance = balance + %s WHERE userId = %s", (price, userId,))
    mydb.commit()
    deletePlant = "UPDATE plants SET isSold = 1 WHERE plantId = %s"
    mycursor.execute(deletePlant, (request_data['plantId'],))
    mydb.commit()
    soldPlant = mycursor.fetchall()
    print(soldPlant)
    resp = make_response((jsonify(soldPlant)))
    return resp


@app.route('/api/water', methods=['POST'])
def water():
    userId = request.cookies['userId']
    request_data = request.get_json()

    waterCntSql = "SELECT quantity FROM userItemInventory WHERE itemId=2 AND userId=%s"

    mycursor.execute(waterCntSql, (userId,))
    waterCnt = mycursor.fetchone()[0]
    print('water count is: ' + str(waterCnt))

    if waterCnt < 1:
        print('You do not have water')
        errorRes = make_response('You do not have the water', 400)
        return errorRes

    updateWater = "UPDATE plants SET lastTimeWatered = NOW() WHERE plantId = %s"
    mycursor.execute(updateWater, (request_data['plantId'],))
    mydb.commit()
    updateWaterQuantity = "UPDATE userItemInventory SET quantity = quantity - 1 WHERE itemId = 2 AND userId = %s"
    mycursor.execute(updateWaterQuantity, (userId,))
    mydb.commit()
    updatedWater = mycursor.fetchall()
    print(updatedWater)
    resp = make_response((jsonify(updatedWater)))
    return 'watered'


@app.route('/api/grown', methods=['POST'])
@cross_origin()
def grown():
    userId = request.cookies['userId']
    request_data = request.get_json()
    plantId = request_data['plantId']
    # return 'fdsfsdf'
    try:
        sql = "UPDATE plants SET isGrown = 1 WHERE plantId = %s and userId = %s"
        mycursor.execute(sql, (plantId, userId,))
        mydb.commit()
        print(plantId) 
        print('is okay')
        resp = make_response((jsonify(plantId)))
        return resp
    except:
        return 'error happened updating grown'
    return 'plant is grown'


@app.route('/api/isAlive', methods=['POST'])
def isAlive():
    request_data = request.get_json()
    try:
        sql = "UPDATE plants SET isAlive = 0 WHERE plantId = %s"
        mycursor.execute(sql, (request_data['plantId'],))
        mydb.commit()
    except:
        return 'error happened updating alive'
    return 'plant is dead'


if __name__ == "__main__":
    app.run(debug=True)
