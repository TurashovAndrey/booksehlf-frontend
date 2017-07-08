angular
    .module('CustomerPortal')
    .controller('RosterController', function RosterController($scope, RosterFactory,  $state, TestFactory, _view_mode, _roster, toastr) {
    function activate() {
        RosterFactory.getRosters().then(function(response) {
            $scope.rosters = response.data
        });

        $scope.roster = _roster == null ? {} : angular.copy(_roster.data);
        $scope.view_mode = _view_mode;
        TestFactory.getTests().then(function(response) {
           $scope.tests = response.data;
        }).catch(function(error) {
            toastr.error(error.data);
        });
    }

    $scope.addRoster = function() {
        $state.transitionTo("create_roster");
    };

    $scope.editRoster = function(id) {
        $state.transitionTo("edit_roster", {"id": id});
    };

    $scope.createRoster = function() {
        var valid = true;
        if (!$scope.roster.test) {
            toastr.error('Test field is required');
            valid = false;
        }

        if (!$scope.roster.schedule_start) {
            toastr.error('Schedule Start field is required');
            valid = false;
        }

        if (!$scope.roster.schedule_end) {
            toastr.error('Schedule End field is required');
            valid = false;
        }

        if (!$scope.roster.interval) {
            toastr.error('Interval field is required');
            valid = false;
        }

        if (valid) {
            RosterFactory.createRoster($scope.roster).then(function (response) {
                $state.transitionTo("rosters");
            }).catch(function (error) {
                toastr.error(error.data);
            });
        }
    };

    $scope.updateRoster = function() {
        RosterFactory.updateRoster($scope.roster.id, $scope.roster).then(function(response){
            $state.transitionTo("rosters");
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.clearRoster = function() {
        $scope.Roster = _roster == null ? {} : _roster.data;
    };

    $scope.cancelRoster = function() {
        $state.transitionTo("rosters");
    };

    $scope.delete = function(id) {
        RosterFactory.deleteRoster(id).then(function(response) {
           activate();
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.view = function(id) {
        $state.transitionTo("view_roster", {"id": id});
    };

    $scope.edit = function(id) {
        $state.transitionTo("edit_roster", {"id": id});
    };

    $scope.sort = function(sortField) {
      var params = {ordering: sortField};

      $scope.sortField = sortField;
      RosterFactory.getRosters(params).then(function(response) {
            $scope.rosters = response.data
      }).catch(function(error) {
            toastr.error(error.data);
      });
    };

    $scope.search = function() {
        $scope.sortField = null;
        var params = {search: $scope.searchField}
        RosterFactory.getRosters(params).then(function(response) {
            $scope.rosters = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    
    activate();
});
