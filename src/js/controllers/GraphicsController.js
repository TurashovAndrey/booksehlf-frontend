angular
    .module('CustomerPortal')
    .controller('GraphicsController', function GraphicsController($scope, $state, TestFactory, FileSaver, 
    															  Blob, _test, $timeout, toastr, $filter, _tab) {
    function activate() {
        $scope.tab = _tab;
        $scope.test = _test.data;
        if ($scope.test.result)
            $scope.results = $scope.test.result;

        $scope.getResults($scope.test.id);
        $scope.layout = {title: 'Chart'};
        $scope.options = {showLink: false, displayLogo: false};
    };
        
    $scope.downloadXls = function(id) {
        TestFactory.getTestResultsXls($scope.test.id).success(function (data) {
            var blob = new Blob([data], {
                type: 'application/excel'
            });
            FileSaver.saveAs(blob, 'report_' + $scope.test.id + '.csv');
        });
    };

    $scope.downloadTsv = function(id) {
        TestFactory.getTestResultsTsv($scope.test.id).success(function (data) {
            var blob = new Blob([data], {
                type: 'application/excel'
            });
            FileSaver.saveAs(blob, 'report_' + $scope.test.id + '.csv');
        });
    };

    $scope.getResults = function(id) {

    	if ($scope.test.parameters.recurring) {
    		if ($scope.test.parameters.stop > new Date()) {
    			$timeout($scope.getTestResults(id), parseInt($scope.test.parameters.interval) * 1000);
    		}
    		else {
    			$scope.getTestResults(id);
    		}
    	}
    	else {
            if (!$scope.results)
    		    $scope.getTestResults(id);
    	}

    };

    $scope.isEmpty = function() {
        if (!$scope.results || Object.keys($scope.results).length == 0)
            return true;
        else
            return false;
    }

    $scope.getTestResults = function(id) {
        TestFactory.getTestResults(id).then(function(response) {
            $scope.results = response.data;

            if ($scope.test.parameters.recurring) {
                if ($scope.results.length > 0) {
                    $scope.layout.title = "Test " + id + ":" + ($scope.test.type_name || ' ') + " from " +
                        $filter('date')(new Date(parseFloat($scope.results[0].timestamp.N) * 1000), 'medium') + " to " +
                        $filter('date')(new Date(parseFloat($scope.results[$scope.results.length - 1].timestamp.N) * 1000), 'medium');
                }
                else {
                    $scope.layout.title = "Test " + id;
                }
                var x = [];
                results = {};
                angular.forEach($scope.results, function (result) {
                	angular.forEach(Object.keys(result), function(record) {
                		if (["timestamp", "sensorID", "error"].indexOf(record) == -1) {
                			if (angular.isUndefined(results[record])) {
                				results[record] = [];
                			}
                			results[record].push(parseFloat(result[record][Object.keys(result[record])[0]].replace(/[^0-9.,]/g,'')));
                			
                		}
                		else {
                			if (record == 'timestamp')
                				x.push(new Date(parseFloat(result[record].N) * 1000));
                		}
                		
                	})
                });
                
                $scope.data = []
                angular.forEach(results, function(value, name) {
                	$scope.data.push({x:x, y:value, name:name, type:'lineChart'});
                    var res = TestFactory.skewnessArray(value);
                });

            }
            else {
            	if (response.data) {
	                $scope.results = response.data;
            	}   
            }
        }).catch(function(error) {
            toastr.error(error.data);
        });
    }
    

    activate();
});
