library(dplyr)
library(ggplot2)
library(bootstrap)
library(lme4)
library(tidyr)

theme_set(theme_bw(18))
setwd("/Users/titlis/cogsci/projects/stanford/projects/overinformativeness/experiments/26_24_without_cup/results")
setwd("/Users/elisakreiss/Documents/Stanford/overinformativeness/experiments/elisa_paper_relevant/interactiveReferenceGame/results")
source("rscripts/helpers.r")

d = read.table(file="data/results.csv",sep="\t", header=T, quote="")
nrow(d)
head(d)
unique(d$listenerMessages)
d[d$listenerMessages != "",c("listenerMessages","speakerMessages")]
summary(d)
# exclude NA referential experssions 
d = d[!(is.na(d$refExp)),]
#d = d[!d$speakerMessages == "",]
head(d)
nrow(d)

# first figure out how often target was chosen -- exclude trials where it wasn't?
table(d$context,d$targetStatusClickedObj)


# exclude trials with distractor choices
d = droplevels(d[d$targetStatusClickedObj == "target",])
# exclude participants that were not paid because they didn't finish it
d = droplevels(d[!(d$gameid == "6444-b" | d$gameid == "4924-4"), ])
# exclude tabu players
d = droplevels(d[!(d$gameid == "1544-1" | d$gameid == "4885-8" | d$gameid == "8360-7" | d$gameid == "4624-5" | d$gameid == "5738-a" | d$gameid == "8931-5" | d$gameid == "8116-a" | d$gameid == "6180-c" | d$gameid == "1638-6" | d$gameid == "6836-b"), ])
nrow(d)

# how many unique pairs?
length(levels(d$gameid)) 

table(d$context,d$typeMentioned)
table(d$context,d$colorMentioned)

# get meantypicalities from previous study
typ = read.csv(file="/Users/titlis/cogsci/projects/stanford/projects/overinformativeness/experiments/25_object_norming/results/data/meantypicalities.csv")
typ = read.csv(file="/Users/elisakreiss/Documents/Stanford/overinformativeness/experiments/elisa_paper_relevant/norming_comp_object/results/data/meantypicalities.csv")
typ = typ[as.character(typ$Item) == as.character(typ$utterance),]
row.names(typ) = paste(typ$Color,typ$Item)
head(typ)
nrow(typ)
summary(typ)

production = d
production$NormedTypicality = typ[paste(production$clickedColor,production$clickedType),]$MeanTypicality
production$binaryTypicality = as.factor(ifelse(production$NormedTypicality > .5, "typical", "atypical"))

