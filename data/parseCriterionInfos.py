#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys, os, shutil, json, urllib.request

def main():
	scriptPath = os.path.dirname(os.path.realpath(__file__))
	exportFile = os.path.join(scriptPath, 'criterionInfos.json')
	jsonResult = dict()
	jsonResult['movies'] = []
	
	aPath = os.path.join(scriptPath, 'affiches')
	shutil.rmtree(aPath)
	os.makedirs(aPath)
	
	url = 'https://www.criterion.com/shop/browse/list?sort=spine_number'
	request = urllib.request.Request(url)
	response = urllib.request.urlopen(request)
	html = response.read().decode('iso-8859-1')
	
	while True:
		strStart = '<tr class="gridFilm"'
		index = html.find(strStart)
		if index == -1:
			break

		movie = dict()
		html = html[index+32:]
		index = html.find('">')
		movie['url'] = html[:index]
		
		strStart = '<td class="g-spine"'
		index = html.find(strStart)
		html = html[index+23:]
		index = html.find('\n')
		movie['spine'] = html[:index]
		
		strStart = '<td class="g-img"'
		index = html.find(strStart)
		html = html[index+32:]
		index = html.find('alt=')
		movie['imgUrl'] = html[:index-2].replace('thumbnail', 'original').replace('small', 'original')
		
		strStart = '<td class="g-title"'
		index = html.find(strStart)
		html = html[index+24:]
		index = html.find('\n')
		movie['title'] = html[:index]
		movie['title'] = movie['title'].replace('&amp;', '&')

		strStart = '<td class="g-director"'
		index = html.find(strStart)
		html = html[index+28:]
		index = html.find('\n')
		movie['director'] = html[:index]
		
		strStart = '<td class="g-year"'
		index = html.find(strStart)
		html = html[index+24:]
		index = html.find('\n')
		movie['year'] = html[:index]
		
		strStart = '<td class="g-country"'
		index = html.find(strStart)
		html = html[index+27:]
		index = html.find('\n')
		movie['country'] = html[:index]

		fileName = ''
		addToJson = False
		if movie['spine'] != '':
			fileName += movie['spine'] + ' - '
			addToJson = True
		elif 'Eclipse Series' not in movie['title'] and 'Zatoichi' not in movie['title']:
			continue
		
		title = movie['title'].replace('/', ' ')
		title = title.replace(':', '')
		title = title.replace('&#039;', '\'')
		title = title.replace('<i>', '')
		title = title.replace('< i>', '')
		print(title.encode('iso-8859-1'))
		sys.stdout.flush()

		fileName += title
		filePath = os.path.join(aPath, fileName + '.jpg')				
		urllib.request.urlretrieve(movie['imgUrl'], filePath.encode('iso-8859-1'))

		if addToJson:
			jsonResult['movies'].append(movie)
		
	file = open(exportFile, 'w', encoding='iso-8859-1')
	file.write(json.dumps(jsonResult, indent=2, ensure_ascii=False, separators=(',', ': ')))
		

if __name__ == '__main__':
	main()
	