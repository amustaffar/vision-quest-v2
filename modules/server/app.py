from flask import Flask, request, jsonify
from flask_cors import CORS
from particles import run_particles

app = Flask(__name__)
CORS(app)

@app.route("/", methods=['POST'])
def hello_world():
  f = request.files['data']
  return run_particles(f, 1, 20)
  # return { "hello": "world" }
