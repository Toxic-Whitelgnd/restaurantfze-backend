# import pymongo

# client = pymongo.MongoClient("mongodb+srv://whitelegend56:q1olisZZfHsPMazm@cluster0.jsetkub.mongodb.net/?retryWrites=true&w=majority")

# # mongodb+srv://whitelegend56:q1olisZZfHsPMazm@cluster0.jsetkub.mongodb.net/?retryWrites=true&w=majority




def inserttohomepage():
    hid = ["1","2","3","4","5","6","7","8","9","10","11","12"]
    hname = ["CRM","TAKE AWAY","TAKE AWAY LOG","DELIVERY SALE","COD LOG","DINE IN","SALE ORDER DETAILS","SETTING SALE","PAY BACK","EXPENSES","CREDIT SALE","CASH AT STARTING"]
    hicon = ["faUsers","faSackDollar","faWallet","faTruck","faCircleDollarToSlot","faUtensils","FaListUl","FaListUl","faMoneyBillWave","FaListUl","FaListUl","faWallet"]
    hurl = ["/crm","/takeaway","/takeawaylog","/profile","/profile","/dinein","/saleorderdetails","/settlesale","/payback","/expenses","/creditsale","/cashatstarting"]
    hcolor = ["#3ecd5e","#3ecd5e","#3ecd5e","#3ecd5e","#4c49ea","#4c49ea","#4c49ea","#4c49ea","#f9b234","#f9b234","#f9b234","#f9b234"]

    for i,n,c,u,co in zip(hid,hname,hicon,hurl,hcolor):
        doc = {
            'home_id':i,
            'home_name':n,
            'home_icon':c,
            'home_url':u,
            'home_color':co,
        }
        home_page.insert_one(doc)
    
    
def insert_to_dineintables():
    tid = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"]
    ttype = ["indoor","indoor","indoor","indoor","indoor","indoor","indoor","indoor","indoor","indoor","indoor","indoor","indoor","indoor","indoor","outdoor","outdoor","outdoor"]
    tableno = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","1","2","3"]
    totcap = ["4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4","4"]
    pplocuped = ["0","0","2","0","0","0","4","0","0","0","0","0","0","0","0","0","0","0"]
    itemsordered = ["0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]
    color = ["#009946","#009946","#009946","#009946","#009946","#009946","#009946","#009946","#009946","#009946","#009946","#009946","#009946","#009946","#009946","#009946","#009946","#009946"]
    tabletaken = ["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]
    url = ["/itable/1","/itable/2","/itable/3","/itable/4","/itable/5","/itable/6","/itable/7","/itable/8","/itable/9","/itable/10","/itable/11","/itable/12","/itable/13","/itable/14","/itable/15","/otable/1","/otable/2","/otable/3"]

    for a,b,c,d,e,f,g,h,i in zip(tid,ttype,
                                 tableno,totcap,pplocuped,itemsordered,color,tabletaken,url):
        doc = {
            'table_id':a,
            'table_type':b,
            'table_no':c,
            'table_capacity':d,
            'table_pploccupied':e,
            'table_itemsordered':f,
            'table_color':g,
            'table_taken':h,
            'table_url':i,
        }

        table_page.insert_one(doc)




from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
uri = "mongodb+srv://whitelegend56:q1olisZZfHsPMazm@cluster0.jsetkub.mongodb.net/?retryWrites=true&w=majority"
# Create a new client and connect to the server
client = MongoClient(uri)
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")

    db = client.get_database("fzerestaurant")

    # defining the collections
    home_page = db.home_page
    table_page = db.table_page

    # inserttohomepage()
    insert_to_dineintables()

except Exception as e:
    print(e)


def fetchdata():
    query = home_page.find({})
    for i in query:
        print(i)

fetchdata()