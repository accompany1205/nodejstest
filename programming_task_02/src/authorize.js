
import { Action } from "./models/action";
import { User } from "./models/user";
async function authorize(userId, actionId) {

  const action = await Action.getById(actionId);

  const user = await User.getById(userId);

  // Perform the authorization check
  return action.role === user.role;
}

module.exports = authorize;
