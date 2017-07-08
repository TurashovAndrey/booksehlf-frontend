angular
    .module('CustomerPortal')
    .controller('SensorController', function SensorController($scope, $state, SensorFactory,
                                                              _sensor, _view_mode, toastr, $window) {
    function activate() {
    	$scope.limit = 10;
    	$scope.currentPage = 1;
    	$scope.getSensors();

        $scope.sensor = _sensor == null ? {} : angular.copy(_sensor.data);
        $scope.view_mode = _view_mode;
        $scope.sensor.config = {};
    }

    $scope.getSensors = function() {
        SensorFactory.getSensors({"limit": $scope.limit, "offset": ($scope.currentPage - 1) * $scope.limit}).then(function(response) {
        	$scope.total = response.data.count;
            $scope.sensors = response.data.results
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    
    $scope.loadConfig = function() {
        if ($scope.sensor.configString) {
            $scope.sensor = JSON.parse($scope.sensor.configString);
            angular.extend($scope.sensor, $scope.sensor.properties);
            $scope.sensor.parameters.capabilities = angular.copy($scope.sensor.capabilities);
            $scope.sensor.parameters.options = angular.copy($scope.sensor.options);
            delete $scope.sensor.properties;
            delete $scope.sensor.options;
            delete $scope.sensor.capabilities;
        }
    }

    $scope.addSensor = function() {
        $state.transitionTo("create_sensor");
    };

    $scope.editSensor = function(id) {
        $state.transitionTo("edit_sensor", {"id": id});
    };

    $scope.createSensor = function() {
        var valid = true;

        if (!$scope.sensor.friendly_name) {
            toastr.error('Name field is required');
            valid = false;
        }

        if( typeof $scope.sensor.description === 'string' ) {
        	$scope.sensor.description = [ $scope.sensor.description ];
        }
        $scope.sensor.description = $scope.sensor.description.join(" ");
        
        if (valid) {
            SensorFactory.getSensors({search: $scope.sensor.friendly_name}).then(function(response) {
               if (response.data.length > 0) {
                    if ($window.confirm("Do you want to update existing instrument " + $scope.sensor.friendly_name + "?")) {
                           SensorFactory.updateSensor(response.data[0].id, $scope.sensor).then(function (response) {
                                $state.transitionTo("sensors");
                           }).catch(function (error) {
                                toastr.error(error.data);
                           });
                    }
               }
               else {
                    SensorFactory.createSensor($scope.sensor).then(function (response) {
                        $state.transitionTo("sensors");
                    }).catch(function (error) {
                        toastr.error(error.data);
                    });
               }
            });
        }
    };

    $scope.updateSensor = function() {
        if ($scope.sensor.icon_info) {
            $scope.sensor.icon = "data:image/jpg;base64," + $scope.sensor.icon_info.base64;
        }
        else {
            delete $scope.sensor.icon;
        }
        SensorFactory.updateSensor($scope.sensor.id, $scope.sensor).then(function(response){
            $state.transitionTo("sensors");
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.clearSensor = function() {
        $scope.Sensor = _sensor == null ? {} : _sensor.data;
    };

    $scope.cancelSensor = function() {
        $state.transitionTo("sensors");
    };

    $scope.delete = function(id) {
        SensorFactory.deleteSensor(id).then(function(response) {
           activate();
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.view = function(id) {
        $state.transitionTo("view_sensor", {"id": id});
    };

    $scope.edit = function(id) {
        $state.transitionTo("edit_sensor", {"id": id});
    };

    $scope.sort = function(sortField) {
      var params = {ordering: sortField};

      $scope.sortField = sortField;
      SensorFactory.getSensors(params).then(function(response) {
            $scope.sensors = response.data
      }).catch(function(error) {
            toastr.error(error.data);
      });
    };

    $scope.search = function() {
        $scope.sortField = null;
        var params = {search: $scope.searchField}
        SensorFactory.getSensors(params).then(function(response) {
            $scope.sensors = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    
    activate();
});
