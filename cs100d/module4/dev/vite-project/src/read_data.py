#read image data
data_file = open("img_data.txt", "r", encoding='utf-8')
lines = data_file.read().splitlines()
data_file.close()