#better/newer one
production$ColorMentioned = ifelse(grepl("green|purple|white|black|brown|purple|violet|yellow|gold|orange|prange|silver|blue|blu|pink|red|purlpe|pruple|puyrple|purplke|yllow|grean|dark|purp|yel|gree|gfeen|bllack|blakc|grey|neon|gray|blck|blu|blac|lavender|ornage|pinkish|^or ", production$refExp, ignore.case = TRUE), T, F)
production$CleanedResponse = gsub("(^| )([bB]ananna|[Bb]annna|[Bb]anna|[Bb]annana|[Bb]anan|[Bb]ananaa|ban|bana|banada|nana|bannan|babanana|B)($| )"," banana",as.character(production$refExp))
production$CleanedResponse = gsub("(^| )([Cc]arot|[Cc]arrrot|[Cc]arrott|car|carrpt|carrote|carr)($| )"," carrot",as.character(production$CleanedResponse))
production$CleanedResponse = gsub("(^| )([Pp]earr|pea)$"," pear",as.character(production$CleanedResponse))
production$CleanedResponse = gsub("(^| )([Tt]omaot|tokm|tmatoe|tamato|toato|tom|[Tt]omatoe|tomamt|tomtato|toamoat|mato|totomato|tomatop)($| )"," tomato",as.character(production$CleanedResponse))
production$CleanedResponse = gsub("(^| )([Aa]ppe|appple|APPLE|appl|app|apale|aple|ap)($| )"," apple",as.character(production$CleanedResponse))
production$CleanedResponse = gsub("(^| )([Pp]eper|pepp|peppre|pep|bell|jalapeno|jalpaeno|eppper|jalpaeno?)($| )"," pepper",as.character(production$CleanedResponse))
production$CleanedResponse = gsub("(^| )([Aa]vacado|avodado|avacdo|[Aa]vacadfo|avo|avacoda|avo|advocado|avavcado|avacodo|guacamole|gaucamole|guacolome|advacado|avacado,|avacado\\\\)($| )"," avocado",as.character(production$CleanedResponse))
production$ItemMentioned = ifelse(grepl("apple|banana|carrot|tomato|pear|pepper|avocado", production$CleanedResponse, ignore.case = TRUE), T, F)
production$CatMentioned = ifelse(grepl("fruit|fru7t|veg|veggi|veggie|vegetable", production$CleanedResponse, ignore.case = TRUE), T, F)
production$NegationMentioned = ifelse(grepl("not|isnt|arent|isn't|aren't|non", production$CleanedResponse, ignore.case = TRUE), T, F)
production$ColorModifierMentioned = ifelse(grepl("normal|abnormal|healthy|dying|natural|regular|funky|rotten|noraml|norm", production$CleanedResponse, ignore.case = TRUE), T, F)
production$DescriptionMentioned = ifelse(grepl("like|round|long|rough|grass|doc|bunnies|bunny|same|stem|ground|with|smile|monkey|sphere", production$CleanedResponse, ignore.case = TRUE), T, F)



#old
production$ColorMentioned = ifelse(grepl("green|purple|white|black|brown|purple|violet|yellow|gold|orange|prange|silver|blue|blu|pink|red|purlpe|pruple|puyrple|purplke|yllow|grean|dark|purp|yel|gree|gfeen|bllack|blakc|grey|neon|gray|blck|blu|blac|lavender|ornage|pinkish|re", production$refExp, ignore.case = TRUE), T, F)
production$CleanedResponse = gsub("(^| )([bB]ananna|[Bb]annna|[Bb]anna|[Bb]annana|[Bb]anan|[Bb]ananaa|ban|bana|banada|nana|bannan|babanana|B)($| )"," banana",as.character(production$refExp))
production$CleanedResponse = gsub("(^| )([Cc]arot|[Cc]arrrot|[Cc]arrott|car|carrpt|carrote)($| )"," carrot",as.character(production$CleanedResponse))
production$CleanedResponse = gsub("(^| )([Pp]earr|pea)$"," pear",as.character(production$CleanedResponse))
production$CleanedResponse = gsub("(^| )([Tt]omaot|tokm|tmatoe|tamato|toato|tom|[Tt]omatoe|tomamt|tomtato|toamoat|mato|totomato|tomatop)($| )"," tomato",as.character(production$CleanedResponse))
production$CleanedResponse = gsub("(^| )([Aa]ppe|APPLE|appl|app|apale|aple|ap)($| )"," apple",as.character(production$CleanedResponse))
production$CleanedResponse = gsub("(^| )([Pp]eper|pepp|peppre|pep|bell|jalapeno|jalpaeno|eppper)($| )"," pepper",as.character(production$CleanedResponse))
production$CleanedResponse = gsub("(^| )([Aa]vacado|avodado|avacdo|[Aa]vacadfo|avo|avacoda|avo|advocado|avavcado|avacodo|guacamole|gaucamole|guacolome|advacado)($| )"," avocado",as.character(production$CleanedResponse))
production$ItemMentioned = ifelse(grepl("apple|banana|carrot|tomato|pear|pepper|avocado", production$CleanedResponse, ignore.case = TRUE), T, F)
production$CatMentioned = ifelse(grepl("fruit|fru7t|veg|veggi|veggie|vegetable", production$CleanedResponse, ignore.case = TRUE), T, F)
production$NegationMentioned = ifelse(grepl("not|isnt|arent|isn't|aren't", production$CleanedResponse, ignore.case = TRUE), T, F)
production$ColorModifierMentioned = ifelse(grepl("normal|abnormal|healthy|dying|natural|regular|funky|rotten", production$CleanedResponse, ignore.case = TRUE), T, F)
production$DescriptionMentioned = ifelse(grepl("like|round|long|rough|grass|doc|bunnies|bunny|same|stem|ground|with|smile|monkey|sphere", production$CleanedResponse, ignore.case = TRUE), T, F)
#end of old 

