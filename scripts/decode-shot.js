const fs = require("fs");
const input = process.argv[2];
const output = process.argv[3];
const json = JSON.parse(fs.readFileSync(input, "utf8"));
const data = json.data || (json.result && json.result.data);
if (!data) {
  console.log(Object.keys(json));
  process.exit(1);
}
fs.writeFileSync(output, Buffer.from(data, "base64"));
console.log("wrote", output, data.length);
