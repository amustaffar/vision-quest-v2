from flask import Flask, request, jsonify
from flask_cors import CORS
from particles import run_particles

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['POST'])
def hello_world():
  id = request.form['id']
  f = request.files['data']
  return run_particles(id, f, 1, 20)
