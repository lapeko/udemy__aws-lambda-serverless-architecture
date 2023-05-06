import AWS from "aws-sdk";
const lambda = new AWS.Lambda();

export const handler = async (event) => {
  const { num } = event;
  const params = {
    FunctionName: "calulator",
    InvocationType: "RequestResponse",
    LogType: "None",
    Payload: JSON.stringify({
      operation: "multiply",
      input: { num1: num, num2: num },
    }),
  };
  const { Payload } = await lambda.invoke(params).promise();
  return JSON.parse(Payload).body;
};
