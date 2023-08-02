function evaluateExpression(tree) {
    const valueStack = [];
    const operatorStack = [];
    const performOperation = (left, operator, right) => {
        switch (operator) {
            case "+":
                return left + right;
            case "-":
                return left - right; // Corrected this line
            case "*":
                return left * right;
            case "/":
                return left / right;
            case "^":
                return Math.pow(left, right);
            default:
                throw new Error("Invalid operator");
        }
    };
    const evaluateTree = (root) => {
        let currentNode = root;
        if (currentNode) {
            if (currentNode.action) {
                const leftNode = currentNode.left;
                const rightNode = currentNode.right;
                if (leftNode.value && rightNode.value) {
                    valueStack.push(performOperation(leftNode.value, currentNode.action, rightNode.value));
                }
                else if (leftNode.value) {
                    valueStack.push(leftNode.value);
                    operatorStack.push(currentNode.action);
                    evaluateTree(rightNode);
                }
                else if (rightNode.value) {
                    operatorStack.push(currentNode.action);
                    evaluateTree(leftNode);
                    valueStack.push(rightNode.value);
                }
                else {
                    operatorStack.push(currentNode.action);
                    evaluateTree(leftNode);
                    evaluateTree(rightNode);
                }
            }
        }
    };
    evaluateTree(tree);
    // console.log(tree);
    // Perform any remaining operations in the operator stack
    while (operatorStack.length > 0) {
        const operator = operatorStack.pop();
        const rightValue = valueStack.pop();
        const leftValue = valueStack.pop();
        valueStack.push(performOperation(leftValue, operator, rightValue));
    }
    return valueStack.pop() || 0;
}
// Main function to read the file and execute the evaluation
function main() {
    const fs = require("fs");
    const filename = "sample_data.json";
    fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
            console.error("Error reading file:", err.message);
            return;
        }
        try {
            const tree = JSON.parse(data);
            const result = evaluateExpression(tree);
            console.log(result);
        }
        catch (error) {
            console.error("Error parsing JSON:", error.message);
        }
    });
}
main();
