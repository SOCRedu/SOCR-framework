'use strict'

instrPerfEval = angular.module('app_analysis_instrPerfEval', [])

.factory('app_analysis_instrPerfEval_constructor', [
    'app_analysis_instrPerfEval_manager'
    (manager) ->
      (sb) ->

        manager.setSb sb unless !sb?
        _msgList = manager.getMsgList()

        init: (opt) ->
          console.log 'instrPerfEval init invoked'

        destroy: () ->

        msgList: _msgList
  ])

.factory('app_analysis_instrPerfEval_manager', [
    () ->
      _sb = null

      _msgList =
        outgoing: ['get table']
        incoming: ['take table']
        scope: ['instrPerfEval']

      _setSb = (sb) ->
        _sb = sb

      _getSb = () ->
        _sb

      _getMsgList = () ->
        _msgList

      getSb: _getSb
      setSb: _setSb
      getMsgList: _getMsgList
  ])

.controller('instrPerfEvalMainCtrl', [
    'app_analysis_instrPerfEval_manager'
    'app_analysis_instrPerfEval_alphaCalculator'
    '$scope'
    (ctrlMngr, alphaCalculator, $scope) ->
      console.log 'instrPerfEvalViewMainCtrl executed'

      prettifyArrayOutput = (arr) ->
        arr = arr.map (x) -> x.toFixed 3
        '[' + arr.toString().split(',').join('; ') + ']'

      data = alphaCalculator.getAlpha()

      $scope.cronAlpha = Number(data.cronAlpha).toFixed(3)
      $scope.icc = Number(data.icc).toFixed(3)
      $scope.kr20 = if data.kr20 is 'Not a binary data' then data.kr20 else Number(data.kr20).toFixed(3)
      $scope.cronAlphaIdInterval = prettifyArrayOutput(data.idIntervals)
      $scope.cronAlphaKfInterval = prettifyArrayOutput(data.kfIntervals)
      $scope.cronAlphaLogInterval = prettifyArrayOutput(data.logitIntervals)
      $scope.splitHalfCoef = Number(data.adjRCorrCoef).toFixed(3)
  ])

.controller('instrPerfEvalSidebarCtrl', [
    'app_analysis_instrPerfEval_manager'
    'app_analysis_instrPerfEval_alphaCalculator'
    '$scope'
    '$stateParams'
    '$q'
    (ctrlMngr, alphaCalculator, $scope, $stateParams, $q) ->
      console.log 'instrPerfEvalViewSidebarCtrl executed'

      sb = ctrlMngr.getSb()

      $scope.nCols = '5'
      $scope.nRows = '5'

      deferred = $q.defer()

      $scope.confLevel = 0.95

      # subscribe for incoming message with data
      token = sb.subscribe
        msg: 'take table'
        msgScope: ['instrPerfEval']
        listener: (msg, data) ->
          _data = data
          $scope.nRows = _data.data?.length
          $scope.nCols = _data.data[0]?.length
          console.log data
          alphaCalculator.calculate data, $scope.confLevel

      sb.publish
        msg: 'get table'
        msgScope: ['instrPerfEval']
        callback: -> sb.unsubscribe token
        data:
          tableName: $stateParams.projectId + ':' + $stateParams.forkId
          promise: deferred
  ])

