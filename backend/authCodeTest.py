from flask import Flask, request, redirect
from flask_cors import CORS
import requests


app = Flask(__name__)

@app.route("/link")
def data():
	code = request.args.get('code')
	state = request.args.get('state')
	client_id = 'Iv1.6a23a85edae7274a'
	url = 'https://github.com/login/oauth/access_token'

	data = {
		'client_id': client_id,
		'code': code,
		'state': state,
		'client_secret': '26b6d03d65baf64c4ce8b8de5c95fbab3f749b8b'
	}

	headers = {
		'Accept': 'application/json'
	}

	res = requests.post(url=url, data=data, headers=headers)
	print(res.json())
	print("res url ", url)
	return str(res.json())

if __name__ == "__main__":
	app.run(debug=True, port=9000)
