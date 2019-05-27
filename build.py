#!/usr/bin/python3

import subprocess

def main ():
    build = ["pkg", "--out-path=build", "."]
    subprocess.call(build)

main()