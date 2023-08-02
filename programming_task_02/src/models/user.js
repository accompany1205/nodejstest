const { dbClient, TableNames } = require("../common/db");
const Role = require("./role");

class User {
  id;
  role;

  constructor(input) {
    this.id = input.id;
    this.role = Role.from(input.role);
  }

  static async getById(id) {
    const res = (await dbClient.get({ TableName: TableNames.users, Key: { pk: id } }).promise())
      .Item;

    if (!res.Item) {
      throw new Error("User does not exist");
    }

    return new User(res.Item);
  }
}

module.exports = User;
