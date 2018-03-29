# Serverless-TextToVoice-Using-Lambda

## Resources:
- S3
- DynamoDB
- AMI
- SNS
- Lambda
- API Gateway
- Amazon Polly

## Setup

- Create a DynamoDB database with default settings.
- Create your 2 S3 buckets to store the posts and the mp3s for the posts. Make one of the S3 bucket as public as its the one that will contain your webpage. 
- Create topic in SNS for integrating/scheduling different parts of AWS.
	- Create a topic to ensure the posts were addeed to DynamoDB and triggers a lambda to get the post from the DB to Amazon Polly for convertion of text to voice(mp3s).
	- Create a topic for text to voice (mp3s) converstion when mp3 are written into S3.
- Create a AMI role which allows lambda to interact with different used AWS services such as DynamoDB, SNS, S3 and Polly.

- Create a Lambda function to insert new text posts into DynamoDB and sends notification to SNS after inserting the record.
- Create a Lambda function to convert text to voice, taking text from DynamoDB to Amazon Polly and storing mp3s to S3 after conversion by Polly. Make this lambda triggered by the previous lambda using the topic we created in SNS.
- Create a Lambda function to get post from DyanamoDB and play the mp3.
- Create your API using API Gateway, creating GET and POST methods invoking the respection lambda functions.
- We need to access API Gateway from S3, where our webpages are. Enable CORS so that S3 can interact with API Gateway.
- Setup your query strings and mapping setting of your GET method depending on the scripts.js of the project.
- Once done with your seeting up of your methods, deploy the API.
- Upload  webpage, script, css in your public S3 bucket.
- Provide your API endpoint to your script, so that S3 can interact with API gateway.