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

beforeAll(async () => {
  await dbClient
  .put({
    TableName: "actions",
    Item: {
      pk: "1",
      role: "basicuser",
      handler: "NEWEST"
    },
  })
  .promise();
  await dbClient
    .put({
      TableName: "users",
      Item: {
        pk: "123",
        role: "sysadmin",
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: "actions",
      Item: {
        pk: "2",
        parentActionId: "1",
        data: { timestamp: new Date(2020, 1, 1), color: "red", type: "painting" },
      },
    })
    .promise();

  await dbClient
    .put({
      TableName: "actions",
      Item: {
        pk: "3",
        parentActionId: "1",
        data: { timestamp: new Date(2010, 1, 1), color: "blue", image: "none" },
      },
    })
    .promise();
});

test("Some items to count", async () => {
  await dbClient
 

  const { body } = handler({
    Headers: { userid: "123" },
    body: JSON.stringify({ actionid: "1" }),
  });

  expect(body).toStrictEqual({
    timestamp: new Date(2010, 1, 1),
    color: "blue",
    image: "none",
  });
});
