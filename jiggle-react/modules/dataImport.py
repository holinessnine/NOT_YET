import pandas as pd
import os
import numpy as np
import openpyxl

def dataImport(PATH):
    # 파일 경로 설정
    file_path = PATH

    # 엑셀 파일 불러오기
    wb = openpyxl.load_workbook(file_path)
    sheet = wb.active

    # 데이터와 하이퍼링크를 저장할 리스트 초기화
    data = []

    # 엑셀의 각 행을 반복 처리
    for row in sheet.iter_rows(min_row=1, values_only=False):
        row_data = [cell.value for cell in row]  # 현재 행의 모든 셀 값을 리스트로 추출
        hyperlink = row[0].hyperlink.target if row[0].hyperlink else None  # 첫 번째 열의 하이퍼링크 추출
        row_data.append(hyperlink)  # 하이퍼링크를 데이터 리스트에 추가
        data.append(row_data)

    # 데이터프레임 생성
    # 첫 번째 열 이름을 'Data', 하이퍼링크 열 이름을 'Hyperlink'로 설정
    column_names = [cell.value for cell in sheet[1]] + ['Hyperlink']  # 헤더 추출 및 하이퍼링크 열 이름 추가
    df = pd.DataFrame(data[1:], columns=column_names)  # 첫 행을 헤더로 사용

    return df