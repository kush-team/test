import DS from 'ember-data';

export default DS.Model.extend({
	title: DS.attr('string'),
	description: DS.attr('string'),
	asset: DS.belongsTo('asset', {async: true}),
	town: DS.belongsTo('town', {async: true}),
});
