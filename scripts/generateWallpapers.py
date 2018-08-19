#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import sys, os, argparse, shutil
from PIL import Image, ImageOps # pip install Pillow

POSTER_COUNT = 9999
# POSTER_COUNT = 50 # Uncomment to test on poster subset

ROW_SIZE = 7
COLUMN_SIZE = 3
BACKGROUND_COLOR = '#797877'
WATCHED_COLOR = '#4f4e4d'

scriptPath = os.path.dirname(os.path.realpath(__file__))
postersPath = os.path.join(scriptPath, '../posters')
wallpapersPath = os.path.join(postersPath, 'wallpapers')
borderedPath = os.path.join(wallpapersPath, 'bordered')
rowsPath = os.path.join(wallpapersPath, 'rows')
alphanumericOrder = lambda item: (int(item.partition(' ')[0]) if item[0].isdigit() else float('inf'), item)

def cleanUpFolder():
  if os.path.exists(wallpapersPath):
    shutil.rmtree(wallpapersPath)
  os.makedirs(wallpapersPath)
  os.makedirs(borderedPath)
  os.makedirs(rowsPath)

def borderize():  
  posterCount = 0
  posters = sorted(os.listdir(postersPath), key=alphanumericOrder)
  for poster in posters:
    filePath = os.path.join(postersPath, poster)
    if not os.path.isfile(filePath):
      continue
    print(poster)
    img = Image.open(filePath)
    color = BACKGROUND_COLOR
    if '@seen' in poster:
      color = WATCHED_COLOR
    img = ImageOps.expand(img, border=75, fill=color)
    img.save(os.path.join(borderedPath, poster))
    posterCount += 1
    if posterCount > POSTER_COUNT:
      break

def createRows():
  posters = sorted(os.listdir(borderedPath), key=alphanumericOrder)
  row = []
  rowCount = 1
  for poster in posters:
    print(poster)
    if len(row) < ROW_SIZE:
      row.append(Image.open(os.path.join(borderedPath, poster)))    
    if len(row) < ROW_SIZE:
      continue
    
    widths, heights = zip(*(img.size for img in row))
    total_width = sum(widths)
    max_height = max(heights)
    rowImage = Image.new('RGB', (total_width, max_height))
    rowOffset = 0
    for img in row:
      rowImage.paste(img, (rowOffset, 0))
      rowOffset += img.size[0]

    fileName = str(rowCount) + ' - row' + '.jpg'
    rowImage.save(os.path.join(rowsPath, fileName))
    row.clear()
    rowCount += 1

def createWallpapers():
  rows = sorted(os.listdir(rowsPath), key=alphanumericOrder)
  column = []
  wallpaperCount = 1
  for row in rows:
    print(row)
    if len(column) < COLUMN_SIZE:
      column.append(Image.open(os.path.join(rowsPath, row)))    
    if len(column) < COLUMN_SIZE:
      continue
    
    widths, heights = zip(*(img.size for img in column))
    total_width = max(widths)
    max_height = sum(heights)
    wallpaper = Image.new('RGB', (total_width, max_height))
    columnOffset = 0
    for img in column:
      wallpaper.paste(img, (0, columnOffset))
      columnOffset += img.size[1]

    wallpaper = ImageOps.expand(wallpaper, border=150, fill=BACKGROUND_COLOR)
    fileName = 'wallpaper' + str(wallpaperCount) + '.jpg'
    wallpaper.save(os.path.join(wallpapersPath, fileName))
    column.clear()
    wallpaperCount += 1

def main():
  cleanUpFolder()
  borderize()
  createRows()
  createWallpapers()
  shutil.rmtree(borderedPath)
  shutil.rmtree(rowsPath)

if __name__ == '__main__':
	print(sys.version)
	main()
