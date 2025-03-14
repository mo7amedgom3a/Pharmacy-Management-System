"""
get drug information from the internet by scraping https://dwaprices.com/med.php?id=id website
extract priceNewEl class, usesLink id, newwtbl class, barCoDe class,  
"""
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from extract_drug_info import extract_drug_info
import json

def get_drug_info(drug_id):
    url = f"https://dwaprices.com/med.php?id={drug_id}"
    
    # Set up Chrome options
    chrome_options = Options()
    chrome_options.add_argument("--headless")  # Run headless Chrome
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    
    # Set up Chrome WebDriver
    service = Service('./chromedriver-linux64/chromedriver')  # Update with the path to your chromedriver
    driver = webdriver.Chrome(service=service, options=chrome_options)
    
    try:
        driver.get(url)
        
        # Wait for elements to load
        wait = WebDriverWait(driver, 10)
        
        # Get the full page source
        page_source = driver.page_source
        
        # pass the page source to the extract_drug_info.py file
        data = extract_drug_info(page_source)

        return data

    
    finally:
        driver.quit()
