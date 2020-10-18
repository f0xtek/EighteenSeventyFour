# Notes

## Lambda Functions

### Crawler

* Scrape 1874 fixtures-results page HTML
* Parse HTML to return results table
    a. each result/fixture is a table row with class 'sp-row'
* Convert relevant fixtures/results rows into JSON objects

```
{
  data: {
    results: [
      {
        date: '2020-10-13 15:00',
        fixture: 'Barnoldswick Town vs 1874 Northwich',
        stadium: 'Silentnight Stadium',
        home: false,
        result: '0 - 3',
        recap: 'https://1874northwich.com/matches/barnoldswick-town-vs-1874-northwich-4/',
      }
    ],
    fixtures: [
      {
        date: '2020-10-17 15:00',
        fixture: '1874 Northwich vs Irlam',
        stadium: 'Offside Trust Stadium',
        home: true,
        preview: 'https://1874northwich.com/matches/1874-northwich-vs-irlam-4/',
      }
    ]
  }
}
```

* Store JSON objects in DynamoDB
    * Separate table for results & fixtures?
    * Record per match?
    * Indexes?
* Put message on a queue with tables updated

### Result & Fixture Processor

* Invoked by dynamodb table update
* Get latest result & fixture from dynamodb data table
* Create JS Object with data
* Put message on SQS queue

### Notifier

* Invoked by a new message on SQS queue
* Format data into SMS message
* Send a message to Twilio API to be sent as SMS
    * if failed, return to SQS to be reprocessed up to n number of retries
    * if retries exhausted, log error & alert via CloudWatch Alerts

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