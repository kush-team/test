import DS from 'ember-data';

export default DS.Model.extend({
	nombre: DS.attr('string'),
	apellido: DS.attr('string'),
	matricula: DS.attr('string'),
	domicilio: DS.attr('string'),
	sexo: DS.attr('string'),
	clase: DS.attr('string'),
	mesa: DS.attr('string'),
	escuela: DS.attr('string'),
	direccion_escuela: DS.attr('string'),
	afiliado: DS.attr('string'),
});
