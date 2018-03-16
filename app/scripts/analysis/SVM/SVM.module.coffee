'use strict'

Module = require 'scripts/BaseClasses/BaseModule.coffee'

module.exports = cluster = new Module

  # module id for registration
  id: 'app_analysis_svm'

  # module components
  components:
    services:
      'app_analysis_svm_initService': require 'scripts/analysis/tools/SVM/SVMInit.service.coffee'
      'app_analysis_svm_msgService': require 'scripts/analysis/tools/SVM/SVMMsgService.service.coffee'
      'app_analysis_svm_dataService': require 'scripts/analysis/tools/SVM/SVMDataService.service.coffee'

    controllers:
      'svmMainCtrl': require 'scripts/analysis/tools/SVM/SVMMainCtrl.ctrl.coffee'
      'svmSidebarCtrl': require 'scripts/analysis/tools/SVM/SVMSidebarCtrl.ctrl.coffee'

  # module state config
  state:
    # module name to show in UI
    name: 'SVM'
    url: '/tools/svm'
    mainTemplate: require 'partials/analysis/tools/svm/main.jade'
    sidebarTemplate: require 'partials/analysis/tools/svm/sidebar.jade'
