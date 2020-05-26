import csv
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

database = dict()

def preprocess():
	global database
	with open('data.csv', mode='r') as file:
		data = csv.reader(file, delimiter=',')
		line = 0
		for row in data:
			database[row[0]] = (row[1], row[2])


preprocess()

@app.route("/<username>/")
def getGitHubUsername(username):
	data = database[username]
	if data[0] == '1':
		return data[1]
	else:
		return data[0]


if __name__ == "__main__":
	app.run(debug=True, port=12345)
