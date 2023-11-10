from flask import Flask, render_template, request, send_from_directory, jsonify, json, url_for
from dinoAI import getAns

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/chat", methods=['POST'])
def apiChat():
    data = request.json
    chat = data.get('chat')
    ans = getAns(chat)
    res = jsonify({
        "answer": ans
    })
    return res


@app.route("/<path:name>")
def start(name):
    return render_template(name)


app.run()
