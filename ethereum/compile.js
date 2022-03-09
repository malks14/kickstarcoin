const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

//chquea si el directory existe, si no existe, lo crea
fs.ensureDirSync(buildPath);

for (let contract in output) {
    //crea el archivo json
    fs.outputJSONSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    );
}