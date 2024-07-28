from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return "Welcome to the URL Expander Service. Use the /expand endpoint to expand shortened URLs."

@app.route('/expand', methods=['POST'])
def expand_url():
    data = request.get_json()
    short_url = data['url']
    response = requests.head(short_url, allow_redirects=True)
    return jsonify({'expanded_url': response.url})

if __name__ == '__main__':
    import os
    port = int(os.environ.get('PORT', 8080))
    app.run(host='0.0.0.0', port=port)
