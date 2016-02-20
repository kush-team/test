import Ember from 'ember';

export default Ember.Route.extend({

	model: function (args) {
		return this.get('store').find('town', args.town_id);
	},

	setupController: function (controller, model) {
		this._super(controller, model);
		model.reload();
	},

	actions: {
		addResource: function (model) {
			this.get('controller').set('newResource', this.get('store').createRecord('resource', {
				title: '',
				description: ''
			}));
		},

		removeResource: function (resource) {
			resource.destroyRecord();
		},

		saveResource: function (newResource, model) {
			var _this = this;

			newResource.set('town', model);

			newResource.save().then(function () {
				_this.get('controller').set('newResource', null);
			})
		}
	}
});
