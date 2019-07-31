import json
from watson_developer_cloud import AlchemyLanguageV1

class AIService:

    api_key = 'e48dd80d95f764b59af29665efc95cb1dbcaf321'
    def __init__(self):
        self.alchemy_language = AlchemyLanguageV1(api_key=AIService.api_key)

    # input : the paper's text
    # output : list of concepts
    def getConceptsFromHtml(self,paperHtml):
        response = self.alchemy_language.concepts(html=paperHtml,max_items=100,language='english')
        if response['status'] == 'OK':
            return response['concepts']
        else:
            return None

    def getConceptsFromText(self,paperText):
        response = self.alchemy_language.concepts(text=paperText,max_items=100)
        if response['status'] == 'OK':
            return response['concepts']
        else:
            return None