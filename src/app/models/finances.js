var $ = require('jquery'),
    Backbone = require('backbone'),
    _ = require('lodash'),
    numeral = require('numeral'),
    moment = require('moment'),
    settings = require('../settings');

var Finances = {};

Finances.Model = Backbone.Model.extend({

  // url: function() {
  //   return settings.api.baseurl + '/grants/' + this.id + '.jsonp/?callback=?';
  // },

  parse: function(data) {
    data.total_assets = numeral(data.total_assets).format('0,0[.]00');
    data.total_expenses = numeral(data.total_expenses).format('0,0[.]00');
    data.total_revenue = numeral(data.total_revenue).format('0,0[.]00');
    return data;
  }
});

Finances.Collection = Backbone.Collection.extend({
  model: Finances.Model,

  initialize: function(options) {
    _.bindAll(this, 'parse', 'url', 'toJSON');
    console.log("Init finances", options);
    this.ein = options.ein;
    this.fetch({reset: true});
  },

  url: function() {
    return settings.api.financeAPI + '/ein/' + this.ein;
  },

  parse: function(response) {
    if (response.combined) {
      return response.combined;
    }
    return [];
  }
});

module.exports = Finances;
