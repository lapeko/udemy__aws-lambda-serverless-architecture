import AWS from 'aws-sdk';
AWS.config.update({ region: "eu-central-1" });

const tableName = "td_notes_sdk";
const documentClient = new AWS.DynamoDB.DocumentClient();

// batchItems();
// deleteItem();
// putItem();
// updateItem();

async function batchItems() {
  const params = {
    RequestItems: {
      [tableName]: [
        {
          DeleteRequest: {
            Key: { user_id: '124', timestamp: 123 }
          }
        },
        {
          PutRequest: {
            Item: {
              user_id: '111',
              timestamp: 111,
              title: "Title 111",
            }
          }
        },
        {
          PutRequest: {
            Item: {
              user_id: '222',
              timestamp: 222,
              title: "Title 222",
            }
          }
        }
      ]
    }
  };
  const result = await documentClient.batchWrite(params).promise();
  console.log(result);
}

async function deleteItem() {
  const params = {
    TableName: tableName,
    Key: {
      user_id: '124',
      timestamp: 124
    }
  }
  const result = await documentClient.delete(params).promise();
  console.log(result);
}

async function putItem() {
  const params = {
    TableName: tableName,
    Item: {
      user_id: '124',
      timestamp: 124,
      title: 'some title'
    },
  };
  const result = await documentClient.put(params).promise();
  console.log(result);
}

async function updateItem() {
  const params = {
    TableName: tableName,
    Key: {
      user_id: '124',
      timestamp: 123
    },
    UpdateExpression: 'set #title = :title',
    ExpressionAttributeNames: { "#title": "title" },
    ExpressionAttributeValues: { ":title": "Very new title" },
  }
  const result = await documentClient.update(params).promise();
  console.log(result);
}