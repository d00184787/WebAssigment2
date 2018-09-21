from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json

assassins = []

class MyHandler(BaseHTTPRequestHandler):
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
        #This will be the JSON code ^^^

    def handleAssassinFound_CREATE(self):
        self.send_response(201)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header("content-type", "application/x-www-form-urlencoded")
        length = self.headers["content-length"]
        body = self.rfile.read(int(length)).decode("utf-8")
        self.end_headers()

        #Problem: When you send a dictionary up to POST the URLENCODED will just
        #encoded as Object&object&etc instead of keeping the actual keys and values
        #then another problem is no matter what inside, once it parse
        #through the pare_qs it always end up as empty dictionary, leading nothing
        #appear once you use GET. Just empty list.

        print("THE BODY:", body)
        data = parse_qs(body) #Parse it as a dictonary
        print("THE DATA", data)
        name = data['name'][0]
        print("The First name:", name)
        
        assassins.append(name) #GOES BACK TO THE ASSASSIN GLOBAL VAR


def run():
    listen = ('0.000', 8080)
    server = HTTPServer(listen, MyHandler)
    print('Listening...')
    server.serve_forever()
run()
