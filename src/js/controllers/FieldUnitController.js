angular
    .module('CustomerPortal')
    .controller('FieldUnitController', function FieldUnitController($scope, $state, FieldUnitFactory, FieldUnitUpdaterFactory, COUNTRIES, _fieldUnit,
                                                                    _view_mode, CompanyFactory, ContactFactory, toastr) {
    function activate() {
   	
    	$scope.limit = 10;
    	$scope.currentPage = 1;

    	$scope.getFieldUnits();
    	
        $scope.fieldUnit = _fieldUnit == null ? {} : angular.copy(_fieldUnit.data);
        $scope.countries = angular.copy(COUNTRIES);
        $scope.view_mode = _view_mode;
        ContactFactory.getContacts().then(function(response) {
           $scope.contacts = response.data;
        }).catch(function(error) {
            toastr.error(error.data);
        });
        CompanyFactory.getCompanies().then(function(response) {
           $scope.companies = response.data;
        }).catch(function(error) {
            toastr.error(error.data);
        });

    }
    
    $scope.getFieldUnits = function() {
        FieldUnitFactory.getFieldUnits({"limit": $scope.limit, "offset": ($scope.currentPage - 1) * $scope.limit}).then(function(response) {
        	$scope.total = response.data.count;
        	$scope.fieldUnits = response.data.results
        	angular.forEach($scope.fieldUnits, function(fieldUnit) {
        		var activeDate = new Date(fieldUnit.last_active);
        		activeDate.setSeconds(activeDate.getSeconds() + 3 * fieldUnit.heartbeat_interval);
        		fieldUnit.active = new Date() < activeDate; 
        	})
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    

    $scope.addFieldUnit = function() {
        $state.transitionTo("create_field_unit");
    };

    $scope.editFieldUnit = function(id) {
        $state.transitionTo("edit_field_unit", {"id": id});
    };

    $scope.createFieldUnit = function() {
        var valid = true;
        if (!$scope.fieldUnit.hostname) {
            toastr.error('Hostname field is required');
            valid = false;
        }
        if (!$scope.fieldUnit.company) {
            toastr.error('Company field is required');
            valid = false;
        }

        if (valid) {
            FieldUnitFactory.createFieldUnit($scope.fieldUnit).then(function (response) {
                $state.transitionTo("field_units");
            }).catch(function (error) {
                toastr.error(error.data);
            });
        }
    };

    $scope.updateFieldUnit = function() {
        FieldUnitFactory.updateFieldUnit($scope.fieldUnit.id, $scope.fieldUnit).then(function(response){
            FieldUnitUpdaterFactory.updateFieldUnitUpdater($scope.fieldUnit.field_unit_updater_info.id, $scope.fieldUnit.field_unit_updater_info).then(function(response){
                $state.transitionTo("field_units");
            });
        });
    };

    $scope.clearFieldUnit = function() {
        $scope.FieldUnit = _fieldUnit == null ? {} : _fieldUnit.data;
    };

    $scope.cancelFieldUnit = function() {
        $state.transitionTo("field_units");
    };

    $scope.delete = function(id) {
        FieldUnitFactory.deleteFieldUnit(id).then(function(response) {
           activate();
        });
    };

    $scope.view = function(id) {
        $state.transitionTo("view_field_unit", {"id": id});
    };

    $scope.edit = function(id) {
        $state.transitionTo("edit_field_unit", {"id": id});
    };

    $scope.sort = function(sortField) {
      var params = {ordering: sortField, 
    		  	    limit: $scope.limit, 
    		  	    offset: ($scope.currentPage - 1) * $scope.limit};

      $scope.sortField = sortField;
      FieldUnitFactory.getFieldUnits(params).then(function(response) {
	      	$scope.total = response.data.count;
	      	$scope.fieldUnits = response.data.results
	      	angular.forEach($scope.fieldUnits, function(fieldUnit) {
	      		var activeDate = new Date(fieldUnit.last_active);
	      		activeDate.setSeconds(activeDate.getSeconds() + 3 * fieldUnit.heartbeat_interval);
	      		fieldUnit.active = new Date() < activeDate; 
	      	})
      }).catch(function(error) {
            toastr.error(error.data);
      });
    };

    $scope.search = function() {
        $scope.sortField = null;
        var params = {search: $scope.searchField, "limit": $scope.limit, "offset": ($scope.currentPage - 1) * $scope.limit};
        FieldUnitFactory.getFieldUnits(params).then(function(response) {
            $scope.fieldUnits = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.updateFieldUnitVersion = function(fieldUnit) {
        FieldUnitFactory.updateFieldUnitVersion(fieldUnit.MAC_address).then(function(response) {
            toastr.info("Field Unit version was updated successfully");
        }).catch(function(error) {
            toastr.error(error.data);
        }).finally(function() {
            $scope.limit = 10;
    	    $scope.currentPage = 1;
        	$scope.getFieldUnits();

        })

    }

    activate();
});
