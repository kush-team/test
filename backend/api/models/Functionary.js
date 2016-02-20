/**
* Governor.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
    town: {
      model: 'town',
    },
    
  	person: {
  		model: 'person',
  	},

  	politicalParty: {
  		model: 'politicalParty',
  	},

  	startDate: {
  		type: 'datetime',
  	},

  	endDate: {
  		type: 'datetime',
  	},

    charge: {
      model: 'charge'
    }
  }
};