prop.table(table(production$ColorMentioned,production$ItemMentioned))

production[!production$ColorMentioned & !production$ItemMentioned,c("CleanedResponse","context","gameid")]
production[production$ColorMentioned & !production$ItemMentioned,c("CleanedResponse","context","gameid")]

production$UtteranceType = as.factor(ifelse(production$ItemMentioned & production$ColorMentioned & !production$NegationMentioned & !production$CatMentioned & !production$DescriptionMentioned & !production$ColorModifierMentioned, "color_and_type", ifelse(production$ColorMentioned & !production$CatMentioned & !production$ItemMentioned & !production$NegationMentioned & !production$DescriptionMentioned & !production$ColorModifierMentioned, "color", ifelse(production$ItemMentioned & !production$ColorMentioned & !production$CatMentioned & !production$NegationMentioned & !production$DescriptionMentioned & !production$ColorModifierMentioned, "type", ifelse(!production$ItemMentioned & !production$ColorMentioned & production$CatMentioned & !production$NegationMentioned  & !production$Description & !production$ColorModifierMentioned, "cat", ifelse(!production$ItemMentioned & production$ColorMentioned & production$CatMentioned & !production$NegationMentioned & !production$DescriptionMentioned & !production$ColorModifierMentioned, "color_and_cat",ifelse(production$NegationMentioned, "negation", ifelse(production$DescriptionMentioned, "description", ifelse(production$ColorModifierMentioned, "color_modifier", "OTHER")))))))))

production[production$UtteranceType == "OTHER",c("gameid","refExp","context")]
table(production[production$UtteranceType == "OTHER",]$gameid) 

production$Color = ifelse(production$UtteranceType == "color",1,0)
production$ColorAndType = ifelse(production$UtteranceType == "color_and_type",1,0)
production$Type = ifelse(production$UtteranceType == "type",1,0)
production$ColorAndCat = ifelse(production$UtteranceType == "color_and_cat",1,0)
production$Cat = ifelse(production$UtteranceType == "cat",1,0)
production$Neg = ifelse(production$UtteranceType == "negation",1,0)
production$Description = ifelse(production$UtteranceType == "description",1,0)
production$ColorModifier = ifelse(production$UtteranceType == "color_modifier",1,0)
production$Other = ifelse(production$UtteranceType == "OTHER",1,0)
production$Item = production$clickedType
production$Half = ifelse(production$roundNum < 21,1,2)

nrow(production)

# add "real" distractors
dists = read.csv("data/dist_lexicon.csv")
row.names(dists) = dists$target
production$dDist1 = grepl("distractor_",production$alt1Name)
production$dDist2 = grepl("distractor_",production$alt2Name)
production$Dist1 = as.character(production$alt1Name)
production$Dist2 = as.character(production$alt2Name)
production[production$dDist1,]$Dist1 = as.character(dists[as.character(production[production$dDist1,]$nameClickedObj),]$distractor)
production[production$dDist2,]$Dist2 = as.character(dists[as.character(production[production$dDist2,]$nameClickedObj),]$distractor)

production$Dist1Color = sapply(strsplit(as.character(production$Dist1),"_"), "[", 2)
production$Dist1Type = sapply(strsplit(as.character(production$Dist1),"_"), "[", 1)
production$Dist2Color = sapply(strsplit(as.character(production$Dist2),"_"), "[", 2)
production$Dist2Type = sapply(strsplit(as.character(production$Dist2),"_"), "[", 1)

