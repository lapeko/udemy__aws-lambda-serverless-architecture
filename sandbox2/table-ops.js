const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-central-1" });

const dynamoDb = new AWS.DynamoDB();

// dynamoDb.listTables().promise().then(console.log);

// dynamoDb
//   .describeTable({ TableName: "td_notes_sdk" })
//   .promise()
//   .then((data) => console.log(JSON.stringify(data, null, 2)));

// const createTableParams = {
//   TableName: "td_notes_sdk",
//   AttributeDefinitions: [
//     {
//       AttributeName: "user_id",
//       AttributeType: "S",
//     },
//     {
//       AttributeName: "timestamp",
//       AttributeType: "N",
//     },
//   ],
//   KeySchema: [
//     {
//       AttributeName: "user_id",
//       KeyType: "HASH",
//     },
//     {
//       AttributeName: "timestamp",
//       KeyType: "RANGE",
//     },
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 1,
//     WriteCapacityUnits: 1,
//   },
// };
// dynamoDb
//   .createTable(createTableParams)
//   .promise()
//   .then((data) => console.log(JSON.stringify(data)));

// const updateParams = {
//   TableName: "td_notes_sdk",
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 3,
//     WriteCapacityUnits: 2,
//   },
// };
// dynamoDb.updateTable(updateParams).promise().then(console.log);

// dynamoDb.deleteTable({ TableName: "td_notes_sdk" }).promise().then(console.log);
