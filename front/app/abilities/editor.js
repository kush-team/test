import { Ability } from 'ember-can';

export default Ability.extend({
  canEdit: function() {
    if (!this.get('session.user_id')){
      return false;    
    } else {
      return this.get('session.user.isEditor');
    }
    
  }.property('session.user.isEditor'),
}); 