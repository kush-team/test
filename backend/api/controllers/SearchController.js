/**
 * SearchController
 *
 * @description :: Server-side logic for managing searches
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */
var util = require( 'util' ),
  actionUtil = require( '../blueprints/_util/actionUtil' );

/**
 * Enable sideloading. Edit config/blueprints.js and add:
 *   ember: {
 *     sideload: true
 *   }
 * Defaults to false.
 *
 * @type {Boolean}
 */
var performSideload = (sails.config.blueprints.ember && sails.config.blueprints.ember.sideload);

module.exports = {
	


  /**
   * `SearchController.find()`
   */
  find: function (req, res) {
	var where;
	var results = [];

	if (req.query['query'] && req.query['query'] != '') {
		where = {
			or :[ 
	        	{ like: { name: '%'+req.query['query']+'%' } }, { like: { lastName : '%'+req.query['query']+'%' }}, { like: {fullName: '%' + req.query['query'] + '%'}}
	       ] 
	   }
	} 
	// Lookup for records that match the specified criteria
	var query = Person.find()
		.where( where )
		.limit(5);

	query.exec( function found( err, persons ) {
		if ( err ) return res.serverError( err );
		if (req.query['query'] && req.query['query'] != '') {
			where = {
				or :[ 
		        	{ like: { name: '%'+req.query['query']+'%' } }
		       ] 
		   }
		} 

		_.each(persons, function (person) {
			var personName = '';
			if (person.name && person.lastName) {
				personName = person.name + " " + person.lastName;
			} else {
				personName = person.fullName;
			}
			
			results.push({id: person.id, type: 'municipabilities/partials/result/person', name: personName});
		});

		query = Province.find()
			.where( where )
			.limit(5);

		query.exec( function found( err, provinces ) {
			if ( err ) return res.serverError( err );
			_.each(provinces, function (province) {
				results.push({id: province.id, type: 'municipabilities/partials/result/province', name: province.name});
			});			
			query = Town.find()
				.where( where )
				.limit(5);

			query.exec( function found( err, towns ) {
				if ( err ) return res.serverError( err );
				_.each(towns, function (town) {
					results.push({id: town.id, type: 'municipabilities/partials/result/town', name: town.name});
				});			

				res.ok(results);
			});
		});
	});
  }
};

