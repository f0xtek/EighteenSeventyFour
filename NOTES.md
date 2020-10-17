# Notes

## Lambda Functions

### Crawler

1. Scrape 1874 fixtures-results page HTML
2. Parse HTML to return results table
    a. each result/fixture is a table row with class 'sp-row'
3. Convert relevant fixtures/results rows into JSON objects
4. Store JSON objects in DynamoDB

### Result/Fixture Parser

1. Invoked by new DynamoDB record
2. Get latest result & next fixture from dynamodb data
3. Create JS Object with data
4. Put message on SQS queue

### Notifier

1. Invoked by new message on SQS queue
2. Format data into SMS message
3. Send message to Twilio API to be sent as SMS
    a. if failed, return to SQS to be reprocessed up to n number of retries
    b. if retries exhausted, log error & alert via CloudWatch Alerts

## Infrastructure

### Lambda Functions

* Crawler
* Parser
* Notifier

### DynamoDB Table

* Results & Fixtures

### SQS Queue

* Twilio Message Queue

### CloudWatch Alerts

* Failed Twilio call

### CloudWatch Metrics Dashboard

* Lambdas
* DynamoDB Table
* SQS queue