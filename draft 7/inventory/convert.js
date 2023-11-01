const fs = require('fs')

// diff between readFile and readFileSync is readFileSync is synchronus LOL
csvStr = fs.readFileSync("inventory/1k-ingre.csv")
const array = csvStr.toString().split("\n");

let result = [];
let headers = array[0].split(",")

for (let i = 1; i < array.length - 1; i++) {
    let obj = {}
    let str = array[i]
    let s = ''
    let flag = 0
    for (let ch of str) {
        if (ch === '"' && flag === 0) {
            flag = 1
        }
        else if (ch === '"' && flag == 1) flag = 0
        if (ch === ';' && flag === 0) ch = '|'
        if (ch !== '"') s += ch
    }
    let properties = s.split("|")

    for (let j in headers) {
        if (properties[j].includes(";")) {
            obj[headers[j]] = properties[j]
                .split(";").map(item => item.trim())
        }
        else obj[headers[j]] = properties[j]
    }
    result.push(obj)
}

console.log(result)

let json = JSON.stringify(result);
fs.writeFileSync('inventory/ingredients.json', json);