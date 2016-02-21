import Ember from 'ember';
import SaveModelMixin from '../../mixins/roles/save-model-mixin';

export default Ember.Route.extend(SaveModelMixin, {
  actions: {
    save: function() {
      var route = this;
      this.currentModel.save().then(function() {
        route.transitionTo('index');
      }, function() {
        console.log('Failed to save the model');
      });
    }
  },
});
