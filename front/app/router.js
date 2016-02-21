import Ember from "ember";
import config from "./config/environment";

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route("login");


  this.resource('admin', function () {
    this.route("users", function() {
      this.route("new");

      this.route("edit", {
        path: ":user_id/edit"
      });

      this.route("show", {
        path: ":user_id"
      });
    });
    this.route("roles", function() {
      this.route("new");
      this.route("edit", {
        path: ":role_id/edit"
      });
    });         
  });

  this.route("towns", function() {
      this.route("show", {
        path: ":town_id/show"
      });
  });

  this.route('newests', function() {
    this.route('show', {
        path: ":newest_id/show"
    });
    this.route('edit', {
        path: ":newest_id/edit"
    });
  });
});

export default Router;