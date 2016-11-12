import json
import urllib2
import sys
from flask import Flask, render_template
from flask_socketio import SocketIO

#cue support
# from cue_sdk import *
# Corsair = CUESDK("CUESDK.x64_2013.dll")
# Corsair.RequestControl(CAM.ExclusiveLightingControl)
foods = ["Restaurant", "Fast Food", "Alcohol & Bars",]
ents = ["Travel", "Shopping", "Entertainment"]
necs = ["Groceries", "Home Improvement"]
food = []
ent = []
nec = []

mint =  json.load(urllib2.urlopen("http://intuit-mint.herokuapp.com/api/v1/user/transactions"))
l = len(mint)//30
	
#counters for iterating by day
ftot = 0
etot = 0
ntot = 0
i = 0

#userinput and my ouput
uinp = {
	'f': 0.2,
	'e': 0.2,
	'n': 0.3
	'b': 1000
}

myout = {
	'f': 0,
	'e': 0,
	'n': 0
}


app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('userinput')
def receive(userinput):
    print('received json: ' + str(userinput))
    uinp = json.decode(userinput)

if __name__ == '__main__':
    socketio.run(app)

while raw_input() == "next" and i<30:
	for k in range(l*i, l*(i+1)):
		t = mint[k]
		if t['category'] in foods:
			food.append((-1*t['amount'], t['name']))
			myout['f']+=-1*t['amount']
		elif t['category'] in ents:
			ent.append((-1*t['amount'], t['name']))
			myout['e']+=-1*t['amount']
		elif t['category'] in necs:
			nec.append((-1*t['amount'], t['name']))
			myout['n']+=-1*t['amount']
			
	emit('parsedmint', myout)

	i+= 1