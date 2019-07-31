import json
from os.path import join, dirname
from watson_developer_cloud import AlchemyLanguageV1


# credentials = {
#   "url": "https://gateway-a.watsonplatform.net/calls",
#   "note": "It may take up to 5 minutes for this key to become active",
#   "apikey": "11a1aee02da53b9fed610e22583f273aa61be76f"
# }

alchemy_language = AlchemyLanguageV1(api_key='11a1aee02da53b9fed610e22583f273aa61be76f')

# url = 'https://developer.ibm.com/watson/blog/2015/11/03/price-reduction-for-watson-personality-insights/'
url = 'http://www.sciencedirect.com/science/article/pii/S1074552100001265'

txt = "As microbes become increasingly resistant to antibiotics, " \
      "and in many cases to several drugs simultaneously, " \
      "the search is on to find new therapies. " \
      "One method to combat resistance is to use inhibitors of" \
      " resistance mechanisms to potentiate existing antibiotics." \
      " Recent efforts are encouraging and highlight the importance " \
      "of research at the chemistry-microbiology interface in " \
      "developing new approaches to tackle resistance."
# print(json.dumps(alchemy_language.targeted_sentiment(text='I love cats! Dogs are smelly.',
#                                                      targets=['cats', 'dogs'], language='english'), indent=2))
# print(json.dumps(alchemy_language.targeted_emotion(text='I love apples. I hate bananas',
#                                                    targets=['apples', 'bananas'], language='english'), indent=2))

# print(json.dumps(alchemy_language.author(url=url), indent=2))
print(json.dumps(alchemy_language.concepts(text=txt), indent=2))
# print(json.dumps(alchemy_language.dates(url=url, anchor_date='2016-03-22 00:00:00'), indent=2))
# print(json.dumps(alchemy_language.emotion(url=url), indent=2))
# print(json.dumps(alchemy_language.entities(url=url), indent=2))
# print(json.dumps(alchemy_language.keywords(max_items=5, url=url), indent=2))
# print(json.dumps(alchemy_language.category(url=url), indent=2))
# print(json.dumps(alchemy_language.typed_relations(url=url), indent=2))
# print(json.dumps(alchemy_language.relations(url=url), indent=2))
# print(json.dumps(alchemy_language.language(url=url), indent=2))
# print(json.dumps(alchemy_language.text(url=url), indent=2))
# print(json.dumps(alchemy_language.raw_text(url=url), indent=2))
# print(json.dumps(alchemy_language.title(url=url), indent=2))
# print(json.dumps(alchemy_language.feeds(url=url), indent=2))
# print(json.dumps(alchemy_language.microformats(url='http://microformats.org/wiki/hcard-examples'), indent=2))
# print(json.dumps(alchemy_language.publication_date(url=url), indent=2))
# print(json.dumps(alchemy_language.taxonomy(url=url), indent=2))
# combined_operations = ['entity', 'keyword', 'title', 'taxonomy', 'concept', 'doc-emotion']
# print(json.dumps(alchemy_language.combined(text=txt, extract=combined_operations), indent=2))

# Get sentiment and emotion information results for detected entities/keywords:
# print(json.dumps(alchemy_language.entities(url=url, sentiment=True, emotion=True), indent=2))
# print(json.dumps(alchemy_language.keywords(max_items=5, url=url, sentiment=True, emotion=True), indent=2))
