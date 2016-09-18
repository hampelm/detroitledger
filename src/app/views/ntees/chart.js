var $ = require('jquery'),
    _ = require('lodash'),
    Backbone = require('backbone'),
    Chartist = require('chartist'),
    Organizations = require('../../models/organizations');
    // template = require('../../templates/organizations/list.html');

var NTEEChartView = Backbone.View.extend({

  // el: '#content',
  //template: template,

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
  },

  render: function() {
    console.log("XXX Rendering NTEE chart", this.collection.toJSON());

    
    // this.$el.html(this.template({
    //   organizations: this.collection.toJSON()
    // }));
  }
});

module.exports = NTEEChartView;
