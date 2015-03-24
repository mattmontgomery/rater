var _ = require('lodash');
var Promise = require('bluebird');
var DataStore = require('./store');
Promise.promisifyAll(require('redis'));
var redisClient = require('redis').createClient();

var DataService = function(){
    this.stores = {};
};

_.assign(DataService.prototype, {
    getStoreForType: function(type) {
        if(!this.stores[type]) {
            this.stores[type] = new DataStore(type);
        }
        return this.stores[type];
    },
    getSingle: function(type, id) {
        var store = this.getStoreForType(type);
        var key = this.formatKey(type,id);
        return new Promise(function(resolve, reject) {
            var item = store.get(id);
            if(!item) {
                this.loadFromRedis(key).done(function(data) {
                    store.set(id, data);
                    resolve(data);
                }.bind(this));
            } else {
                resolve(item);
            }
        }.bind(this));
        return promise;
    },
    create: function(type, id, data) {
        var store = this.getStoreForType(type);
        return new Promise(function(resolve, reject) {
            store.set(id, data);
            this.updateRedis(this.formatKey(type,id), data).done(function(result) {
                resolve(result);
            });
        }.bind(this));
    },
    loadFromRedis: function(key) {
        return redisClient.getAsync(key);
    },
    updateRedis: function(key, data) {
        return redisClient.setAsync(key, JSON.stringify(data));
    },
    formatKey: function(type,id) {
        return 'data.' + type + (id ? ':' + id : '');
    }
});

module.exports = DataService;
