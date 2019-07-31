python project for loading research papers with their concepts into our DB

You must have the following python module installed before running this :
1. IBM Watson Cloud API 
2. Python MySQL connector

install ibm watson cloud api through this command in your terminal :
pip install --upgrade watson-developer-cloud

to install python mysql connector , download and run the appropriate setup from here :
http://dev.mysql.com/downloads/connector/python/
 

to run this project :
1) open the Loader.py file and edit line 34 and 35 :
springerService.setQuery('name:hughes') // change this to your query
springerService.currentPage = 45    // change this to page number you want to start from 

2) run loader.py


after you are finished loading up papers , please make an entry into the loader_log.txt file.