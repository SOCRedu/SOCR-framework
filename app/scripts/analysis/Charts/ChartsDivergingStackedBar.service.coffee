'use strict'

BaseService = require 'scripts/BaseClasses/BaseService.coffee'

module.exports = class ChartsDivergingStackedBar extends BaseService
  @inject '$q',
    '$stateParams',
    'app_analysis_charts_dataTransform',
    'app_analysis_charts_list',
    'app_analysis_charts_sendData',
    'app_analysis_charts_checkTime',
    'app_analysis_charts_dataService',
    'app_analysis_charts_msgService',

  initialize: ->
    @msgService = @app_analysis_charts_msgService
    @dataService = @app_analysis_charts_dataService
    @dataTransform = @app_analysis_charts_dataTransform
    @list = @app_analysis_charts_list
    @sendData = @app_analysis_charts_sendData
    @checkTime = @app_analysis_charts_checkTime
    @DATA_TYPES = @dataService.getDataTypes()

    @ve = require 'vega-embed'
    @vt = require 'vega-tooltip/build/vega-tooltip.js'

  drawDivergingStackedBar: (data, labels, container) ->

    container.select("#slider").remove()
    container.select("#maxbins").remove()

#    vlSpec = {
#      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
#      "data": {"values": data},
#      "mark": "bar",
#      "encoding": {
#        "x": {
#          "field": labels.xLab.value,
#          "type": "quantitative",
#          "axis": { "title": labels.xLab.value }
#        },
#        "x2": {
#          "field": labels.rLab.value,
#          "type": "quantitative"
#        },
#        "y": {
#          "field": labels.yLab.value,
#          "type": "nominal",
#          "axis": {
#            "title": labels.yLab.value,
#            "offset": 5,
#            "ticks": false,
#            "minExtent": 60,
#            "domain": false
#          }
#        }
#      }
#    }
#
#    if labels["zLab"].value and labels["zLab"].value isnt "None"
#      vlSpec["encoding"]["color"] = {"field": labels.zLab.value, "type": "nominal", "scale": {"scheme": "category20b"}, "legend": {"title": labels.zLab.value}}

    vlSpec = {
      "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
      "description": "A diverging stacked bar chart for sentiments towards a set of eight questions, displayed as percentages with neutral responses straddling the 0% mark",
      "data": {
        "values":[
          {
            "question": "Question 1",
            "type": "Strongly disagree",
            "value": 24,
            "percentage": 0.7,
            "percentage_start": -19.1,
            "percentage_end": -18.4
          },
          {
            "question": "Question 1",
            "type": "Disagree",
            "value": 294,
            "percentage": 9.1,
            "percentage_start": -18.4,
            "percentage_end": -9.2
          },
          {
            "question": "Question 1",
            "type": "Neither agree nor disagree",
            "value": 594,
            "percentage": 18.5,
            "percentage_start": -9.2,
            "percentage_end": 9.2
          },
          {
            "question": "Question 1",
            "type": "Agree",
            "value": 1927,
            "percentage": 59.9,
            "percentage_start": 9.2,
            "percentage_end": 69.2
          },
          {
            "question": "Question 1",
            "type": "Strongly agree",
            "value": 376,
            "percentage": 11.7,
            "percentage_start": 69.2,
            "percentage_end": 80.9
          },

          {
            "question": "Question 2",
            "type": "Strongly disagree",
            "value": 2,
            "percentage": 18.2,
            "percentage_start": -36.4,
            "percentage_end": -18.2
          },
          {
            "question": "Question 2",
            "type": "Disagree",
            "value": 2,
            "percentage": 18.2,
            "percentage_start": -18.2,
            "percentage_end": 0
          },
          {
            "question": "Question 2",
            "type": "Neither agree nor disagree",
            "value": 0,
            "percentage": 0,
            "percentage_start": 0,
            "percentage_end": 0
          },
          {
            "question": "Question 2",
            "type": "Agree",
            "value": 7,
            "percentage": 63.6,
            "percentage_start": 0,
            "percentage_end": 63.6
          },
          {
            "question": "Question 2",
            "type": "Strongly agree",
            "value": 11,
            "percentage": 0,
            "percentage_start": 63.6,
            "percentage_end": 63.6
          },

          {
            "question": "Question 3",
            "type": "Strongly disagree",
            "value": 2,
            "percentage": 20,
            "percentage_start": -30,
            "percentage_end": -10
          },
          {
            "question": "Question 3",
            "type": "Disagree",
            "value": 0,
            "percentage": 0,
            "percentage_start": -10,
            "percentage_end": -10
          },
          {
            "question": "Question 3",
            "type": "Neither agree nor disagree",
            "value": 2,
            "percentage": 20,
            "percentage_start": -10,
            "percentage_end": 10
          },
          {
            "question": "Question 3",
            "type": "Agree",
            "value": 4,
            "percentage": 40,
            "percentage_start": 10,
            "percentage_end": 50
          },
          {
            "question": "Question 3",
            "type": "Strongly agree",
            "value": 2,
            "percentage": 20,
            "percentage_start": 50,
            "percentage_end": 70
          },

          {
            "question": "Question 4",
            "type": "Strongly disagree",
            "value": 0,
            "percentage": 0,
            "percentage_start": -15.6,
            "percentage_end": -15.6
          },
          {
            "question": "Question 4",
            "type": "Disagree",
            "value": 2,
            "percentage": 12.5,
            "percentage_start": -15.6,
            "percentage_end": -3.1
          },
          {
            "question": "Question 4",
            "type": "Neither agree nor disagree",
            "value": 1,
            "percentage": 6.3,
            "percentage_start": -3.1,
            "percentage_end": 3.1
          },
          {
            "question": "Question 4",
            "type": "Agree",
            "value": 7,
            "percentage": 43.8,
            "percentage_start": 3.1,
            "percentage_end": 46.9
          },
          {
            "question": "Question 4",
            "type": "Strongly agree",
            "value": 6,
            "percentage": 37.5,
            "percentage_start": 46.9,
            "percentage_end": 84.4
          },

          {
            "question": "Question 5",
            "type": "Strongly disagree",
            "value": 0,
            "percentage": 0,
            "percentage_start": -10.4,
            "percentage_end": -10.4
          },
          {
            "question": "Question 5",
            "type": "Disagree",
            "value": 1,
            "percentage": 4.2,
            "percentage_start": -10.4,
            "percentage_end": -6.3
          },
          {
            "question": "Question 5",
            "type": "Neither agree nor disagree",
            "value": 3,
            "percentage": 12.5,
            "percentage_start": -6.3,
            "percentage_end": 6.3
          },
          {
            "question": "Question 5",
            "type": "Agree",
            "value": 16,
            "percentage": 66.7,
            "percentage_start": 6.3,
            "percentage_end": 72.9
          },
          {
            "question": "Question 5",
            "type": "Strongly agree",
            "value": 4,
            "percentage": 16.7,
            "percentage_start": 72.9,
            "percentage_end": 89.6
          },

          {
            "question": "Question 6",
            "type": "Strongly disagree",
            "value": 1,
            "percentage": 6.3,
            "percentage_start": -18.8,
            "percentage_end": -12.5
          },
          {
            "question": "Question 6",
            "type": "Disagree",
            "value": 1,
            "percentage": 6.3,
            "percentage_start": -12.5,
            "percentage_end": -6.3
          },
          {
            "question": "Question 6",
            "type": "Neither agree nor disagree",
            "value": 2,
            "percentage": 12.5,
            "percentage_start": -6.3,
            "percentage_end": 6.3
          },
          {
            "question": "Question 6",
            "type": "Agree",
            "value": 9,
            "percentage": 56.3,
            "percentage_start": 6.3,
            "percentage_end": 62.5
          },
          {
            "question": "Question 6",
            "type": "Strongly agree",
            "value": 3,
            "percentage": 18.8,
            "percentage_start": 62.5,
            "percentage_end": 81.3
          },

          {
            "question": "Question 7",
            "type": "Strongly disagree",
            "value": 0,
            "percentage": 0,
            "percentage_start": -10,
            "percentage_end": -10
          },
          {
            "question": "Question 7",
            "type": "Disagree",
            "value": 0,
            "percentage": 0,
            "percentage_start": -10,
            "percentage_end": -10
          },
          {
            "question": "Question 7",
            "type": "Neither agree nor disagree",
            "value": 1,
            "percentage": 20,
            "percentage_start": -10,
            "percentage_end": 10
          },
          {
            "question": "Question 7",
            "type": "Agree",
            "value": 4,
            "percentage": 80,
            "percentage_start": 10,
            "percentage_end": 90
          },
          {
            "question": "Question 7",
            "type": "Strongly agree",
            "value": 0,
            "percentage": 0,
            "percentage_start": 90,
            "percentage_end": 90
          },

          {
            "question": "Question 8",
            "type": "Strongly disagree",
            "value": 0,
            "percentage": 0,
            "percentage_start": 0,
            "percentage_end": 0
          },
          {
            "question": "Question 8",
            "type": "Disagree",
            "value": 0,
            "percentage": 0,
            "percentage_start": 0,
            "percentage_end": 0
          },
          {
            "question": "Question 8",
            "type": "Neither agree nor disagree",
            "value": 0,
            "percentage": 0,
            "percentage_start": 0,
            "percentage_end": 0
          },
          {
            "question": "Question 8",
            "type": "Agree",
            "value": 0,
            "percentage": 0,
            "percentage_start": 0,
            "percentage_end": 0
          },
          {
            "question": "Question 8",
            "type": "Strongly agree",
            "value": 2,
            "percentage": 100,
            "percentage_start": 0,
            "percentage_end": 100
          }
        ]
      },
      "mark": "bar",
      "encoding": {
        "x": {
          "field": "percentage_start",
          "type": "quantitative",
          "axis": { "title": "Percentage" }
        },
        "x2": {
          "field": "percentage_end",
          "type": "quantitative"
        },
        "y": {
          "field": "question",
          "type": "nominal",
          "axis": {
            "title": "Question",
            "offset": 5,
            "ticks": false,
            "minExtent": 60,
            "domain": false
          }
        },
        "color": {
          "field": "type",
          "type": "nominal",
          "legend": { "title": "Response" },
          "scale": {
            "domain":[
              "Strongly disagree",
              "Disagree",
              "Neither agree nor disagree",
              "Agree",
              "Strongly agree"
            ],
            "range": ["#c30d24", "#f3a583", "#cccccc", "#94c6da", "#1770ab"],
            "type": "ordinal"
          }
        }
      }
    }

    opt =
      "actions": {export: true, source: false, editor: false}

    @ve('#vis', vlSpec, opt, (error, result) -> return).then((result) =>
      @vt.vegaLite(result.view, vlSpec)
    )
