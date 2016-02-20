/**
* Voter.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  autoCreatedAt: false,
  autoUpdatedAt: false,
  migrate: 'safe',
  
  attributes: {
	matricula: 'string',
	clase: 'string',
	apellido: 'string',
	nombre: 'string',
	domicilio: 'string',
	tipo: 'string',
	seccion: 'string',
	orden: 'string',
	mesa: 'string',
	sexo: 'string',
	circuito: 'string',
	nada: 'string',
	provincia: 'string',
  }
};

