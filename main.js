const fs = require('fs');
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

const data = fs.readFileSync(__dirname+'/dns', {encoding: "utf-8"});
const options = data.match(/^\#.*?$/gm).map(item => item.replace('#', '').trim());

options.forEach((item, index) => {
    console.log(index, ':', item);
});

console.log();

readline.question('Chose one dsn: ', option => {
    const start = data.indexOf(options[option]) -2;
    const end = options[+option + 1] ? data.indexOf(options[+option + 1]) - 2 : undefined;
    const dns=data.substring(start,end).trim();

    fs.writeFileSync('/etc/resolv.conf', dns);

    console.log();

    console.log('Dns changed successfully!');

    process.exit();
});