# create utterances for bda
production$UttforBDA = "other"
production[production$Color == 1,]$UttforBDA = as.character(production[production$Color == 1,]$clickedColor)
production[production$Type == 1,]$UttforBDA = as.character(production[production$Type == 1,]$clickedType)
production[production$ColorAndType == 1,]$UttforBDA = paste(as.character(production[production$ColorAndType == 1,]$clickedColor),as.character(production[production$ColorAndType == 1,]$clickedType),sep="_")

production$Informative = as.factor(ifelse(production$context %in% c("informative","informative-cc"),"informative","overinformative"))
production$CC = as.factor(ifelse(production$context %in% c("informative-cc","overinformative-cc"),"cc","no-cc"))

head(production)


# plot histogram of mentioned features by context
agr = production %>%
  select(ColorMentioned,ItemMentioned,context) %>%
  gather(Feature,Mentioned,-context)
agr$Feature = gsub("Mentioned","",as.character(agr$Feature))
agr = droplevels(subset(agr,Mentioned == "TRUE"))
head(agr)

ggplot(agr, aes(x=Feature)) +
  stat_count() +
  facet_wrap(~context)
ggsave("graphs/mentioned_features_by_context.png",width=8,height=3.5)

# plot utterance choice proportions with error bars
agr = production %>%
  select(Color,Type,ColorAndType,Other,context) %>%
  gather(Utterance,Mentioned,-context) %>%
  group_by(Utterance,context) %>%
  summarise(Probability=mean(Mentioned),ci.low=ci.low(Mentioned),ci.high=ci.high(Mentioned))
agr = as.data.frame(agr)
agr$YMin = agr$Probability - agr$ci.low
agr$YMax = agr$Probability + agr$ci.high

# change order of Utterance column
agr$Utterance <- as.character(agr$Utterance)
agr$Utterance <- factor(agr$Utterance, levels=c("Type", "Color", "ColorAndType", "Other"))

# change context names to have nicer facet labels 
levels(agr$context) = c("informative","informative\nwith color competitor", "overinformative", "overinformative\nwith color competitor")

ggplot(agr, aes(x=Utterance,y=Probability)) +
  geom_bar(stat="identity",width=.2,fill="orange",colour="orange") +
  geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.15,colour="grey") +
  facet_wrap(~context) +
  scale_x_discrete(labels=c("Only Type", "Only Color", "Color + Type", "Other")) +
  theme(axis.title=element_text(size=14,colour="#757575")) +
  theme(axis.text.x=element_text(angle=45,hjust=1,vjust=1,size=11,colour="#757575")) +
  theme(axis.text.y=element_text(size=10,colour="#757575")) +
  theme(axis.ticks=element_line(size=.25,colour="#757575"), axis.ticks.length=unit(.75,"mm")) +
  theme(strip.text.x=element_text(size=12,colour="#757575")) +
  theme(strip.background=element_rect(colour="#939393",fill="white")) +
  theme(panel.background=element_rect(colour="#939393"))
ggsave("graphs/paper/mentioned_features_by_context_other.png",width=7,height=7)


# plot utterance choice proportions by typicality
agr = production %>%
  select(Color,Type,ColorAndType,Other,binaryTypicality,context) %>%
  gather(Utterance,Mentioned,-context,-binaryTypicality) %>%
  group_by(Utterance,context,binaryTypicality) %>%
  summarise(Probability=mean(Mentioned),ci.low=ci.low(Mentioned),ci.high=ci.high(Mentioned))
agr = as.data.frame(agr)
agr$YMin = agr$Probability - agr$ci.low
agr$YMax = agr$Probability + agr$ci.high

# change order of Utterance column
agr$Utterance <- as.character(agr$Utterance)
agr$Utterance <- factor(agr$Utterance, levels=c("Type", "Color", "ColorAndType", "Other"))

