const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');

const FILE = './data.json';

const DATE = moment().subtract(1,'d').format();

const data = {
    date : DATE
}

jsonfile.writeFile(FILE, data);

simpleGit().add([FILE]).commit(DATE, {'--date' : DATE}).push();