angular
    .module('CustomerPortal')
    .controller('TestController', function TestController($scope, TestFactory, FieldUnitFactory, TargetFactory, 
    													  SensorFactory, $state, _view_mode, _test, toastr, _recurring) {
    function activate() {
    	$scope.limit = 10;
    	$scope.currentPage = 1;
    	$scope.recurring = _recurring;
        $scope.checkedAll = false;
        $scope.checkedTests = 0;
    	
    	$scope.getTests();
    	
        FieldUnitFactory.getFieldUnits().then(function(response) {
            $scope.field_units = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });

        TargetFactory.getTargets().then(function(response) {
           $scope.targets = response.data;
        }).catch(function(error) {
            toastr.error(error.data);
        });

        if ($scope.recurring)
	        SensorFactory.getSensors({type: "recurring"}).then(function(response) {
	           $scope.sensors = response.data;
	        }).catch(function(error) {
	            toastr.error(error.data);
	        });
        else
	        SensorFactory.getSensors({type: "single"}).then(function(response) {
		           $scope.sensors = response.data;
		        }).catch(function(error) {
		            toastr.error(error.data);
		        });

        $scope.test = _test == null ? {} : angular.copy(_test.data);
        $scope.view_mode = _view_mode;

    }
    
    $scope.checkTest = function(test) {
    	if (test.checked)
    		$scope.checkedTests += 1;
    	else
    		$scope.checkedTests -= 1;
    };
    
    $scope.checkAllTests = function() {
        $scope.checkedAll = !$scope.checkedAll;
    	if ($scope.checkedAll)
    		$scope.checkedTests = $scope.tests.length;
    	else
    		$scope.checkedTests = 0;

        angular.forEach($scope.tests, function(test) {
            test.checked = $scope.checkedAll;
        });
    };    
    $scope.getTests = function() {
    	if ($scope.recurring)
	        TestFactory.getTests({"limit": $scope.limit, "type":"recurring", "offset": ($scope.currentPage - 1) * $scope.limit}).then(function(response) {
	        	$scope.total = response.data.count;
	            $scope.tests = response.data.results
	            angular.forEach($scope.tests, function(test) {
	            	if (new Date(test.parameters.start) > new Date())
	            		test.status = "Pending";
	            	else if (new Date(test.parameters.stop) >= new Date()) 
	            		test.status = "Active";
	            	else 
	            		test.status = "Finished";
	            });
	        });
    	else
	        TestFactory.getTests({"limit": $scope.limit, "type":"single", "offset": ($scope.currentPage - 1) * $scope.limit}).then(function(response) {
	        	$scope.total = response.data.count;
	            $scope.tests = response.data.results

	            angular.forEach($scope.tests, function(test) {
	            	if (new Date(test.created_date) > new Date())
	            		test.status = "Pending";
	            	else if (!test.result)
	            		test.status = "Active";
	            	else
	            		test.status = "Finished";
	            });
	            
	        });
    }
    
    $scope.getTestResult = function(id) {
        TestFactory.getTestResults(id).then(function(response) {
            if (response.data.length > 0) 
            	$scope.tooltip = "The test has " + response.data.length + " results"
            else
            	$scope.tooltip = "The test has no results"
        }); 
    }

    $scope.addTest = function() {
    	if ($scope.recurring) 
    		$state.transitionTo("wizard_recurring");
    	else 
    		$state.transitionTo("wizard_onetime");
    };

    $scope.getResults = function(test) {
        $state.transitionTo("graphics", {"id": test.id, "_tab": null});
    };

    $scope.createTest = function() {
        var valid = true;
        if (!$scope.test.name){
            toastr.error('Name field is required');
            valid = false;
        }

        if (!$scope.test.field_unit) {
            toastr.error('Field Unit field is required');
            valid = false;
        }

        if (!$scope.test.target) {
            toastr.error('Target field is required');
            valid = false;
        }

        if (!$scope.test.sensor) {
            toastr.error('Sensor field is required');
            valid = false;
        }

        if (valid) {
            TestFactory.createTest($scope.test).then(function (response) {
                $state.transitionTo("tests");
            }).catch(function (error) {
                toastr.error(error.data);
            });
        }
    };

    $scope.updateTest = function() {
        TestFactory.updateTest($scope.test.id, $scope.test).then(function(response){
            $state.transitionTo("tests");
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.clearTest = function() {
        $scope.Test = _test == null ? {} : _test.data;
    };

    $scope.cancelTest = function() {
        $state.transitionTo("tests");
    };

    $scope.delete = function(id) {
        TestFactory.deleteTest(id).then(function(response) {
           activate();
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    
    $scope.deleteTests = function(id) {
    	angular.forEach($scope.tests, function(test) {
    		if (test.checked) {
		        TestFactory.deleteTest(test.id).then(function(response) {
		           activate();
		        }).catch(function(error) {
		            toastr.error(error.data);
		        });
    		}
    	});
    };


    $scope.view = function(id) {
        $state.transitionTo("view_test", {"id": id});
    };

    $scope.edit = function(id) {
        $state.transitionTo("edit_test", {"id": id});
    };

    $scope.sort = function(sortField) {
      var params = {ordering: sortField};

      $scope.sortField = sortField;
      TestFactory.getTests(params).then(function(response) {
            $scope.tests = response.data
      }).catch(function(error) {
            toastr.error(error.data);
      });
    };

    $scope.search = function() {
        $scope.sortField = null;
        var params = {search: $scope.searchField}
        TestFactory.getTests(params).then(function(response) {
            $scope.tests = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    
    activate();
});
