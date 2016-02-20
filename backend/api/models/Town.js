/**
* Municipio.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
	
  attributes: {
    name: {
      type: 'string',
    },

    seccion: 'string',

    electoralSection: {
      type: 'string',
    },  

    resources: {
    	collection: 'resource',
    	via: 'town'
    }
  }
};

