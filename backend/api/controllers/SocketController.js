var forEach       = require('lodash/collection/forEach');

module.exports = {
  subscribe: function (req, res, next) {
    var ids, data = req.allParams(), model, subscribed = {};
    var result = {};
    User.findOne(data['user']).populate('friends').populate('groups').populate('events').exec(function (err, instance) {
      var walls = [];
      _.each(instance.events, function (event) {
        walls.push(event.wall);
      });             
      _.each(instance.friends, function (friend) {
        walls.push(friend.wall);
      });       
      _.each(instance.groups, function (group) {
        walls.push(group.wall);
      });

      if (err) {
        result = {error: 'No se pudo subscribir a ' + model};
        res.json(result);
      }
      
      ids = walls
      forEach( ids, function ( id ) {
        Wall.subscribe(req, id);
      } );        
      
      User.subscribe(req, instance.id);
      //model.watch(req);
      result = {success: true};
      res.json(result);
    });
  },

  subscribePoliticalData: function (req, res, next) {
    var ids, data = req.allParams(), model, subscribed = {};
    var result = {}; 

    ElectoralElection.find().exec(function (err, records) {
      if (err) {
        result = {error: 'No se pudo subscribir a ' + model};
        res.json(result);
      }
      forEach( records, function ( record ) {
        ElectoralElection.subscribe(req, record.id);
      } );      
    });

    ElectoralList.find().exec(function (err, records) {
      if (err) {
        result = {error: 'No se pudo subscribir a ' + model};
        res.json(result);
      }
      forEach( records, function ( record ) {

        ElectoralList.subscribe(req, record.id);
      } );      
    });  

    Candidate.find().exec(function (err, records) {
      if (err) {
        result = {error: 'No se pudo subscribir a ' + model};
        res.json(result);
      }
      forEach( records, function ( record ) {
        Candidate.subscribe(req, record.id);
      } );      
    }); 

    ElectoralLine.find().exec(function (err, records) {
      if (err) {
        result = {error: 'No se pudo subscribir a ' + model};
        res.json(result);
      }
      forEach( records, function ( record ) {
        ElectoralLine.subscribe(req, record.id);
      } );      
    }); 

    AvalStatus.watch(req);
    Aval.watch(req);
    ElectoralLine.watch(req);
    Candidate.watch(req);
    ElectoralList.watch(req);
    Activity.watch(req);

    result = {success: true};
    res.json(result);    
  }
};