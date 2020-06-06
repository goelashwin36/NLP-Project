from flask import Flask
from flask import jsonify
from utils import keyword_ext
from utils import FetchImage
from flask import request
import json
from flask_cors import CORS, cross_origin

app = Flask(__name__)

CORS(app)

"""
Route: '/'
Methods: 'GET'
Description: 'This route returns a simple message to show that server is running fine!'
Parameters: None
Returns: String: "App up and running!!"
"""
@app.route('/', methods=["GET"])
def home():
    return "App up and running!!"

"""
Route: '/getImages'
Methods: 'POST'
Description: 'The route takes in a sentence and after preprocessing it returns a list of links of images fetched.'
Parameters: String: sentence
Returns: JSON: {'data': list[{'image_url': string, 'search_word': array, 'friendly': bool}]}
"""

@app.route('/getImages', methods=["POST"])
def respond():
    s = request.json['sentence']

    out_list = [] # Stores the final search query results

    # The string is converted into an array of phrases
    phrases = keyword_ext(s)

    # Iterate in all the phrases and add the fetched image query to the out_list
    for i in phrases:
        out_list.append(FetchImage(i))
    return jsonify({
        'data' : out_list
    })


if __name__ == '__main__':
    app.run(port=8080)
