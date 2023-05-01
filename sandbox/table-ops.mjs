import AWS from "aws-sdk";

AWS.config.update({ region: "eu-central-1" });
const dynamoDb = new AWS.DynamoDB();

const sdkTableName = "td_notes_sdk";

// createTable(sdkTableName);
// deleteTable(sdkTableName);
// setTwoRCUOneWCU(sdkTableName);
// showAllTableNames();
// showTableDescription(sdkTableName);

async function createTable(tableName) {
  const params = {
    TableName: tableName,
    AttributeDefinitions: [
      {
        AttributeName: "user_id",
        AttributeType: "S"
      },
      {
        AttributeName: "timestamp",
        AttributeType: "N"
      }
    ],
    KeySchema: [
      {
        AttributeName: "user_id",
        KeyType: "HASH"
      },
      {
        AttributeName: "timestamp",
        KeyType: "RANGE"
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
  };
  const result = await dynamoDb.createTable(params).promise();
  console.log(result);
};

async function deleteTable(tableName) {
  const props = {
    TableName: tableName,
  };
  const result = await dynamoDb.deleteTable(props).promise();
  console.log(result);
};

async function setTwoRCUOneWCU(tableName) {
  const params = {
    TableName: tableName,
    ProvisionedThroughput: {
      ReadCapacityUnits: 2, 
      WriteCapacityUnits: 1
     },
  };
  const result = await dynamoDb.updateTable(params).promise();
  console.log(result);
}

async function showAllTableNames() {
  const tables = await dynamoDb.listTables().promise();
  console.log(tables);
};

async function showTableDescription(tableName) {
  const description = await dynamoDb.describeTable({ TableName: tableName }).promise();
  console.log(JSON.stringify(description, null, 2));
};
