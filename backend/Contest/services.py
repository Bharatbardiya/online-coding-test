import requests
from dotenv import dotenv_values


config = dotenv_values('../backend/.env')

token = "c3ee9e08-c2d1-4c37-accd-61ce35092c37"

def run_code(language, code):
    print(code,language)
    '''
    curl --request POST \
        --header 'Authorization: Token <token>' \
        --header 'Content-type: application/json' \
        --data '{"files": [{"name": "main.py", "content": "print(42)"}]}' \
        --url 'https://glot.io/api/run/python/latest'
    '''
    headers = {'Authorization': f"Token {token}", 'Content-type': 'application/json'}
    data = {
        "files" : [
            {
                "name": "main.py",
                "content": f"{code}"
            }
        ]
    }
    url = f"https://glot.io/api/run/{language}/latest"
    response = requests.post(url, headers=headers, data=data)
    
    return response 