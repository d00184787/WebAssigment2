from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs
import json

pandas = []

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/pandas":
            self.handleAssassinFound_LIST()
        else:
            self.handleNotFound()

    def do_POST(self):
        if self.path == "/pandas":
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
        #JSON Also ^^^
        self.end_headers()
        self.wfile.write(bytes(json.dumps(pandas),"utf-8"))
        #This will be the JSON code ^^^

    def handleAssassinFound_CREATE(self):
        self.send_response(201)
        #self.send_header("content-type", "application/x-www-form-urlencoded")
        #This will be on the client

        #

        length = self.headers["content-length"]
        body = self.rfile.read(int(length)).decode("utf-8")
        self.end_headers()
        print("THE BODY:", body)
        data = parse_qs(body)
        print("THE DATA", data)
        name = data['fname'][0]
        print("The First name:", name)
        
        pandas.append(name)


def run():
    listen = ('0.000', 8080)
    server = HTTPServer(listen, MyHandler)
    print('Listening...')
    server.serve_forever()
run()
