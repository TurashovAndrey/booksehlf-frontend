angular
    .module('CustomerPortal')
    .controller('TargetController', function TargetController($scope, $state, TargetFactory, SiteFactory, _view_mode, _target, toastr) {
    function activate() {
    	$scope.limit = 10;
    	$scope.currentPage = 1;

    	$scope.getTargets();

        $scope.target = _target == null ? {} : angular.copy(_target.data);
        $scope.view_mode = _view_mode;
        SiteFactory.getSites().then(function(response) {
           $scope.sites = response.data;
        }).catch(function(error) {
            toastr.error(error.data);
        });
    }
    
    $scope.getTargets = function() {
        TargetFactory.getTargets({"limit": $scope.limit, "offset": ($scope.currentPage - 1) * $scope.limit}).then(function(response) {
        	$scope.total = response.data.count;
            $scope.targets = response.data.results
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    

    $scope.addTarget = function() {
        $state.transitionTo("create_target");
    };

    $scope.editTarget = function(id) {
        $state.transitionTo("edit_target", {"id": id});
    };

    $scope.createTarget = function() {
        var valid = true;
        if (!$scope.target.friendly_name) {
            toastr.error('Friendly Name field is required');
            valid = false;
        }

        if (!$scope.target.site) {
            toastr.error('Site field is required');
            valid = false;
        }

        if (valid) {
            TargetFactory.createTarget($scope.target).then(function (response) {
                $state.transitionTo("targets");
            }).catch(function (error) {
                toastr.error(error.data);
            });
        }
    };

    $scope.updateTarget = function() {
        TargetFactory.updateTarget($scope.target.id, $scope.target).then(function(response){
            $state.transitionTo("targets");
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.clearTarget = function() {
        $scope.Target = _target == null ? {} : _target.data;
    };

    $scope.cancelTarget = function() {
        $state.transitionTo("targets");
    };

    $scope.delete = function(id) {
        TargetFactory.deleteTarget(id).then(function(response) {
           activate();
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.view = function(id) {
        $state.transitionTo("view_target", {"id": id});
    };

    $scope.edit = function(id) {
        $state.transitionTo("edit_target", {"id": id});
    };

    $scope.sort = function(sortField) {
      var params = {ordering: sortField};

      $scope.sortField = sortField;
      TargetFactory.getTargets(params).then(function(response) {
            $scope.targets = response.data
      }).catch(function(error) {
            toastr.error(error.data);
      });
    };

    $scope.search = function() {
        $scope.sortField = null;
        var params = {search: $scope.searchField}
        TargetFactory.getTargets(params).then(function(response) {
            $scope.targets = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    
    activate();
});
