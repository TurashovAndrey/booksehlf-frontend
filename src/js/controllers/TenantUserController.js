angular
    .module('CustomerPortal')
    .controller('TenantUserController', function TenantUserController($scope, $state, TenantFactory, AuthFactory, _tenant, toastr) {
    function activate() {
        $scope.tenant = _tenant == null ? {} : angular.copy(_tenant.data);
        $scope.tenantUser = null;
        $scope.addUserMode = false;
        TenantFactory.getTenantUser({search: $scope.tenant.id}).then(function(response) {
        	$scope.tenantUsers = response.data;
        });	
        
        AuthFactory.getUsers().then(function(response){
        	$scope.users = response.data;
        });
    }

    $scope.createTenantUser = function() {
        var valid = true;
        if (!$scope.company.name) {
            toastr.error('Name field is required')
            valid = false;
        }
        if (!$scope.company.tenant) {
            toastr.error('Tenant field is required')
            valid = false;
        }
        if (!$scope.company.country) {
            $scope.company.country = null;
        }

        if (valid) {
            CompanyFactory.createCompany($scope.company).then(function (response) {
                $state.transitionTo("companies");
            }).catch(function (error) {
                toastr.error(error.data);
            });
        }
    };

    $scope.updateTenantUser = function(data) {
        TenantFactory.updateTenantUser($scope.tenant.id, data).then(function(response){
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    
    $scope.addTenantUser = function() {
    	$scope.addUserMode = true;
    };
    
    $scope.changeIsAdmin = function(isAdmin) {
    	$scope.tenantUser.isAdmin = isAdmin;
    };

    $scope.changeUser = function(user) {
    	$scope.tenantUser.user = user;
    };
    
    $scope.saveTenantUser = function() {
    	TenantFactory.createTenantUser({
    		tenant: $scope.tenant.id,
    		user: $scope.tenantUser.user,
    		is_admin: $scope.tenantUser.isAdmin
    	}).then(function() {
    		activate();
    	});
    };
    
    $scope.delete = function(id) {
        TenantFactory.deleteTenantUser(id).then(function(response) {
           activate();
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    activate();
});