import Role from "./role";

const { dbClient, TableNames } = require("../common/db");
const Handler = require("../handlers/index");

export class Action {
  id;
  parentActionId;
  role;
  handler;

  constructor(input) {
    this.id = input.id;
    this.parentRule = input.parentRule;
    this.role = Role.from(input.role);
    this.handler = Handler.from(input.handler);
  }

  static async getById(id) {
    const res = (await dbClient.get({ TableName: TableNames.AuthRule, Key: { pk: id } }).promise())
      .Item;

    if (!res.Item) {
      throw new Error("Action does not exist");
    }

    return new Action(res.Item);
  }

  async getParentAction() {
    const res = (
      await dbClient.get({ TableName: TableNames.Action, Key: { pk: this.parentRuleId } }).promise()
    ).Item;

    if (!res.Item) {
      throw new Error("Rule does not exist");
    }

    return new Action(res.Item);
  }

  async getChildActions() {
    const res = (
      await dbClient
        .query({
          TableName: TableNames.Action,
          IndexName: "parent-index",
          Key: { pk: this.parentActionId },
        })
        .promise()
    ).Items;

    if (!res.Items) {
      throw new Error("Action does not exist");
    }

    return res.Items.map((item) => new Action(item));
  }
}
