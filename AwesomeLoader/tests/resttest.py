
import requests
import json
from pprint import pprint

print 'hello'
api_key = '59f37094e826f480c2a2537d8e9899d7'
base_url = 'http://api.springer.com'
collection = 'openaccess'           # can be : metadata, openaccess, integro
result_format = 'json'               # can be json , jsonp , app
method = 'doi'                      # can be doi, issn , isbn
query = 'name:hughes'
s = '1145'                              # start_results_from
m = '50'                            # number_of_results
data = ''
url = base_url+'/'+collection+'/'+result_format+'?q='+query+'&api_key='+api_key+'&s='+s+'&m='+m

response = requests.get(url, data=data)
response_text = response.text
jsonDecoder = json.JSONDecoder()
data = jsonDecoder.decode(response_text)
pprint(data.items())
# pprint(data['facets'])