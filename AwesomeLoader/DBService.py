import mysql.connector
from mysql.connector import MySQLConnection, Error
import model

class DBService:
    cnx = {
        'host': 'alistestdbinstance.cnuohhom88jo.us-west-2.rds.amazonaws.com',
        'username': 'Team_Awesome',
        'password': 'Awesome_Team',
        'db': 'CS6460'
    }

    INSERT_INTO_PAPER = "INSERT INTO Paper(Title,abstract,Print_ISSN,Online_ISSN,Language,PageStart,PageEnd,DOI) VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"

    PAPER_EXISTS_BY_DOI = "SELECT COUNT(*) FROM Paper WHERE DOI = %s"

    INSERT_INTO_JOURNAL = "INSERT INTO Journal(Journal_Name,Phone_Number) VALUES(%s,%s)"

    JOURNAL_EXISTS = ("SELECT * FROM Journal "
                      "WHERE Journal_Name = %s")

    INSERT_INTO_JOURNAL_PAPER = "INSERT INTO Journal_Paper(Journal_Index,Paper_Index,URL,Journal_ID) VALUES(%s,%s,%s,%s)"

    INSERT_INTO_JOURNAL_PUBLICATION = "INSERT INTO Journal_Publication(Journal_Index,Publication_Date,Volume) VALUES(%s,%s,%s)"

    INSERT_INTO_PAPER_TAG = "INSERT INTO Paper_Tag(Paper_Index,Tag,Relevance) VALUES(%s,%s,%s)"


    def __enter__(self):
        return self

    def __exit__(self):
        self.db.close()

    def __init__(self):
        self.db = mysql.connector.connect(host=DBService.cnx['host'],
                                          database=DBService.cnx['db'],
                                          user=DBService.cnx['username'],
                                          password=DBService.cnx['password'])

    def checkPaperExists(self,doi):
        args = (doi,)
        cursor = self.db.cursor()
        cursor.execute(DBService.PAPER_EXISTS_BY_DOI, args)
        for row in cursor:
            if row is not None:
                count = row[0]
                return count > 0


    def insertPaper(self,paper, journal, author,journal_paper,journal_publication,tags):

        journal.Journal_Name = journal.Journal_Name.lower()         # convert journal name to lower case

        args = (paper.Title,paper.abstract,paper.Print_ISSN,paper.Online_ISSN ,paper.Language,paper.PageStart,paper.PageEnd,paper.DOI)
        try:
            cursor = self.db.cursor()
            # add to paper table
            cursor.execute(DBService.INSERT_INTO_PAPER, args)
            journal_paper.Paper_Index = cursor.lastrowid

            # add to journal table else return the id of the journal if already exists
            args = (journal.Journal_Name,)
            cursor.execute(DBService.JOURNAL_EXISTS,args )
            for row in cursor:
                if row is not None:
                    journal_paper.Journal_Index = row[0]
                    break
            if journal_paper.Journal_Index is None:
                cursor.execute(DBService.INSERT_INTO_JOURNAL, (journal.Journal_Name,journal.Phone_Number))
                journal_paper.Journal_Index = cursor.lastrowid


            if journal_paper.Paper_Index is not None and journal_paper.Journal_Index is not None:
                args = (journal_paper.Journal_Index , journal_paper.Paper_Index, journal_paper.URL, "")
                cursor.execute(DBService.INSERT_INTO_JOURNAL_PAPER,args)

                args = (journal_paper.Journal_Index , journal_publication.Publication_Date, journal_publication.Volume)
                cursor.execute(DBService.INSERT_INTO_JOURNAL_PUBLICATION, args)


                ################# we will leave the paper_authors insertion part for now , since we don't have info about the authors at the moment


                # add tags
                for tag in tags:
                    args = (journal_paper.Paper_Index,tag['text'].lower(),tag['relevance'])
                    try:
                        cursor.execute(DBService.INSERT_INTO_PAPER_TAG, args)
                    except Error as error:
                        print('error adding tag : ',error)


                self.db.commit()

        except Error as error:
            print(error)

        finally:
            cursor.close()
