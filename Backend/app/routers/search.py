from fastapi import APIRouter, Depends
from schemas.drug_search import DrugSearchBase
from typing import List
from get_google_drugs import fetch_google_drug_info
from drug_info import get_drug_info
import os
from dotenv import load_dotenv
import json
import re
router = APIRouter(prefix="/search", tags=["Search"])

# serch by drug name
@router.get("/{drug_name}", status_code=200)
def search_drug(drug_name: str):
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    CX = os.getenv("CX")
    query = drug_name
    result = fetch_google_drug_info(query, API_KEY, CX)
    images_list = json.loads(result)["images"]
    pattern = "https://dwaprices.com/med.php\?id=(\d+)"
    match = re.search(pattern, json.loads(result)["websites"][0])
    if match:
        drug_id = match.group(1)
        drug_info = get_drug_info(drug_id)
        return drug_info
    else:
        return {"images": images_list}