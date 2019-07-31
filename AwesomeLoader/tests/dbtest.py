import mysql.connector
from mysql.connector import MySQLConnection, Error


cnx= {'host': 'alistestdbinstance.cnuohhom88jo.us-west-2.rds.amazonaws.com',
  'username': 'Team_Awesome',
  'password': 'Awesome_Team',
  'db': 'CS6460'}

db = mysql.connector.connect(host=cnx['host'],database=cnx['db'],user=cnx['username'],password=cnx['password'])

