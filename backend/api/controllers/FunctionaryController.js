/**
 * Module dependencies
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

/**
 * GovernorController
 *
 * @description :: Server-side logic for managing governors
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	find: function findRecords( req, res ) {
	  // Look up the model
	  var Model = actionUtil.parseModel( req );
	  console.log(new Date() + ' FINDING ' + req.url);

	  /* ENABLE if needed ( see https://github.com/mphasize/sails-ember-blueprints/issues/3 )
	   * ----------------
	   * If an `id` param was specified, use the findOne blueprint action
	   * to grab the particular instance with its primary key === the value
	   * of the `id` param.   (mainly here for compatibility for 0.9, where
	   * there was no separate `findOne` action)
	   */
	  // if ( actionUtil.parsePk( req ) ) {
	  //  return require( './findone' )( req, res );
	  // }
	  
	  // Lookup for records that match the specified criteria
	  var where = actionUtil.parseCriteria( req );
	  where.endDate = {'>=': new Date()};

	  var query = Model.find()
	    .where( where )
	    .limit( actionUtil.parseLimit( req ) )
	    .skip( actionUtil.parseSkip( req ) )
	    .sort( actionUtil.parseSort( req ) );

	  query = actionUtil.populateEach( query, req );
	  query.exec( function found( err, matchingRecords ) {
	    if ( err ) return res.serverError( err );
	    console.log(new Date()  + ' FOUND RECORDS');

	    // Only `.watch()` for new instances of the model if
	    // `autoWatch` is enabled.
	    if ( req._sails.hooks.pubsub && req.isSocket ) {
	      Model.subscribe( req, matchingRecords );
	      if ( req.options.autoWatch ) {
	        Model.watch( req );
	      }
	      // Also subscribe to instances of all associated models
	      _.each( matchingRecords, function ( record ) {
	        actionUtil.subscribeDeep( req, record );
	      } );
	    }

	    //res.ok( actionUtil.emberizeJSON( Model, matchingRecords, req.options.associations, performSideload ) );
	    Model.find().where( where ).exec( function count( err, numberOfRecords ) {
	      // This is not super important, so on error just ignore.
	      if ( err ) {
	        return res.ok( actionUtil.emberizeJSON( Model, matchingRecords, req.options.associations, performSideload ) );
	      }

	      var records = numberOfRecords.length;
	      var emberize = actionUtil.emberizeJSON( Model, matchingRecords, req.options.associations, performSideload );
	      res.ok( actionUtil.insertMeta( emberize, { total: records, pages: Math.ceil(records / actionUtil.parseLimit( req )) } ) );
	      console.log(new Date() + 'Response ' + req.url);
	    } );    
	  } );
	},
	
};

