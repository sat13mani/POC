from flask import Flask, request, redirect
from flask_cors import CORS


app = Flask(__name__)

@app.route("/")
def data():
	code = request.args.get('code')
	return redirect('https://www.google.com');

if __name__ == "__main__":
	app.run(debug=True, port=9000)
