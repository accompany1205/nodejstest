# Execution tree

File `sample_data.json` contains sample JSON object describing order of performing basic mathematical operations. Every operation node has either a value or an expression to evaluate.

**Your task** is to write a script that will read file provided in CLI arguments (e.g. `ts-node index.ts filename.json`). The script should read the evaluation tree described in file and return a final result to the user.

If a node contains `value` property it means there are no child nodes to evaluate and `value` is to be treated as a result. If node contains `action` property then `left` and `right` child nodes have to be evaluated before.

Your code should NOT use recursion.

Allowed actions are:
- `+` - the result is sum of right and left child nodes
- `-` - the result is difference of right and left child nodes (value of left minus value of left)
- `*` - left and right nodes multiplied
- `/` - left node divided by right node
- `^` - left node to the power of right node

<table>
  <tr>
    <td> <span style="color:blue">file.json</span> content</td>
    <td>expected output</td>
  </tr>
  <tr>
    <td>

```json
{ "value": 1 }
```

  </td>
    <td>1</td>

  </tr>
  <tr>
    <td>

```json
{ "action": "-", "left": { "value": 3 }, "right": { "value": 1 } }
```
  </td>
  <td>2</td>

  <tr>
    <td>

```json
{
  "action": "^",
  "left": { "action": "+", "left": { "value": 3 }, "right": { "value": 1 } },
  "right": { "action": "/", "left": { "value": 2 }, "right": { "value": 2 } }
}
```

  </td>
  <td>4</td>
  </tr>

  </tr>
</table>
