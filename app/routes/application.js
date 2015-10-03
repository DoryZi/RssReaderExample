import Ember from 'ember';



export default Ember.Route.extend({
  model : function () {
    this.notifications.setDefaultClearNotification(1000);
    return null;
  }
});
