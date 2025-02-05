from get_google_drugs import fetch_google_drug_info
from drug_info import get_drug_info
from extract_drug_info import extract_drug_info
import os
from dotenv import load_dotenv
import re

if __name__ == "__main__":
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    CX = os.getenv("CX")
    query = "mixderm"  # Replace with your search query
    image_urls, web_urls = fetch_google_drug_info(query, API_KEY, CX, num_images=10)
    pattern = r"https://dwaprices.com/similars.php\?id=(\d+)"
    drug_id = None
    print(web_urls)

    for url in web_urls:
        match = re.search(pattern, url)
        if match:
            drug_id = match.group(1)
            break

    data = get_drug_info(drug_id)
    print(data)