.factory('app_analysis_instrPerfEval_alphaCalculator', [
  () ->

    _data = []

    _getAlpha = ->
      _data

    _calculate = (obj, confLevel) ->
      # calculate Cronbach's Alpha
      matrix = jStat obj.data
      k = jStat.cols matrix
      r = jStat.rows matrix

      matrix = jStat jStat.map matrix, Number

      sumColsVar = jStat.sum matrix.variance()
      rowTotalsVar = jStat.variance matrix.transpose().sum()
      cAlpha = (k / (k - 1)) * (1 - sumColsVar / rowTotalsVar)

      # Intraclass correlation coefficient
      matrixMean = jStat.sum(matrix.sum()) / (r * k)
      rowMeans = matrix.transpose().mean() # [mean xi]
      colMeans = matrix.mean() # [mean xj]
      ssRows = k * jStat.sum jStat.pow(jStat.subtract(rowMeans, matrixMean), 2)
      ssCols = r * jStat.sum jStat.pow(jStat.subtract(colMeans, matrixMean), 2)
      ssErr = 0
      for col, j in matrix.transpose()
        for ij, i in col
          ssErr = ssErr + Math.pow ij - rowMeans[i] - colMeans[j] + matrixMean, 2
      msRows = ssRows / (r - 1)
      msCols = ssCols / (k - 1)
      msErr = ssErr / ((r - 1) * (k - 1))
      icc = (msRows - msErr) / (msRows + (k - 1) * msErr) + k * (msCols - msErr) / r

      # Split-Half Reliability coefficient
      nGroups = 2
      oddSum = jStat.zeros(1, r)[0]
      evenSum = jStat.zeros(1, r)[0]
      for col in matrix.transpose() by 2
        evenSum = (evenSum[x] + col[x] for x of evenSum)
      for colIdx in [1..k-1] by 2
        col = jStat.transpose jStat.col(matrix, colIdx)
        oddSum = (oddSum[x] + col[x] for x of oddSum)
      meanOdd = jStat.mean oddSum
      meanEven = jStat.mean evenSum
      rCorrCoef = jStat.corrcoeff oddSum, evenSum
      adjRCorrCoef = rCorrCoef * nGroups / ((nGroups - 1) * (rCorrCoef - 1))

      # Calculating Kuder–Richardson Formula 20 (KR-20)
      zeroMatrix = matrix.subtract 1
      if jStat.sum(jStat(zeroMatrix).sum()) isnt 0
        kr20 = 'Not a binary data'

      # Calculate confidence intervals
      gamma = (1 - confLevel) * 2 # confidence coefficient

      # calculate ID confidence intervals
      n = jStat.rows matrix
      alphaCap = 0
      for row in matrix
        centeredRow = jStat.subtract row, jStat.mean row
        alphaCap = alphaCap + jStat.dot centeredRow, centeredRow
      alphaCap = alphaCap / (n - 1)
      omega = 2 * (k - 1) * (1 - alphaCap) / k
      varCapAlphaCap = (k * k * omega) / (n * (k - 1) * (k - 1))

      idIntervalAbsDev = jStat.normal.inv(1 - gamma / 2, 0, 1) * Math.sqrt varCapAlphaCap
      idIntervalLeft = alphaCap - idIntervalAbsDev
      idIntervalRight = alphaCap + idIntervalAbsDev

      # calculate KF confidence intervals
      kfIntervalLeft = 1 - (1 - alphaCap) * Math.exp jStat.normal.inv(1 - gamma / 2, 0, 1) *
          Math.sqrt 2 * k / (n * (k - 1))
      kfIntervalRight = 1 - (1 - alphaCap) * Math.exp -1 * jStat.normal.inv(1 - gamma / 2, 0, 1) *
          Math.sqrt 2 * k / (n * (k - 1))

      #calculate logit confidence intervals
      thetaCap = Math.log alphaCap / (1 - alphaCap)
      varCapThetaCap = varCapAlphaCap * Math.pow 1 / alphaCap + 1 / (1 - alphaCap), 2
      thetaAbsDev = jStat.normal.inv(1 - gamma / 2, 0, 1) * Math.sqrt varCapThetaCap
      thetaIntervalLeft = thetaCap - thetaAbsDev
      thetaIntervalRight = thetaCap + thetaAbsDev
      logitIntervalLeft = Math.exp(thetaIntervalLeft) / (1 + Math.exp thetaIntervalLeft)
      logitIntervalRight = Math.exp(thetaIntervalRight) / (1 + Math.exp thetaIntervalRight)

      _data =
        cronAlpha: cAlpha
        icc: icc
        kr20: kr20
        idIntervals: [Math.max(0, idIntervalLeft), Math.min(1, idIntervalRight)]
        kfIntervals: [Math.max(0, kfIntervalLeft), Math.min(1, kfIntervalRight)]
        logitIntervals: [Math.max(0, logitIntervalLeft), Math.min(1, logitIntervalRight)]
        adjRCorrCoef: adjRCorrCoef

    calculate: _calculate
    getAlpha: _getAlpha
])