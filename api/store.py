from __main__ import app

@app.route('/api/test', methods=['GET'])
# request_data = request.get_json()
def test():
    return 'request_data[]'