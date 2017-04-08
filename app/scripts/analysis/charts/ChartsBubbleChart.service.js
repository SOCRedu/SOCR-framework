// Generated by CoffeeScript 1.12.2
(function() {
  'use strict';
  var BaseService, ChartsBubbleChart,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  BaseService = require('scripts/BaseClasses/BaseService.coffee');

  module.exports = ChartsBubbleChart = (function(superClass) {
    extend(ChartsBubbleChart, superClass);

    function ChartsBubbleChart() {
      return ChartsBubbleChart.__super__.constructor.apply(this, arguments);
    }

    ChartsBubbleChart.prototype.initialize = function() {};

    ChartsBubbleChart.prototype.drawBubble = function(ranges, width, height, _graph, data, gdata, container) {
      var color, nest, padding, r, rValue, tooltip, x, xAxis, y, yAxis, zIsNumber;
      nest = d3.nest().key(function(d) {
        return d.z;
      });
      padding = 50;
      x = d3.scale.linear().domain([ranges.xMin, ranges.xMax]).range([padding, width - padding]);
      y = d3.scale.linear().domain([ranges.yMin, ranges.yMax]).range([height - padding, padding]);
      xAxis = d3.svg.axis().scale(x).orient('bottom');
      yAxis = d3.svg.axis().scale(y).orient('left');
      zIsNumber = !isNaN(data[0].z);
      r = 0;
      rValue = 0;
      if (zIsNumber) {
        r = d3.scale.linear().domain([
          d3.min(data, function(d) {
            return parseFloat(d.z);
          }), d3.max(data, function(d) {
            return parseFloat(d.z);
          })
        ]).range([3, 15]);
        rValue = function(d) {
          return parseFloat(d.z);
        };
      } else {
        r = d3.scale.linear().domain([5, 5]).range([3, 15]);
        rValue = function(d) {
          return d.z;
        };
      }
      tooltip = container.append('div').attr('class', 'tooltip');
      color = d3.scale.category10();
      _graph.append("g").attr("class", "x axis").attr('transform', 'translate(0,' + (height - padding) + ')').call(xAxis).style('font-size', '16px');
      _graph.append("g").attr("class", "y axis").attr('transform', 'translate(' + padding + ',0)').call(yAxis).style('font-size', '16px');
      _graph.selectAll('.x.axis path').style({
        'fill': 'none',
        'stroke': 'black',
        'shape-rendering': 'crispEdges',
        'stroke-width': '1px'
      });
      _graph.selectAll('.y.axis path').style({
        'fill': 'none',
        'stroke': 'black',
        'shape-rendering': 'crispEdges',
        'stroke-width': '1px'
      });
      _graph.selectAll('.x.axis text').attr('transform', function(d) {
        return 'translate(' + this.getBBox().height * -2 + ',' + this.getBBox().height + ')rotate(-40)';
      }).style('font-size', '16px');
      _graph.append('text').attr('class', 'label').attr('text-anchor', 'middle').attr('transform', 'translate(' + width + ',' + (height - padding / 2) + ')').text(gdata.xLab.value);
      _graph.append("text").attr('class', 'label').attr('text-anchor', 'middle').attr('transform', 'translate(0,' + padding / 2 + ')').text(gdata.yLab.value);
      return _graph.selectAll('.circle').data(data).enter().append('circle').attr('fill', zIsNumber ? 'yellow' : function(d) {
        return color(d.z);
      }).attr('opacity', '0.7').attr('stroke', zIsNumber ? 'orange' : function(d) {
        return color(d.z);
      }).attr('stroke-width', '2px').attr('cx', function(d) {
        return x(d.x);
      }).attr('cy', function(d) {
        return y(d.y);
      }).attr('r', function(d) {
        if (zIsNumber) {
          return r(d.z);
        } else {
          return 8;
        }
      }).on('mouseover', function(d) {
        tooltip.transition().duration(200).style('opacity', .9);
        return tooltip.html('<div style="background-color:white; padding:5px; border-radius: 5px">' + gdata.zLab.value + ': ' + rValue(d) + '</div>').style('left', d3.select(this).attr('cx') + 'px').style('top', d3.select(this).attr('cy') + 'px');
      }).on('mouseout', function() {
        return tooltip.transition().duration(500).style('opacity', 0);
      });
    };

    return ChartsBubbleChart;

  })(BaseService);

}).call(this);

//# sourceMappingURL=ChartsBubbleChart.service.js.map
