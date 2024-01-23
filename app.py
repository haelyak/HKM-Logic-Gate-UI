from flask import Flask, render_template, request, jsonify
import json

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/write_to_json', methods=['POST'])
def write_to_json():
    selected_option = request.form.get('radio_option')

    # Assuming data is a dictionary, you can customize this based on your needs
    data = {'selected_option': selected_option}

    with open('output.json', 'w') as json_file:
        json_file.write(json.dumps(data, indent=2))

    return jsonify({'message': 'Data written to output.json'})

if __name__ == '__main__':
    app.run(debug=True)
