import Ember from 'ember';

export default Ember.Route.extend({
    model : function () {
      return JSON.parse(localStorage["savedPosts"]);
    }

    ,actions : {
      deletePost : function (postToRemove) {
        var model = this.currentModel;
        model.removeObject(postToRemove);
        localStorage["savedPosts"] = JSON.stringify(model);

        this.notifications.addNotification({
          message: 'Post removed',
          type: 'success',
          autoClear: true
        });
      }
    }
});
