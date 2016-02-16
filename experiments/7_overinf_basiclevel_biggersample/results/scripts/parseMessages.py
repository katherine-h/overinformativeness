import os, csv

<<<<<<< HEAD
datadir = "/Users/titlis/cogsci/projects/stanford/projects/overinformativeness/experiments/7_overinf_basiclevel_biggersample/experiment/data/"

csv_messagenames = [o for o in os.listdir("/Users/titlis/cogsci/projects/stanford/projects/overinformativeness/experiments/7_overinf_basiclevel_biggersample/experiment/data/message/") if (o.endswith('csv') & o.startswith('2016-11'))]

csv_trialnames =  [o for o in os.listdir("/Users/titlis/cogsci/projects/stanford/projects/overinformativeness/experiments/7_overinf_basiclevel_biggersample/experiment/data/clickedObj/") if (o.endswith('csv') & o.startswith('2016-11'))]
=======
datadir = "/Users/titlis/cogsci/projects/stanford/projects/overinformativeness/Caroline/6_OI_Final_Experiment2_version2/data/"

csv_messagenames = [o for o in os.listdir("/Users/titlis/cogsci/projects/stanford/projects/overinformativeness/Caroline/6_OI_Final_Experiment2_version2/data/message/") if (o.endswith('csv') & o.startswith('2015-111-'))]

csv_trialnames =  [o for o in os.listdir("/Users/titlis/cogsci/projects/stanford/projects/overinformativeness/Caroline/6_OI_Final_Experiment2_version2/data/clickObj/") if (o.endswith('csv') & o.startswith('2015-111-'))]
>>>>>>> e317e02081b3088e9160b391d825bc7c3e169a4e


# helper function to get messages associated with a particular trial
def getMessages(trial, messages):
	speakermessages = []
	listenermessages = []
	times = []
	
	for m in messages:
		if m['roundNum'] == str(trial):
			if m['sender'] == 'speaker':
				speakermessages.append(m['contents'])
			else:
				listenermessages.append(m['contents'])
			times.append(m['time'])
			
	mess = {'nummessages': len(speakermessages) + len(listenermessages),
			'numsmessages': len(speakermessages),
			'numlmessages': len(listenermessages),			 
			'listenermessages': listenermessages,
			'speakermessages': speakermessages,
			'times': times}		
			
	return mess
	
# first make sure that for every trial file there's a message file
for t in csv_trialnames:
	shared = False
	gameid = t[0:20]
	for m in csv_messagenames:	
		if m.startswith(gameid):
			shared = True

	if shared == False:
		print "corresponding message file not found: " + gameid
		csv_trialnames.pop(csv_trialnames.index(t))

print csv_messagenames
print csv_trialnames

print "Number of message files: " + str(len(csv_messagenames))
print "Number of trial files: " + str(len(csv_trialnames))



finalmessagelines = []
finaltriallines = []

# the meaty bit
for k,m in enumerate(csv_messagenames):
	#print m
	messagelines = []
	triallines = []

	messagereader = csv.DictReader(open(datadir+"/message/"+m, 'rb'),delimiter=",",quotechar='\"')
	messagelines.extend(list(messagereader))

<<<<<<< HEAD
	trialreader = csv.DictReader(open(datadir+"/clickedObj/"+m, 'rb'),delimiter=",",quotechar='\"')
=======
	trialreader = csv.DictReader(open(datadir+"/clickObj/"+m, 'rb'),delimiter=",",quotechar='\"')
>>>>>>> e317e02081b3088e9160b391d825bc7c3e169a4e
	triallines.extend(list(trialreader))
	headers = trialreader.fieldnames		

	for trial in range(1,len(triallines)+1):
		mess = getMessages(trial,messagelines)
		i = trial - 1
		triallines[i]['numMessages'] = mess['nummessages']
		triallines[i]['numSMessages'] = mess['numsmessages']	
		triallines[i]['numLMessages'] = mess['numlmessages']		
		triallines[i]['speakerMessages'] = "___".join(mess['speakermessages'])
		triallines[i]['listenerMessages'] = "___".join(mess['listenermessages'])
		triallines[i]['messageTimeStamps'] = "___".join(mess['times'])
		#print i
		#print k
		#print mess['speakermessages']
		try:
<<<<<<< HEAD
			triallines[i][' refExp']	= mess['speakermessages'][0]
		except IndexError:
			triallines[i][' refExp']	= "NA"
		if triallines[i][' trialType'] == "colorSizeTrial":
			size,color,typ = triallines[i]['nameClickedObj'].split("_")
		else:		
			size = "NA"
			color = "NA"
			typ = triallines[i]['nameClickedObj']
=======
			triallines[i]['refExp']	= mess['speakermessages'][0]
		except IndexError:
			triallines[i]['refExp']	= "NA"
		if triallines[i][' trialType'] == "colorSizeTrial":
			size,color,typ = triallines[i][' nameClickedObj'].split("_")
		else:		
			size = "NA"
			color = "NA"
			typ = triallines[i][' nameClickedObj']
>>>>>>> e317e02081b3088e9160b391d825bc7c3e169a4e
		triallines[i]['clickedSize'] = size
		triallines[i]['clickedColor'] = color
		triallines[i]['clickedType'] = typ
		sizementioned = False
		colormentioned = False	
		typementioned = False	

		try:
			refexp = [m.lower() for m in mess['speakermessages'][0].split()]
			if size in refexp:
				sizementioned = True
			if color in refexp:
				colormentioned = True
			if typ in refexp:
				typementioned = True
		except IndexError:
			print "no message on this trial"
		triallines[i]['sizeMentioned'] = sizementioned
		triallines[i]['colorMentioned'] = colormentioned	
		triallines[i]['typeMentioned'] = typementioned	

#	finalmessagelines = finalmessagelines + messagelines
	finaltriallines = finaltriallines + triallines		
	

headers.append('numMessages')
headers.append('numSMessages')	
headers.append('numLMessages')
headers.append('speakerMessages')
headers.append('listenerMessages')
headers.append('messageTimeStamps')
<<<<<<< HEAD
headers.append(' refExp')
=======
headers.append('refExp')
>>>>>>> e317e02081b3088e9160b391d825bc7c3e169a4e
headers.append('sizeMentioned')
headers.append('colorMentioned')
headers.append('typeMentioned')
headers.append('clickedType')
headers.append('clickedSize')
headers.append('clickedColor')



#print headers

<<<<<<< HEAD
print triallines[0].keys()
=======
#print triallines[0].keys()
>>>>>>> e317e02081b3088e9160b391d825bc7c3e169a4e

w = csv.DictWriter(open("../data/results.csv", "wb"),fieldnames=headers,restval="NA",delimiter="\t")
w.writeheader()
w.writerows(finaltriallines)
			
