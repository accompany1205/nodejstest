const { handler } = require("../index");
const { DynamoDB } = require("aws-sdk");

const dbClient = new DynamoDB.DocumentClient({
  apiVersion: "2012-08-10",
  region: "eu-west-1",
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local",
  }),
});

test("Disallowed", async () => {
  await dbClient
    .put({
      TableName: "users",
      Item: {
        pk: "123",
        role: "basicuser",
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: "actions",
      Item: {
        pk: "1",
        handler: "COUNTER",
        ROLE: "sysadmin",
      },
    })
    .promise();

  const { statusCode } = handler({
    Headers: { userid: "123" },
    body: JSON.stringify({ actionid: "1" }),
  });

  expect(statusCode).toBe(403);
});

test("Allowed", async () => {
  await dbClient
    .put({
      TableName: "users",
      Item: {
        pk: "123",
        role: "enterpriseuser",
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: "actions",
      Item: {
        pk: "1",
        handler: "COUNTER",
        ROLE: "basicuser",
      },
    })
    .promise();

  const { statusCode } = handler({
    Headers: { userid: "123" },
    body: JSON.stringify({ actionid: "1" }),
  });

  expect(statusCode).toBe(200);
});
