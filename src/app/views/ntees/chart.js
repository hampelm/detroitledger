var $ = require('jquery'),
    _ = require('lodash'),
    Backbone = require('backbone'),
    Highcharts = require('highcharts'),
    moment = require('moment'),
    numeral = require('numeral'),
    tinycolor = require('tinycolor'),

    Organizations = require('../../models/organizations');
    // template = require('../../templates/organizations/list.html');


var NTEEChartView = Backbone.View.extend({
  //template: template,

  initialize: function(options) {
    _.bindAll(this, 'render');
    this.collection.bind('reset', this.render);
  },

  render: function() {
    console.log("XXX Rendering NTEE chart", this.collection.toJSON());
    
    var data = this.collection.toJSON();
    var revenues = [];
    data.forEach(function(org) {
      // XXX TODO we need to have a better info object join here.
      if (!org.info) {
        console.log("Skipping, no info", org);
        return;
      }

      var series = {
        name: org.info.NAME,
        data: []
      };

      org.data.forEach(function(year) {
        var date = moment(year.year + '-' + year.month + '-01').endOf('month');
        series.data.push([Date.UTC(year.year, year.month, 1), Number(year.total_revenue)]);
      });

      // console.log("Got series", series);
      revenues.push(series);
    });


    var colors = tinycolor("#70c6ff", revenues.length).analogous();
    colors = colors.map(function(t) { return t.toHexString(); });

    $('.chart-revenue').highcharts({
      chart: {
        type: 'spline'
      },
      title: {
        text: null
      },
      legend: {
        enabled: false
      },
      tooltip: {
        dateTimeLabelFormats: {
          month: '%b %Y',
          year: '%b %Y',
          day: '%b %Y'
        },
        headerFormat: '<span style="font-size: 10px">Year ending {point.key}</span><br/>',
        pointFormatter: function() {
          return this.series.name + ': $' + numeral(this.y).format('0,0[.]00');
        },
        //shared: true,
        split: true,
        distance: 30,
        padding: 5
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: { // don't display the dummy year
          month: '%b %Y',
          year: '%b %Y',
          day: '%b %Y'
        },
        title: {
          text: null
        }
      },
      yAxis: {
        labels: {
          formatter: function() {
            var value = this.value;
            if (value >= 1000000000) {
              value = value / 1000000000 + 'B';
            }

            if (value >= 1000000) {
              value = value / 1000000 + 'M';
            }

            if (value >= 1000) {
              value = value / 1000 + 'k';
            }
            return '$' + value;
          }
        },
        minorTickInterval: 0.1,
        minorGridLineColor: '#f2f2f2',
        title: {
          text: null
        },
        type: 'logarithmic'
      },
      plotOptions: {
          spline: {
              marker: {
                  enabled: true
              }
          }
      },
      series: revenues,
      colors: colors
    });
    
    // this.$el.html(this.template({
    //   organizations: this.collection.toJSON()
    // }));
  }
});

module.exports = NTEEChartView;
