from get_google_drugs import fetch_google_drug_info
from drug_info import get_drug_info

import os
from dotenv import load_dotenv
import json
import re

if __name__ == "__main__":
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    CX = os.getenv("CX")
    query = "فيوسيدين"  # Replace with your search query
    result = fetch_google_drug_info(query, API_KEY, CX)
    # print(result)
    pattern = "https://dwaprices.com/med.php\?id=(\d+)"
    match = re.search(pattern, json.loads(result)["websites"][0])
    if match:
        drug_id = match.group(1)
        drug_info = get_drug_info(drug_id)
        print(drug_info)
    else:
        print("No drug information found")