#!/bin/bash
# load stock data for the day
# check to see if markets were open today
result=$(curl -sL "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo" | grep -sc $(date +%F))

# if open, scrape data and run predictions. otherwise do nothing
if [[ "$result" == "2" ]]
then
	python ~/StackReport/scrapers/stock_scraper.py daily >> ~/StackReport/logs/stock_scraper.log 2>&1
	python ~/StackReport/scrapers/mf_scraper.py daily >> ~/StackReport/logs/mf_scraper.log 2>&1
	python ~/StackReport/predictions/regression.py >> ~/StackReport/logs/regression.log 2>&1
fi
