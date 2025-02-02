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
        # print the full page source
        print(driver.page_source)
    
    finally:
        driver.quit()

if __name__ == "__main__":
    drug_id = int(input("enter the is : "))  # Replace with the drug ID you want to fetch
    drug_info = get_drug_info(drug_id)
    print(json.dumps(drug_info, indent=2, ensure_ascii=False))