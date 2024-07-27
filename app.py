from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/expand', methods=['POST'])
def expand_url():
    data = request.get_json()
    short_url = data['short_url']
    response = requests.head(short_url, allow_redirects=True)
    return jsonify({'expanded_url': response.url})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
