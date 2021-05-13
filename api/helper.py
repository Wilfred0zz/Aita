#!/usr/bin/env python

def toUserJsonObj(tup):
    jsonObj = { 
        "userId" : tup[0],
        "username" : tup[1],
        "password" : tup[2],
        "balance" : tup[3]
    }
    return jsonObj