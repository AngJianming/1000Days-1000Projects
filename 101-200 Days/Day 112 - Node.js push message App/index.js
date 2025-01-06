const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE = './data.json';

// date delay (e.g: Friday you want to shedule the message on Saturday is -1, but if you want to revert is just +1 therefore making it Thursday)
const DATE = moment().subtract(1,'d').format();

const data = {
    date : DATE
}

jsonfile.writeFile(FILE, data);

simpleGit().add([FILE]).commit(DATE, {'--date' : DATE}).push();