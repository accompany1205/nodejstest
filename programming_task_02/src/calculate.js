import { Action } from "./models/action";

async function calculate(actionId) {

  const action = await Action.getById(actionId);

  const value = getValue(action);

  return value;
}
function getValue ( action ) {
  const childActions = action.getChildActions();
  if (action.handler === "COUNTER"){
    return childActions.length;
  }else{
    let value = 1;
    for(let i = 0; i < childActions.length; i++){
      value *= getValue( childActions[i] );
    }
  }
}

module.exports = calculate;
