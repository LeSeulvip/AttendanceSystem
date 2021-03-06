(function() {
  var ctrls = angular.module(MyAppConfig.controllers);
  ctrls.controller('IndexCtrl', ['$scope', '$log', '$timeout', 'MyDataService', '$location', 'DialogService', 'MyUtilService', 'ToolService', IndexCtrl]);

  function IndexCtrl($scope, $log, $timeout, MyDataService, $location, DialogService, MyUtilService, ToolService) {
    $log.debug('IndexCtrl init...');

    // 处理scope销毁
    $scope.$on('$destroy', function() {
      $log.debug('IndexCtrl destroy...');
    });

    $scope.tbAdmin = {
      userName: '员工',
      userPwd: '123456'
    };

    $scope.login = function() {
      DialogService.showWait('登录中，请稍后....');
      MyDataService.send(
        '/TbAdmin/login',
        {
          tbAdmin: $scope.tbAdmin
        },
        function(data) {
          DialogService.hideWait();
          DialogService.showAlert(data.message, function() {
            if (data.success) {
              if (data.datas.user.permissions == '1') {
                $timeout(function() {
                  $location.path('/route/page/user/main');
                }, 1);
              } else {
                $timeout(function() {
                  $location.path('/route/page/manage/admin');
                }, 1);
              }
            }
          });
        }
      );
    };

    //重填
    $scope.cancel = function() {
      $scope.user = {};
    };
  }
})();
