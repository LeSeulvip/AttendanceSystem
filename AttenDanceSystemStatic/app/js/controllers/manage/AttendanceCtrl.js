(function() {
  var ctrls = angular.module(MyAppConfig.controllers);
  ctrls.controller('AttendanceCtrl', ['$scope', '$log', 'MyDataService', '$location', 'DialogService', 'MyUtilService', 'ToolService', AttendanceCtrl]);

  function AttendanceCtrl($scope, $log, MyDataService, $location, DialogService, MyUtilService, ToolService) {
    $log.debug('AttendanceCtrl init...');

    // 处理scope销毁
    $scope.$on('$destroy', function() {
      $log.debug('AttendanceCtrl destroy...');
    });

    $scope.page = {};
    //查询
    $scope.query = function() {
      DialogService.showWait('数据查询中，请稍后。。。。。');
      MyDataService.send(
        '/TbAttendance/queryAll',
        {
          page: $scope.page
        },
        function(data) {
          DialogService.hideWait();
          if (!data.success) {
            DialogService.showAlert(data.success);
            return;
          }
          $scope.list = data.datas.list;
          $scope.page = data.datas.page;
        }
      );
    };
    $scope.query();

    // //添加
    $scope.toAdd = function() {
      DialogService.showWait('添加数据中，请稍后......');
      MyDataService.send(
        '/TbAttendance/add',
        {
          TbAttendance: $scope.formdata
        },
        function(data) {
          DialogService.hideWait();
          DialogService.showAlert(data.message, function() {
            if (data.success) {
              $scope.query();
              DialogService.hideCustom();
            }
          });
        }
      );
    };

    //删除
    $scope.toDelete = function(tbAttendance) {
      $log.debug(tbAttendance);
      DialogService.showWait('删除数据中，请稍后......');
      MyDataService.send(
        '/TbAttendance/delete',
        {
          tbAttendance: tbAttendance
        },
        function(data) {
          DialogService.hideWait();
          DialogService.showAlert(data.message, function() {
            if (data.success) {
              $scope.query();
              // DialogService.hideCustom();
            }
          });
        }
      );
    };
  }
})();
