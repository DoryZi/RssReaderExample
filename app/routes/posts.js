import Ember from 'ember';

export default Ember.Route.extend({
  model : function () {
    return Ember.$.ajax({
		 type: "GET"
		 ,url : "http://googleblog.blogspot.com/feeds/posts/default?alt=json-in-script&callback=?"
		 ,dataType : "jsonp"})
		.then(function (data) {
			var posts = data.feed.entry.map( function (entry) {
        // mapping the feed, just because it looks nicer and clearer that way.
        // for this example I won't use most the fields.
				return {
					id : entry.id.$t,
					title : entry.title.$t,
					body : entry.content.$t,
					excerpt : "",
					author : {name : entry.author[0].name.$t},
					date : entry.updated.$t,
				}
			});
			return { downloadedPosts : posts};
		});
  }

  ,actions : {
    savePost : function (postToSave) {
      var savedPosts = (localStorage["savedPosts"]) ? JSON.parse(localStorage["savedPosts"]) : [];
      //only save posts that aren't already saved...
      if (savedPosts.some (function findPost (savedPost) {
        // if the post title and body are identical, assume it's the same post
        return postToSave.title === savedPost.title && postToSave.body === savedPost.body;
      })) {
        this.notifications.addNotification({
          message: 'Post has already been saved',
          type: 'info',
          autoClear: true
        });
        return;
      }

      savedPosts.push(postToSave);
      localStorage["savedPosts"] = JSON.stringify(savedPosts);

      this.notifications.addNotification({
        message: 'Post saved',
        type: 'success',
        autoClear: true
      });
    }
  }
});
