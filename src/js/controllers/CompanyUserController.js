angular
    .module('CustomerPortal')
    .controller('CompanyUserController', function CompanyUserController($scope, $state, CompanyFactory, AuthFactory, _company, toastr) {
    function activate() {
        $scope.company = _company == null ? {} : angular.copy(_company.data);
        $scope.companyUser = null;
        $scope.addUserMode = false;
        CompanyFactory.getCompanyUser({search: $scope.company.id}).then(function(response) {
        	$scope.companyUsers = response.data;
        });	
        
        AuthFactory.getUsers().then(function(response){
        	$scope.users = response.data;
        });
    }

    $scope.createCompanyUser = function() {
        var valid = true;
        if (!$scope.company.name) {
            toastr.error('Name field is required')
            valid = false;
        }
        if (!$scope.company.company) {
            toastr.error('Company field is required')
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

    $scope.updateCompanyUser = function(data) {
        CompanyFactory.updateCompanyUser($scope.company.id, data).then(function(response){
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    
    $scope.addCompanyUser = function() {
    	$scope.addUserMode = true;
    };
    
    $scope.changeIsAdmin = function(isAdmin) {
    	$scope.companyUser.isAdmin = isAdmin;
    };

    $scope.changeUser = function(user) {
    	$scope.companyUser.user = user;
    };
    
    $scope.saveCompanyUser = function() {
    	CompanyFactory.createCompanyUser({
    		company: $scope.company.id,
    		user: $scope.companyUser.user,
    		is_admin: $scope.companyUser.isAdmin
    	}).then(function() {
    		activate();
    	});
    };
    
    $scope.delete = function(id) {
        CompanyFactory.deleteCompanyUser(id).then(function(response) {
           activate();
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    activate();
});