# change context names to have nicer facet labels 
levels(agr$context) = c("informative","informative\nwith color competitor", "overinformative", "overinformative\nwith color competitor")

ggplot(agr, aes(x=binaryTypicality,y=Probability,color=Utterance,group=Utterance)) +
  geom_point() +
  geom_line() +
  #geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_wrap(~context) +
  scale_color_discrete(name="Utterance",
                       breaks=c("Type", "Color", "ColorAndType", "Other"),
                       labels=c("Only Type", "Only Color", "Color + Type", "Other")) +
  theme(axis.title=element_text(size=14,colour="#757575")) +
  theme(axis.text.x=element_text(size=11,colour="#757575")) +
  theme(axis.text.y=element_text(size=10,colour="#757575")) +
  theme(axis.ticks=element_line(size=.25,colour="#757575"), axis.ticks.length=unit(.75,"mm")) +
  theme(strip.text.x=element_text(size=12,colour="#757575")) +
  theme(legend.title=element_text(size=14,color="#757575")) +
  theme(legend.text=element_text(size=11,colour="#757575")) +
  theme(strip.background=element_rect(colour="#939393",fill="white")) +
  theme(panel.background=element_rect(colour="#939393"))
ggsave("graphs/paper/utterance_by_binarytyp.png",width=10,height=6.5)



# plot utterance choice proportions by typicality
agr = production %>%
  select(Color,Type,ColorAndType,Other,NormedTypicality,context) %>%
  gather(Utterance,Mentioned,-context,-NormedTypicality) %>%
  group_by(Utterance,context,NormedTypicality) %>%
  summarise(Probability=mean(Mentioned),ci.low=ci.low(Mentioned),ci.high=ci.high(Mentioned))
agr = as.data.frame(agr)
agr$YMin = agr$Probability - agr$ci.low
agr$YMax = agr$Probability + agr$ci.high

# change order of Utterance column
agr$Utterance <- as.character(agr$Utterance)
agr$Utterance <- factor(agr$Utterance, levels=c("Type", "Color", "ColorAndType", "Other"))

# change context names to have nicer facet labels 
levels(agr$context) = c("informative","informative\nwith color competitor", "overinformative", "overinformative\nwith color competitor")

ggplot(agr, aes(x=NormedTypicality,y=Probability,color=Utterance)) +
  geom_point(size=.5) +
  geom_smooth(method="lm",size=.6) +
  #geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_wrap(~context) +
  scale_color_discrete(name="Utterance",
                       breaks=c("Type", "Color", "ColorAndType", "Other"),
                       labels=c("Only Type", "Only Color", "Color + Type", "Other")) +
  theme(axis.title=element_text(size=14,colour="#757575")) +
  theme(axis.text.x=element_text(size=10,colour="#757575")) +
  theme(axis.text.y=element_text(size=10,colour="#757575")) +
  theme(axis.ticks=element_line(size=.25,colour="#757575"), axis.ticks.length=unit(.75,"mm")) +
  theme(strip.text.x=element_text(size=12,colour="#757575")) +
  theme(legend.title=element_text(size=14,color="#757575")) +
  theme(legend.text=element_text(size=11,colour="#757575")) +
  theme(strip.background=element_rect(colour="#939393",fill="white")) +
  theme(panel.background=element_rect(colour="#939393"))
ggsave("graphs/paper/utterance_by_conttyp.png",width=12,height=9)



# plot utterance choice proportions by typicality thick for poster
agr = production %>%
  select(Color,Type,ColorAndType,Other,NormedTypicality,context) %>%
  gather(Utterance,Mentioned,-context,-NormedTypicality) %>%
  group_by(Utterance,context,NormedTypicality) %>%
  summarise(Probability=mean(Mentioned),ci.low=ci.low(Mentioned),ci.high=ci.high(Mentioned))
agr = as.data.frame(agr)
agr$YMin = agr$Probability - agr$ci.low
agr$YMax = agr$Probability + agr$ci.high

