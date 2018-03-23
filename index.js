const axios = require('axios');
const yargs = require('yargs');
const fs = require('fs');
const file = 'namesFile2.json';
var options = yargs.argv.options;
var name = yargs.argv._[0];


const readData = () => {
    if (!fs.existsSync(file)) {
        throw new Error("File not found...!");
    }

    else {
        return JSON.parse(fs.readFileSync(file).toString());
    }

}

const writeData = (data, cbFun) => {
    fs.writeFileSync(file, JSON.stringify(data), (err) => {
        if (err) {
            cbFun(err);
        }

        cbFun(null);

    })

}

const printData = (data) => {
    for (let index = 0; index < data.length; index++) {
        console.log(index + 1 + '.' + data[index]);
    }
};


if (options == 'read') {

    const data = readData();
    printData(data);


}



if (options == 'write') {


    if (!name) {
        throw new Error(`Name not found....`);
    }

    const filedata = readData();
    filedata.push(name);

    writeData(filedata, (err) => {
        if (err) {
            throw new Error('Something wrong with write....');
        }

        console.log(`$(name) written to file... `);
    });



}

if (options == 'remove') {
    if (!name) {
        throw new Error('Name not found..');
    }

    let flag = 0;
    const names = readData();


    for (let index = 0; index < names.length; index++) {
        if (names[index] == name) {
            flag = 1;
            names.splice(index, 1);
            console.log("Name removed.....");


            writeData(names, (err) => {
                if (err) throw new Error('Something went wrong ....');


            });
            const datanames = readData();
            printData(datanames);

        }


    }

    if (flag == 0) {
        console.log("Name not found..");
    }

}


