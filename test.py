import pymongo
  
  
client = pymongo.MongoClient("mongodb://auto-news-summary:auto-news-summary@localhost:4000/test",connect=False)
  
# Database Name

  
# Collection Name
col = client["test"]
collec = col["users"]
collec.insert_one({"email":"insert","username":"shit"})

#print(col)