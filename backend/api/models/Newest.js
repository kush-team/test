/**
* Newbie.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  migrate: 'safe',
  
  attributes: {
    voter: 'string',
    town: 'string',
    nacimiento: 'string',
    dm: 'string',
    reg: 'string',
    lugarNacimiento: 'string',
    profesion: 'string',
    estadoCivil: 'string'
  }
};