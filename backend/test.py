import linkedin_api
import json
from flask import Flask
from flask_cors import CORS
import requests

API_KEY = '8613mr1913fovw'
API_SECRET = 'GxaKcGPTOGReR6UC'
RETURN_URL = 'https://student-util.herokuapp.com/'


params = {
    'response_type': 'code',
    'client_id': API_KEY,
    'redirect_uri': RETURN_URL,
    'state': 'lfdjasss',
    'scope': 'r_liteprofile'
}


app = Flask(__name__)
CORS(app)

api = linkedin_api.Linkedin('sat13mani@gmail.com', 'dustbin@123')

@app.route("/username/<name>")
def getProfile(name):
	print(name)
	profile = api.get_profile(name)
	return profile


@app.route("/search/<keyword>")
def search(keyword):
	result = api.search({"keywords": keyword}, limit=10)
	result = json.dumps(result)
	return result


@app.route("/test")
def test():
	r = requests.get('https://www.linkedin.com/oauth/v2/authorization', params)
	print(r)
	return str(r)	;


if __name__ == "__main__":
	app.run(debug=True, port=12344)
