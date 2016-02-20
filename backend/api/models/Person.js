/**
* Person.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {
  	name: {
      type: 'string',
    },

  	lastName: {  
      type: 'string',
    },

    fullName: {
      type: 'string',
    },
        
    avatar: {
      model: 'asset',
    },    
  }
};

