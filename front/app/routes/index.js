import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend({
	model: function () {
		return Ember.RSVP.hash({
          towns: this.get('store').find('town', {electoralSection: '5'}),
          newbies: this.get('store').find('newest')
     	});
	},
});
