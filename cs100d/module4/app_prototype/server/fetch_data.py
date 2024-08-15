import os
import pymysql
import random
from read_data import lines

chosen = input('Pick a number between 000 and 105: ')

#i'm basically just making a copy of loadpic, minus the sql stuff. maybe not the best way to do it, but for now, it's simple, and it works
def loadpic(x, lines):
    #assign variables to different lines of data file (is there an easy way to do this better?)
    #make sure to have the right number of things!!!
    line0 = lines[x]
    line1 = lines[x+1]
    line2 = lines[x+2]
    line3 = lines[x+3]
    line4 = lines[x+4]

    #define params and then execute with them
    params = (line0, line1, line2, line3, line4)

    return params
   

tuple_list = []
#do the loop until you are out of lines
for x in range(0, len(lines), 5):
  params = loadpic(x, lines)
  tuple_list.append(params)
    
result_row = tuple_list[int(chosen)]








