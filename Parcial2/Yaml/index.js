const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');   

let objetoYaml= fs.readFileSync(path.join(__dirname, 'objeto.yaml'),'utf8');
let objetoJson = yaml.load(objetoYaml);
console.log(objetoYaml);
console.log(typeof objetoYaml);

console.log(objetoJson);
console.log(typeof objetoJson);