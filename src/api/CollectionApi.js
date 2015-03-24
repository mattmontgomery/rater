var _ = require('lodash');

var CollectionApi = function(router, service) {
    this.service = service;
    this.router = router;
    router.route('/collection/:id').get(this.getAction.bind(this));
    router.route('/collection/:id').post(this.postAction.bind(this));
};
_.assign(CollectionApi.prototype, {
    getAction: function(req, res) {
        var id = req.params.id;
        this.service.getSingle('collection', id).done(
            function(result) {
                if(!result) {
                    res.status(404);
                    res.send({error: "Collection with id: "+id+" not found"});
                } else {
                    res.status(200);
                    res.send({data: result});
                }
            }
        );
    },
    postAction: function(req, res) {
        var id = req.params.id;
        this.service.create('collection', id, req.body).done(function(status) {
            res.send({status: status});
        });
    }
});
module.exports = CollectionApi;
