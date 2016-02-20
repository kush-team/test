import DS from 'ember-data';

export default DS.Model.extend({
  	voter: DS.belongsTo('voter', {async: true}),
  	town: DS.belongsTo('town', {async: true}),
  	create_at: DS.attr('date'),
  	updated_at: DS.attr('date')
});
