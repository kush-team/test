import Ember from 'ember';

export default Ember.Component.extend({
  dni: '',
  voter: null,

  actions: {

  	clear: function () {
  		this.set('searching', false);
  		this.set('searched', false);
  		this.set('voter', null);
  		this.set('dni', '');
  	},

  	search: function () {
  		var _this = this;
  		this.set('searching', true);
  		this.set('searched', false);
  		this.get('store').find('voter', this.get('dni')).then(function (voter) {
  			if (voter) {
  				_this.set('voter', voter);
  			}
  			_this.set('searched', true);
  			_this.set('searching', false);
  		}, function (error) {
  			_this.set('searched', true);
  			_this.set('searching', false);
  		});
  	},
  }	
});
