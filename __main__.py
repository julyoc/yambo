#!/usr/bin/python3
import threading
import subprocess
import shlex
import sys

def comand(arg):
    com = shlex.split(arg)
    return subprocess.call(com)

def appRun():
    out = comand('npm start')

def jsxBuild():
    out = comand('npm run jsx')

def runScript():
    while True:
        inp = input('')
        if inp == 'crearCol':
            out = comand('npm run dbc')
        elif inp == 'crearUser':
            out = comand('npm run user')
        else:
            out = comand(inp)

def main():
     h1 = threading.Thread(target=appRun)
     h2 = threading.Thread(target=jsxBuild)
     h3 = threading.Thread(target=runScript)

     h1.start()
     h2.start()
     h3.start()

print(__name__)
if __name__ == '__main__':
    main()
