from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import os

client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))

app = Flask(__name__)
client = OpenAI()

@app.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")

@app.route('/generate_image', methods=['POST'])
def generate_image():
    prompt = request.json.get('prompt', '')
    try:
        if request.method == "POST":
            response = client.images.generate(
                model="dall-e-3",
                prompt=prompt,
                size="1024x1024",
                quality="standard",
                n=1,
            )
            image_url = response.data[0].url
            revised_prompt = response.data[0].revised_prompt
            return jsonify({'image_url': image_url, 'revised_prompt': revised_prompt})
    except Exception as e:
        return jsonify({'error': 'An error has occured.\n%s' % e.message})

if __name__ == "__main__":
    app.run(debug=True)
