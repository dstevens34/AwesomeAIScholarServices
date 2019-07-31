# 1) gets paper metadata from springer
# 2) sends paper info to watson to retrieve concept keywords
# 3) adds paper info and keyword info into the DB

import json
import requests
import SpringerRestService
import AIService
import DBService
import model

def getHtml(url):
    response = requests.get(url)
    return response.text

# removes urls on references to the concepts
def sanitizeConceptsObject(concepts):
    for concept in concepts:
        concept.pop('freebase', None)
        concept.pop('dbpedia', None)
        concept.pop('yago', None)
        concept.pop('opencyc', None)





aiService = AIService.AIService()
springerService = SpringerRestService.SpringerService()
dbService = DBService.DBService()

# use this link for help on setting the right query :  https://dev.springer.com/adding-constraints
# list of subjects that can be used in query
# Astronomy , Behavioral Sciences , Biomedical Sciences , Business & Management , Chemistry, Climate , Computer Science , Earth Sciences , Economics
# Education & Language , Energy , Engineering , Environmental Sciences , Food Science & Nutrition, Geography , Law , Life Sciences
# Materials , Mathematics , Medicine , Philosophy , Physics , Popular Science , Public Health , Social Sciences , Statistics , Water

# subject names which have a space in between should be enclosed in double quotes for example "Computer Science"
springerService.setQuery('subject:"Education & Language"')
springerService.startFromRecordNumber = 200

# fetch a page from springer service
page = springerService.getNextPage()
count = 0
skipped = 0
added = 0
failed = 0
while page is not None:
    # try loading all the papers on the page into our DB
    records = page['records']
    print 'on record : ',springerService.startFromRecordNumber
    for record in records:
        count += 1  # keep track of the total count of papers
        paper = model.Paper()
        paper.Title = record['title']
        paper.abstract = ''                     #TODO : find a way to get abstract
        paper.Print_ISSN = record['isbn']       #TODO : not sure how to get print issn , set this to isbn for now
        paper.Online_ISSN = record['issn']
        paper.Language = ''                     # TODO : language is empty for now , until we figure out how to determine language of the paper
        paper.PageStart = record['startingPage']
        paper.PageEnd = record['endingPage']
        paper.DOI = record['doi']

        # skip this paper if it alreday exists in the db
        if dbService.checkPaperExists(paper.DOI) :
            print 'skipped paper : ',paper.Title
            skipped+=1
            continue

        journal = model.Journal()
        journal.Journal_Name = record['publicationName']
        journal.Phone_Number = ''               # TODO : figure out how to get phone number
        journal.Address = ''                    # TODO : figure out how to get address

        author = model.Author()
        # TODO : the service does not return authors , therefore we'll just use the publisher as the author for now, until we figure out a better way
        author.First_Name = record['publisher']
        author.Last_Name = ''

        journal_paper = model.Journal_Paper()
        journal_paper.URL = record['url']

        journal_publication = model.Journal_Publication()
        journal_publication.Publication_Date = record['publicationDate']
        journal_publication.Volume = record['volume']

        tags = None

        try:
            html = getHtml(record['url'])
            tags = aiService.getConceptsFromHtml(html)
            sanitizeConceptsObject(tags)
            dbService.insertPaper(paper, journal, author,journal_paper,journal_publication,tags)
            added += 1 # increment counter for every successfully added paper
            print 'added paper : ', paper.Title
        except Exception as e:
            print 'failed paper : ', paper.Title    # print out the paper that failed to be added to db
            print e
            failed+=1

    # show the status after every batch of papers
    print 'count : ',count
    print 'successfuly added : ',added
    print 'failed adding : ',failed
    print 'skipped : ',skipped


    # fetch the next page of papers from springer
    page = springerService.getNextPage()






