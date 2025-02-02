import requests
import os
from dotenv import load_dotenv

def fetch_google_images(query, api_key, cx, num_images=10):
    # API endpoint
    url = "https://www.googleapis.com/customsearch/v1"
    
    # Parameters for the API request
    params = {
        "q": query,               # Search query
        "cx": cx,                 # Custom Search Engine ID
        "key": api_key,           # API Key
        "searchType": "image",    # Search for images
        "num": num_images,        # Number of results to return
        "imgSize": "large",       # Fetch large-sized images
    }
    
    # Send the request to the API
    response = requests.get(url, params=params)
    response.raise_for_status()  # Check for errors
    
    # Parse the JSON response
    data = response.json()
    
    # Extract image URLs
    image_urls = [item["link"] for item in data.get("items", [])]
    web_urls = [item["image"]["contextLink"] for item in data.get("items", [])]
    
    
    return image_urls, web_urls

if __name__ == "__main__":
    # Replace these with your own API key and Search Engine ID
    load_dotenv()
    API_KEY = os.getenv("API_KEY")
    CX = os.getenv("CX")
    query = "بنفورا"  # Replace with your search query
    image_urls, web_urls = fetch_google_images(query, API_KEY, CX, num_images=10)
    
    for web, image in zip(web_urls, image_urls):
        print(f"Web URL: {web}")
        print(f"Image URL: {image}")
        print("*" * 50)