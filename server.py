from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json

assassins = []

class MyHandler(BaseHTTPRequestHandler):

    def readFromFile(self):
        f = open("list.txt", "r")
        json_data = (json.loads(f.read()))
        print(json_data)
        return json_data

    def writeToFile(self, hitData):
        f = open("list.txt", "a")
        f.append(hitData)
        f.write(json.dumps(hitData))
        #{"name": ["WowMan"], "age": ["88"], "reason": ["lol"], "bounty": ["2500"]}
        #^^^ put in a list of dictionary [{},{},{}] <- in LIST not after.


    def do_GET(self):
        if self.path == "/assassins":
            self.handleAssassinFound_LIST()
        else:
            self.handleNotFound()

    def do_POST(self):
        if self.path == "/assassins":
            self.handleAssassinFound_CREATE()
        else:
            self.handleNotFound()

    def handleNotFound(self):
        self.send_response(404)
        self.send_header("content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("404 Not Found.","utf-8"))

    def handleAssassinFound_LIST(self):
        self.send_response(200)
        self.send_header("content-type", "application/json")
        self.send_header('Access-Control-Allow-Origin', '*')
        #JSON Also ^^^
        self.end_headers()
        self.wfile.write(bytes(json.dumps(assassins),"utf-8"))
        print(assassins)
        
    def handleAssassinFound_CREATE(self):
        self.send_response(201)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header("content-type", "application/x-www-form-urlencoded")
        length = self.headers["content-length"]
        body = self.rfile.read(int(length)).decode("utf-8")
        self.end_headers()

        print("THE BODY:", body)
        data = parse_qs(body) #Parse it as a dictonary
        print("THE DATA", data)
        name = data['name'][0]
        print("The First name:", name)
        
        assassins.append(name) #GOES BACK TO THE ASSASSIN GLOBAL VAR
        print(assassins)

        #self.writeToFile(data)

def run():
    listen = ('0.000', 8080)
    server = HTTPServer(listen, MyHandler)
    print('Listening...')
    server.serve_forever()
run()
