import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  resources: DS.attr(''),
  seccion: DS.attr('string'),
  resources: DS.hasMany('resource', {async: true, inverse: 'town'}),

  label: function () {
    return this.get('name');
  }.property('name'),  
});
