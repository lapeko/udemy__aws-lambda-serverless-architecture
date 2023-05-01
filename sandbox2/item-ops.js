const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-central-1" });

const dynamoDB = new AWS.DynamoDB();
const documentClient = new AWS.DynamoDB.DocumentClient();

// dynamoDB
//   .createTable({
//     TableName: "td_notes_sdk",
//     AttributeDefinitions: [
//       {
//         AttributeName: "user_id",
//         AttributeType: "S",
//       },
//       {
//         AttributeName: "timestamp",
//         AttributeType: "N",
//       },
//     ],
//     KeySchema: [
//       {
//         AttributeName: "user_id",
//         KeyType: "HASH",
//       },
//       {
//         AttributeName: "timestamp",
//         KeyType: "RANGE",
//       },
//     ],
//     ProvisionedThroughput: {
//       ReadCapacityUnits: 1,
//       WriteCapacityUnits: 1,
//     },
//   })
//   .promise()
//   .then((data) => console.log("Table created"));

// dynamoDB.listTables().promise().then(console.log);

// documentClient.scan({ TableName: "td_notes_sdk" }).promise().then(console.log);

// documentClient
//   .put({
//     TableName: "td_notes_sdk",
//     Item: {
//       user_id: "B",
//       timestamp: 2,
//       category: "category 100",
//       title: "Title 200",
//     },
//   })
//   .promise()
//   .then(console.log);

// documentClient
//   .update({
//     TableName: "td_notes_sdk",
//     Key: { user_id: "A", timestamp: 1 },
//     UpdateExpression: "set category = :cat",
//     ExpressionAttributeValues: { ":cat": "category 1" },
//   })
//   .promise()
//   .then(console.log);

// documentClient
//   .delete({
//     TableName: "td_notes_sdk",
//     Key: { user_id: "B", timestamp: 2 },
//   })
//   .promise()
//   .then(console.log);

// const params = {
//   RequestItems: {
//     td_notes_sdk: [
//       {
//         DeleteRequest: {
//           Key: { user_id: "A", timestamp: 1 },
//         },
//       },
//       {
//         DeleteRequest: {
//           Key: { user_id: "B", timestamp: 2 },
//         },
//       },
//       {
//         PutRequest: {
//           Item: {
//             user_id: "AA",
//             timestamp: 11,
//             category: "category 1",
//             title: "Title 1",
//           },
//         },
//       },
//     ],
//   },
// };

// documentClient.batchWrite(params).promise().then(console.log);
// documentClient
//   .scan({
//     TableName: "td_notes",
//     FilterExpression: "user_id = :user_id",
//     ExpressionAttributeValues: { ":user_id": "huio9i-d9jof9iu_2" },
//   })
//   .promise()
//   .then((data) => console.log(data));

let page = 1;
callWithParams();
function callWithParams(params) {
  documentClient
    .scan({
      TableName: "td_notes",
      Limit: 3,
      ExclusiveStartKey: params,
    })
    .promise()
    .then((data) => {
      console.log("Page: ", page++);
      console.log(data);
      data.LastEvaluatedKey && callWithParams(data.LastEvaluatedKey);
    });
}
