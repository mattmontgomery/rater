var _ = require('lodash');

var DataStore = function(type){
    this.type = type;
    this.data = [];
};

_.assign(DataStore.prototype, {
    get: function(id) {
        return (this.data[id] ? this.data[id] : false);
    },
    set: function(id, data) {
        this.data[id] = data;
    }
});

module.exports = DataStore;
