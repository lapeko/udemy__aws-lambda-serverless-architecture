import AWS from 'aws-sdk';
AWS.config.update({ region: "eu-central-1" });

const tableName = "td_notes_sdk";
const documentClient = new AWS.DynamoDB.DocumentClient();

// getByKey({ userId: '222', timestamp: 222 });
// queryBeUserId({ userId: '222' });
// scan({ timestampMoreThan: 111 });
batchGet();

async function getByKey({ userId, timestamp }) {
  const params = {
    TableName: tableName,
    Key: {
      user_id: userId,
      timestamp,
    }
  };
  const result = await documentClient.get(params).promise();
  console.log(result);
  return result;
};

async function queryBeUserId({ userId }) {
  const params = {
    TableName: tableName,
    KeyConditionExpression: 'user_id = :userId',
    ExpressionAttributeValues: {
      ':userId': userId,
    }
  };

  const result = await documentClient.query(params).promise();
  console.log(result);
  return result;
}

async function scan({ timestampMoreThan } = {}) {
  const params = {
    TableName: tableName,
    ...timestampMoreThan ? {
      FilterExpression: '#timestamp > :timestampMoreThan',
      ExpressionAttributeNames: { "#timestamp": "timestamp" },
      ExpressionAttributeValues: { ':timestampMoreThan': timestampMoreThan },
    } : undefined,
  };

  console.log({ params });

  const result = await documentClient.scan(params).promise();
  console.log(result);
  return result;
}

async function batchGet() {
  var params = {
    RequestItems: {
      [tableName]: {
        Keys: [{ user_id: '222', timestamp: 222 }, { user_id: '111', timestamp: 111 }]
      },
      // [tableName]: {
      //   Keys: [{ user_id: '111', timestamp: 111 }]
      // }
    }
  };

  const result = await documentClient.batchGet(params).promise();
  console.log(JSON.stringify(result, null, 2));
  return result;
}
