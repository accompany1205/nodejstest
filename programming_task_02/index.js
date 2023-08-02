const authorize = require("./src/authorize.js");
const calculate = require("./src/calculate.js");

exports.handler = async function (event) {
  try {
    // Parse the request body
    const requestBody = JSON.parse(event.body);

    // Extract the userId from the Headers
    const userId = event.Headers.userid;

    // Check if the user is authorized to perform the action
    const isAuthorized = await authorize(userId, requestBody.actionid);

    if (!isAuthorized) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: "Disallowed" }),
      };
    }

    // If the user is authorized, perform the calculation
    const result = calculate(requestBody.actionid);

    return {
      statusCode: 200,
      body: JSON.stringify({ result }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal Server Error" }),
    };
  }
};
