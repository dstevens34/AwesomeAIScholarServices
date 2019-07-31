import requests
import json
from pprint import pprint


class SpringerService:
    api_key = '59f37094e826f480c2a2537d8e9899d7'
    base_url = 'http://api.springer.com'
    result_format = 'json'  # can be json , jsonp , app

    def __init__(self):
        self.startFromRecordNumber = 1
        self.recordsPerPage = 10  # number_of_results
        self.query = 'name:hughes'
        self.collection = 'openaccess'  # can be : metadata, openaccess, integro

    def setQuery(self,query):
        self.query = query

    # returns a page of json containing a list of research paper meta data
    def getNextPage(self):
        url = SpringerService.base_url + '/' + self.collection + '/' + SpringerService.result_format + '?q=' + self.query + '&api_key=' + SpringerService.api_key + '&s=' + str(self.startFromRecordNumber) + '&p=' + str(self.recordsPerPage)
        response = requests.get(url)
        response_text = response.text
        jsonDecoder = json.JSONDecoder()
        data = jsonDecoder.decode(response_text)
        # pprint(data.items())
        self.startFromRecordNumber += self.recordsPerPage
        if len(data['records']) == 0:
            return None
        else:
            return data

    def setCurrentPage(self,n):
        self.startFromRecordNumber = n

    def resetCurrentPage(self):
        self.startFromRecordNumber = 1

    def setResultsPerPage(self,n):
        self.recordsPerPage = n
