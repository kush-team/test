import Ember from 'ember';

export default Ember.Route.extend({

	model: function (args) {
		return Ember.RSVP.hash({
          newbies: this.get('store').find('newest', {town: args.town_id.toString()}),
          town: this.get('store').find('town', args.town_id)
     	});		
	},

	setupController: function (controller, model) {
		this._super(controller, model);
	},
});
