from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs

pandas = []

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/pandas":
            self.handleAssassinFound_GET()
        else:
            self.handleNotFound()

    def de_POST(self):
        if self.path == "/pandass":
            self.handleAssassinFound_POST()
        else:
            self.handleNotFound()

    def handleNotFound(self):
        self.send_response(404)
        self.send_header("content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("404 Not Found.","utf-8"))

    def handleAssassinFound_GET(self):
        self.send_response(200)
        self.send_header("content-type", "text/html")
        self.end_headers()
        self.wfile.write(bytes("Hello " + str(pandas),"utf-8"))

    def handleAssassinFound_POST(self):
        self.send_response(200)
        #self.send_header("content-type", "application/x-www-form-urlencoded")

        #REMEMBER YOUR USING /PANDASS

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
