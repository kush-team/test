import DS from 'ember-data';

export default DS.Model.extend({
  	voter: DS.belongsTo('voter', {async: true}),
  	town: DS.belongsTo('town', {async: true}),
  	createAt: DS.attr('date'),
  	updatedAt: DS.attr('date'),
    nacimiento: DS.attr('string'),
    dm: DS.attr('string'),
    reg: DS.attr('string'),
    lugarNacimiento: DS.attr('string'),
    profesion: DS.attr('string'),
    estadoCivil: DS.attr('string')
});
