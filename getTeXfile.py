#!/usr/bin/env python2
# -*- coding: utf-8 -*-

'''
Downloading and compiling TeX pad script
'''

import urllib, json, codecs

apikey_file = open('APIKEY.txt', 'r')
apikey = apikey_file.readline().split()[0]
apikey_file.close()

data = urllib.urlopen("http://pad.supop.fr/api/1/getText?apikey=" + apikey + "&padID=test").read()

d = json.loads(data)
output = codecs.open("test.tex", "w", "utf-8")
output.write(d["data"]["text"])
output.close()

