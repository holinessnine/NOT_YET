from flask import Flask, jsonify
import pandas as pd
from flask_cors import CORS
from DB_Connector import DB_CONNECTOR

# MySQL 데이터베이스 연결 설정
db_config = {
    "host": "localhost",
    "user": "newuser",
    "password": "new_password",
    "database": "jiggle",
    "port": 3306,
    "auth_plugin": "mysql_native_password"
}

app = Flask(__name__)
CORS(app)

@app.route('/api/articles', methods=['GET'])
def get_articles():
    try:
        Connector = DB_CONNECTOR(db_config)
        select_query = "SELECT * FROM articles"
        df = Connector.read_data(select_query)
        return jsonify(df)
    except Exception as e:
        return jsonify({"Data Import Error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
