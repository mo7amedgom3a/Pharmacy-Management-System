from bs4 import BeautifulSoup

def extract_drug_info(page_source):


    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(page_source, 'html.parser')

    # Extract the value 120
    salary = soup.find('span', style="color:red;font-size:60px;font-weight:700").text.strip()

    # Extract the text from the element with id "usesLink"
    uses_element = soup.find('p', id='usesLink')
    uses_text = ''
    for line in uses_element.stripped_strings:
        if line == '':
            break
        uses_text += line + '\n'
    uses_text = uses_text.strip()

    # Extract the title and image from the specified div
    pricemetatagsarea = soup.find('div', class_='pricemetatagsarea')
    title = pricemetatagsarea.find('img')['title']
    manufacturer = soup.find('td', text='الشركة ').find_next_sibling('td').text.strip()
    image = pricemetatagsarea.find('img')['src']
    barcode = soup.find('span', class_='barCoDe').text.strip()

    return {
        'salary': salary,
        'uses_text': uses_text,
        'title': title,
        'image': image,
        'manufacturer': manufacturer,
        'barcode': barcode
    }

