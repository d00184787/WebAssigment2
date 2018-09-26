from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json

assassins = []

class MyHandler(BaseHTTPRequestHandler):

#    def readFromFile(self):
#        json_data = []
#        for line in open('list.txt', 'r'):
#            json_data.append(json.loads(line))
        #f = open("list.txt", "r")
        #json_data = (json.loads(f.read()))
#        print(json_data)
#        return json_data

#    def writeToFile(self, hitData):
#        new_lst = []
#        data = self.readFromFile()
#        print("THIS IS DATA", data)
#        for line in data:
#            new_lst.append(line)
#            print(line)
#        print(new_lst)

#        print("THIS IS NEW DATA", hitData['name'])
#        name = hitData['name']
#        name = name[0]
#        print("THIS IS INSIDE THE DATA", name)

#        new_lst.append(name)

#        print("FINAL LIST", new_lst)

#        f = open("list.txt", "w")
#        print('COVER TO JSON', json.dumps(new_lst))
#        f.write(json.dumps(new_lst))


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