# change order of Utterance column
agr$Utterance <- as.character(agr$Utterance)
agr$Utterance <- factor(agr$Utterance, levels=c("Type", "Color", "ColorAndType", "Other"))

# change context names to have nicer facet labels 
levels(agr$context) = c("informative","informative-cc", "overinformative", "overinformative-cc")

ggplot(agr, aes(x=NormedTypicality,y=Probability,color=Utterance)) +
  geom_point(size=2) +
  geom_smooth(method="lm",size=2.25) +
  #geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_wrap(~context) +
  scale_color_discrete(name="Utterance",
                       breaks=c("Type", "Color", "ColorAndType", "Other"),
                       labels=c("Only Type", "Only Color", "Color + Type", "Other")) +
  xlab("Typicality") +
  ylab("Empirical utterance proportion") +
  theme(axis.title=element_text(size=25,colour="#757575")) +
  theme(axis.text.x=element_text(size=20,colour="#757575")) +
  theme(axis.text.y=element_text(size=20,colour="#757575")) +
  theme(axis.ticks=element_line(size=.5,colour="#757575"), axis.ticks.length=unit(1,"mm")) +
  theme(strip.text.x=element_text(size=30,colour="#757575")) +
  theme(legend.position="top") +
  theme(legend.title=element_text(size=25,color="#757575")) +
  theme(legend.text=element_text(size=20,colour="#757575")) +
  theme(strip.background=element_rect(colour="#939393",fill="white")) +
  theme(panel.background=element_rect(colour="#939393"))
ggsave("graphs/paper/utterance_by_conttyp_poster.png",width=12,height=9)




# plot utterance choice proportions by typicality - find banana
agr = production %>%
  select(Color,Type,ColorAndType,Other,NormedTypicality,context,nameClickedObj) %>%
  gather(Utterance,Mentioned,-context,-NormedTypicality,-nameClickedObj) %>%
  group_by(Utterance,context,NormedTypicality,nameClickedObj) %>%
  summarise(Probability=mean(Mentioned),ci.low=ci.low(Mentioned),ci.high=ci.high(Mentioned))
agr = as.data.frame(agr)
agr$YMin = agr$Probability - agr$ci.low
agr$YMax = agr$Probability + agr$ci.high
# change order of Utterance column
agr$Utterance <- as.character(agr$Utterance)
agr$Utterance <- factor(agr$Utterance, levels=c("Type", "Color", "ColorAndType", "Other"))
# change context names to have nicer facet labels 
levels(agr$context) = c("informative","informative\nwith color competitor", "overinformative", "overinformative\nwith color competitor")
ggplot(agr, aes(x=NormedTypicality,y=Probability,color=Utterance,label=nameClickedObj)) +
  geom_point(size=.5) +
  geom_smooth(method="lm",size=.6) +
  #geom_errorbar(aes(ymin=YMin,ymax=YMax),width=.25) +
  facet_wrap(~context) +
  scale_color_discrete(name="Utterance",
                       breaks=c("Type", "Color", "ColorAndType", "Other"),
                       labels=c("Only Type", "Only Color", "Color + Type", "Other")) +
  theme(axis.title=element_text(size=14,colour="#757575")) +
  theme(axis.text.x=element_text(size=10,colour="#757575")) +
  theme(axis.text.y=element_text(size=10,colour="#757575")) +
  theme(axis.ticks=element_line(size=.25,colour="#757575"), axis.ticks.length=unit(.75,"mm")) +
  theme(strip.text.x=element_text(size=12,colour="#757575")) +
  theme(legend.title=element_text(size=14,color="#757575")) +
  theme(legend.text=element_text(size=11,colour="#757575")) +
  theme(strip.background=element_rect(colour="#939393",fill="white")) +
  theme(panel.background=element_rect(colour="#939393"))
#get banana values
agr[agr$context=="informative\nwith color competitor" & agr$Utterance=="ColorAndType" & agr$nameClickedObj=="banana_yellow",c("NormedTypicality","Probability")]

