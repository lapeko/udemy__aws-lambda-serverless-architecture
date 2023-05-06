import jwt from "jsonwebtoken";

const secretKey = "your-256-bit-secret";

export const handler = function (event, context, callback) {
  const token = event.authorizationToken;
  console.log({ token });
  if (!token) {
    console.error("Error: Invalid token");
    callback("Error: Invalid token");
  }
  let decoded;
  try {
    decoded = jwt.verify(token, secretKey);
    console.log({ decoded });
    if (decoded.role === "admin")
      callback(null, generatePolicy("Allow", event.methodArn, decoded));
    else callback(null, generatePolicy("Deny", event.methodArn, decoded));
  } catch (e) {
    console.error("Unauthorized");
    callback("Unauthorized");
  }
};

// Help function to generate an IAM policy
const generatePolicy = function (effect, resource, token) {
  const { sub, name } = token;
  const authResponse = {};

  authResponse.principalId = sub;
  if (effect && resource) {
    var policyDocument = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    var statementOne = {};
    statementOne.Action = "execute-api:Invoke";
    statementOne.Effect = effect;
    statementOne.Resource = resource;
    policyDocument.Statement[0] = statementOne;
    authResponse.policyDocument = policyDocument;
  }

  // Optional output with custom properties of the String, Number or Boolean type.
  authResponse.context = {
    sub,
    name,
    role,
  };
  return authResponse;
};
