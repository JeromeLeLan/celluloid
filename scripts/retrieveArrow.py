#!/usr/bin/env python
# -*- coding: utf-8 -*-

import urllib
import urllib2
import os
import sys

ARROW_TYPE = 'ArrowVideo'

def main():

    aPath = os.path.join(os.getcwd(), ARROW_TYPE)
    if not os.path.exists(aPath):
        os.makedirs(aPath)

    urlList = []
    descriptionList = []
    htmlFile = open(ARROW_TYPE + ".txt", 'r') 
    html = htmlFile.read()

    while True:
        indexStart = html.find('<img src="https://images.arrowfilms.com/Images/')
        if indexStart == -1:
            break
        html = html[indexStart:]
        urlEnd = html.find('=277"')
        imgUrl = html[10:urlEnd-7]
        print imgUrl
        urlList.append(imgUrl)

        html = html[urlEnd:]
        index = html.find('list-item-details-title')
        html = html[index:]
        index = html.find('">')
        html = html[index:]
        indexEnd = html.find('</div>')
        imgDescription = html[2:indexEnd]
        print imgDescription
        descriptionList.append(imgDescription)
        html = html[indexEnd:]

    indexUrl = 0
    for link in urlList:
        affichePath = descriptionList[indexUrl] + ".jpg"
        affichePath = affichePath.replace(":", " ")
        affichePath = affichePath.replace("\"", " ")
        affichePath = affichePath.replace("*", " ")
        affichePath = affichePath.replace("?", " ")
        affichePath = affichePath.replace("/", " ")
        affichePath = ARROW_TYPE + "/" + affichePath 
        print("Retrieving " + affichePath)
        sys.stdout.flush()
        urllib.urlretrieve(link, affichePath)
        indexUrl = indexUrl + 1
        

if __name__ == '__main__':
    main()
    