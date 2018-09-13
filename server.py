from http.server import BaseHTTPRequestHandler, HTTPServer

class MyHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path == "/pandas":
	        self.send_response(200)
	        self.send_header("content-type", "text/html")
	        self.end_headers()
	        self.wfile.write(bytes("Hello.","utf-8"))
        else:
	        self.send_response(404)
	        self.send_header("content-type", "text/html")
	        self.end_headers()
	        self.wfile.write(bytes("404 Not Found.","utf-8"))

    def de_POST(self):
        pass

def run():
    listen = ('0.000', 8080)
    server = HTTPServer(listen, MyHandler)
    print('Listening...')
    server.serve_forever()
run()
