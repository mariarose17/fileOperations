const axios = require('axios');
const yargs = require('yargs');
const fs = require('fs');
const file = 'namesFile2.json';
var options = yargs.argv.options;

// var obj = {
//     names: []
// };





const readData = () => {
    if (!fs.existsSync(file)) {
        throw new Error("File not found...!");
    }

    else {
        return JSON.parse(fs.readFileSync(file).toString());
    }

}

const writeData = (data, callback) => {
    fs.writeFile(file, JSON.stringify(data), (err) => {
        if (err)
            callback(err);
        callback(null);

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

    // var index = 1;
    // fs.readFile('namesfile.json', (err, data) => {
    //     if (err) throw err;

    //     var nameobj = JSON.parse(data);
    //     nameobj.names.forEach(item => {
    //         console.log(index + ": " + item);
    //         index++;

    //     });


    // });
}



if (options == 'write') {



    const filedata = readData();
    filedata.push(yargs.argv._[0]);

    writeData(filedata, (err) => {
        if (err) throw new Error('Something wrong with write');
        console.log('Name written to file..' + yargs.argv._[0]);
    });
    

    // fs.readFile('namesfile.json', (err, data) => {
    //     if (err) throw err;

    //     var nameobj = JSON.parse(data);

    //     nameobj.names.push(yargs.argv._[0]);


    //     var json = JSON.stringify(nameobj);

    //     fs.writeFile('namesfile.json', json, (err) => {
    //         if (err) throw err;
    //         console.log('Name written to file');
    //     });

    // });





}

if (options == 'remove') {

    let flag = 0;
    const names = readData();


    for (let index = 0; index < names.length; index++) {
        if (names[index] == yargs.argv._[0]) {
            flag = 1;
            names.splice(index, 1);
            console.log("item removed");
            writeData(names, (err) => {
                if (err) throw new Error('Something wrong ....');


            });


        }


    }




    if (flag == 0) {
        console.log("Element not found..");
    }


    // let arrindex = 0;


    // fs.readFile('namesfile.json', (err, data) => {
    //     if (err) throw err;


    //     var nameobj = JSON.parse(data);

    //     nameobj.names.forEach(item => {


    //         if (item == yargs.argv._[0]) {
    //             flag = 1;
    //             nameobj.names.splice(arrindex, 1);
    //             console.log("item removed");


    //             var json = JSON.stringify(nameobj);

    //             fs.writeFile('namesfile.json', json, (err) => {
    //                 if (err) throw err;

    //             });
    //         }
    //         arrindex++;
    //     })

    //     if (flag == 0) {
    //         console.log("Element not found..");
    //     }

    // });
}


