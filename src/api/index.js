var express = require('express');
var router = express.Router();
var CollectionApi = require('./CollectionApi');
var DataService = require('../data/service');

var api = {
    collection: new CollectionApi(router, new DataService())
};

module.exports = router;
