import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	model: function () {
		return Ember.RSVP.hash({
          newbies: this.get('store').find('newest', {per_page: 20})
     	});
	},

	setupController: function (controller, model) {
		this._super(controller, model);
		controller.set('meta', model.newbies.get('meta'));
	}
});
