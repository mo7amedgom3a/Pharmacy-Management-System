
import requests
from io import BytesIO
from bs4 import BeautifulSoup

website_url = "https://altibbi.com/الادوية/فيوسيدين-اتش"
page = requests.get(website_url)
soup = BeautifulSoup(page.content, "html.parser")
div = soup.find("div", class_="mobile-drug-img")
if div:
    img = div.find("img", class_="drug_view_image")
    if img and 'src' in img.attrs:
        img_url = img['src']
        print(img_url)