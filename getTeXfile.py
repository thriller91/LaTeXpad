#!/usr/bin/env python
# -*- coding: utf-8 -*-

'''
Downloading and compiling TeX pad script
'''

import os, sys
import urllib, json, codecs
from subprocess import call

os.chdir('docs')

if len(sys.argv)>1:
    padID = sys.argv[1]
else:
    quit()

apikey_file = open('../APIKEY.txt', 'r')
apikey = apikey_file.readline().split()[0]
apikey_file.close()

data = urllib.urlopen("http://pad.supop.fr/api/1/getText?apikey=" + apikey + "&padID=" + padID).read()

d = json.loads(data)
texFile = padID + ".tex"
output = codecs.open(texFile, "w", "utf-8")
output.write(d["data"]["text"])
output.close()

urllib.urlretrieve("latex.aslushnikov.com/compile?url=http://latex.supop.fr/docs/" + texFile, padID + ".pdf")
