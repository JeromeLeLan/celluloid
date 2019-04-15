#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, os, argparse, shutil, json, urllib.request

scriptPath = os.path.dirname(os.path.realpath(__file__))
spineFile = os.path.join(scriptPath, '../data/spine.txt')
exportFile = os.path.join(scriptPath, '../public/criterionInfos.json')
posterPath = os.path.join(scriptPath, '../posters')
criterionUrl = 'https://www.criterion.com/shop/browse/list?sort=spine_number'

def cleanUpFolder():
  if os.path.exists(posterPath):
    shutil.rmtree(posterPath)
  else:
    os.makedirs(posterPath)

def cleanString(str):
  str = str.replace('&amp;', '&')
  str = str.replace('&#039;', '\'')
  str = str.replace('&hellip;', '...')
  str = str.replace('&nbsp;', ' ')
  str = str.replace('<i>', '')
  str = str.replace('< i>', '')
  return str

def cleanFilename(str):
  str = str.replace(':', ' ')
  str = str.replace('/', ' ')
  return str

def parseCriterion(getPosters):
  jsonResult = dict()
  jsonResult['movies'] = []

  watchedList = []
  with open(spineFile, 'rU') as f:
    for movieWatched in f:
      watchedList.append(movieWatched.strip() == '1')

  if getPosters:
    cleanUpFolder()

  request = urllib.request.Request(criterionUrl)
  response = urllib.request.urlopen(request)
  html = response.read().decode('iso-8859-1')

  while True:
    strStart = '<tr class="gridFilm"'
    index = html.find(strStart)
    if index == -1:
      break

    movie = dict()
    html = html[index+54:]
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
    movie['imgUrl'] = html[:index - 2].replace('thumbnail', 'original').replace('small', 'original')

    strStart = '<td class="g-title"'
    index = html.find(strStart)
    html = html[index+19:]
    strStart = '">'
    index = html.find(strStart)
    html = html[index+6:]
    index = html.find('\n')
    movie['title'] = cleanString(html[:index])

    strStart = '<td class="g-director"'
    index = html.find(strStart)
    html = html[index+28:]
    index = html.find('\n')
    movie['director'] = cleanString(html[:index])

    strStart = '<td class="g-country"'
    index = html.find(strStart)
    html = html[index+28:]
    index = html.find('</td>')
    countryStr = html[:index]
    index = countryStr.find('<span')
    if index != -1:
      movie['country'] = cleanString(countryStr[:index])
    else:
      movie['country'] = ''

    strStart = '<td class="g-year"'
    index = html.find(strStart)
    html = html[index+24:]
    index = html.find('\n')
    movie['year'] = cleanString(html[:index])

    fileName = ''
    addToJson = False
    if movie['spine'] != '':
      fileName += movie['spine'] + ' - '
      addToJson = True
    elif 'Eclipse Series' not in movie['title'] and 'Zatoichi' not in movie['title']:
      continue

    print(movie['title'].encode('iso-8859-1'))
    sys.stdout.flush()

    if addToJson:
      movie['spine'] = int(movie['spine'])
      movie['watched'] = watchedList[movie['spine'] - 1]
      jsonResult['movies'].append(movie)

      if getPosters:
        fileName += movie['title']
        fileName = cleanFilename(fileName)
        if movie['watched']:
          fileName += ' @seen'
        filePath = os.path.join(posterPath, fileName + '.jpg')
        urllib.request.urlretrieve(movie['imgUrl'], filePath.encode('iso-8859-1'))

  file = open(exportFile, 'w', encoding='iso-8859-1')
  file.write(json.dumps(jsonResult, indent=2, ensure_ascii=False, separators=(',', ': ')))

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('-p', '--posters', action='store_true')
  args = parser.parse_args()
  parseCriterion(args.posters)

if __name__ == '__main__':
	print(sys.version)
	main()
