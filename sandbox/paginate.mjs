import AWS from 'aws-sdk';
AWS.config.update({ region: 'eu-central-1' });

const tableName = "td_notes";
const documentClient = new AWS.DynamoDB.DocumentClient();


runPagination();

async function runPagination() {
  let page = 0;

  paginate();

  async function paginate(lastEvaluatedKey) {
    page++;
    const params = {
      TableName: tableName,
      Limit: 2
    }
    if (lastEvaluatedKey) params.ExclusiveStartKey = lastEvaluatedKey;
    const result = await documentClient.scan(params).promise();
    console.log({ page });
    console.log(result);

    if (!result.LastEvaluatedKey) return result;

    console.log('===================================================')
    paginate(result.LastEvaluatedKey);
  }
}