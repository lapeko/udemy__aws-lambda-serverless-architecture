import AWS from 'aws-sdk';
AWS.config.update({ region: "eu-central-1" });

const tableName = "td_notes_sdk";
const documentClient = new AWS.DynamoDB.DocumentClient();

putItem();

async function putItem() {
  const params = {
    TableName: tableName,
    Item: {
      user_id: '124',
      timestamp: 124,
      title: 'some title 124',
      content: 'some content 124',
    },
    ConditionExpression: '#a <> :timestamp',
    ExpressionAttributeNames: { '#a': 'timestamp' },
    ExpressionAttributeValues: { ":timestamp": 124 },
  };
  const result = await documentClient.put(params).promise();
  console.log(result);
}