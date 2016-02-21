import Ember from 'ember';

export default Ember.Component.extend({
  dni: '',
  voter: null,
  newest: null,

  actions: {

  	clear: function () {
  		this.set('searching', false);
  		this.set('searched', false);
  		this.set('voter', null);
  		this.set('dni', '');
      this.set('newest', null);
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

  	create: function () {
      var _this = this;
  		var n = this.get('store').createRecord('newest', {
  			voter: this.get('voter'),
  			town: this.get('voter').get('town')
  		});
      this.set('newest', n);
  	},

    save: function () {
      var _this = this;
      if (this.get('newest')) {
        this.get('newest').save().then(function () {
          _this.set('searching', false);
          _this.set('searched', false);
          _this.set('voter', null);
          _this.set('dni', '');
          _this.set('newest', null);        
        });
      }
    },

    cancel: function () {
      if (this.get('newest')) {
        this.get('newest').rollback();
      }
      this.set('searching', false);
      this.set('searched', false);
      this.set('voter', null);
      this.set('dni', '');
      this.set('newest', null);     
    }

  }	
});
