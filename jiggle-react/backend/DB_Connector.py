from flask import Flask, jsonify
from mysql.connector import Error
import mysql.connector
import pandas as pd
import os

# MySQL 데이터베이스 연결 설정
db_config = {
    "host": "localhost",
    "user": "root",  # 본인의 MySQL 사용자 이름으로 변경
    "password": "wjdtkfkd12",  # 본인의 MySQL 비밀번호로 변경
    "database": "jiggle",
    "port": 3306,
    "auth_plugin": "mysql_native_password"
}

class DB_CONNECTOR:
    def __init__(self, db_config):
        self.db_config = db_config

    def create_table(self, sql):
        try:
            # 데이터베이스 연결 생성
            conn = mysql.connector.connect(**db_config)

            if conn.is_connected():
                cursor = conn.cursor()

                print("connected")
                
                # SQL 쿼리 실행
                cursor.execute(sql)
            
                print("Table Created")

            # 조회 완료했으니 DB 연결 해제
            if conn.is_connected():
                cursor.close()
                conn.close()

        except Error as e:
            print(f"오류 : {e}")
    
    def upload_data(self, sql, df):
        df = df.where(pd.notnull(df), "no data")
        
        try:
            # 데이터베이스 연결 생성
            conn = mysql.connector.connect(**db_config)

            if conn.is_connected():
                cursor = conn.cursor()

                print("connected")
                
                # SQL 쿼리 실행
                for _, row in df.iterrows():
                    cursor.execute(sql, tuple(row))
                conn.commit()
                print("Upload Complete..!")

            # 조회 완료했으니 DB 연결 해제
            if conn.is_connected():
                cursor.close()
                conn.close()

        except Error as e:
            print(f"오류 : {e}")

    def read_data(self, sql):
        try:
            # 데이터베이스 연결 생성
            conn = mysql.connector.connect(**db_config)

            if conn.is_connected():
                cursor = conn.cursor()

                print("connected")
                
                # SQL 쿼리 실행
                cursor.execute(sql)
            
                result = cursor.fetchall()  # 실행한 결과
                columns = [desc[0] for desc in cursor.description]  # 컬럼 이름 가져오기
                result_df = pd.DataFrame(result, columns=columns)
                result_df = result_df.to_dict(orient='records')

            # 조회 완료했으니 DB 연결 해제
            if conn.is_connected():
                cursor.close()
                conn.close()

        except Error as e:
            print(f"오류 : {e}")

        return result_df