import requests
import os
from dotenv import load_dotenv
import json
def fetch_google_drug_info(query, api_key, cx, num_images=10):
    # API endpoint
    url = "https://www.googleapis.com/customsearch/v1"
    
    # Parameters for the API request
    image_parames = {
        "q": query,               # Search query
        "cx": cx,                 # Custom Search Engine ID
        "key": api_key,           # API Key
        "searchType": "image",    # Search for images
        "num": num_images,        # Number of results to return
        "imgSize": "large",       # Fetch large-sized images
    }
    web_params = {
        "q": f"dwaprices {query}",               # Search query
        "cx": cx,                 # Custom Search Engine ID
        "key": api_key,           # API Key
     
    }

    # Make the API request for images
    image_response = requests.get(url, params=image_parames)
    # Extract the image URLs from the response
    image_results = image_response.json()
    images = [result["link"] for result in image_results.get("items", [])]

    # Make the API request for web results
    web_response = requests.get(url, params=web_params)
    # Extract the web URLs from the response
    web_results = web_response.json()
    websites = [result["link"] for result in web_results.get("items", [])]

    # Return a JSON response containing image URLs and website URLs
    return json.dumps({"images": images, "websites": websites})