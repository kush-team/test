import DS from 'ember-data';
import Attachable from '../mixins/attachable';

export default DS.Model.extend(Attachable, {
  	name: DS.attr('string'),
  	lastName: DS.attr('string'),
    password: DS.attr('string'),
  	createdAt: DS.attr('string'),
  	updatedAt: DS.attr('string'),
  	email: DS.attr('string'),
    roles: DS.hasMany('role', {async: true}),
  	towns: DS.hasMany('town', {async: true}),

  	fullName: function () {
  		return this.get('name') + " " + this.get('lastName');
  	}.property('name', 'lastName'),

    isAdmin: function () {
      return this.get('roles').findBy('name', 'admin') !== undefined;
    }.property('roles.@each.name'),  

    isEditor: function () {
      return this.get('roles').findBy('name', 'editor') !== undefined;
    }.property('roles.@each.name'),  
});
