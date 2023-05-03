import AWS from "aws-sdk";
const functionName = process.env.AWS_LAMBDA_FUNCTION_NAME;
const encryptedAppName = process.env["APP_NAME"];
const encryptedAppSecret = process.env["APP_SECRET"];

let decryptedAppName, decryptedAppSecret;

export const handler = async (event, context) => {
  let kms;
  if (!decryptedAppName || !decryptedAppSecret) {
    kms = new AWS.KMS();
  }
  if (!decryptedAppName) {
    try {
      const req = {
        CiphertextBlob: Buffer.from(encryptedAppName, "base64"),
        EncryptionContext: { LambdaFunctionName: functionName },
      };
      const data = await kms.decrypt(req).promise();
      decryptedAppName = data.Plaintext.toString("ascii");
    } catch (err) {
      console.log("Decrypt error:", err);
      throw err;
    }
  }
  if (!decryptedAppSecret) {
    try {
      const req = {
        CiphertextBlob: Buffer.from(encryptedAppSecret, "base64"),
        EncryptionContext: { LambdaFunctionName: functionName },
      };
      const data = await kms.decrypt(req).promise();
      decryptedAppSecret = data.Plaintext.toString("ascii");
    } catch (err) {
      console.log("Decrypt error:", err);
      throw err;
    }
  }
  const log = event;
  log.lambdaFunction = context.functionName;
  log.lambdaVersion = context.functionVersion;

  log.appName = decryptedAppName;
  log.appSecret = decryptedAppSecret;

  // comment
  return log;
};
