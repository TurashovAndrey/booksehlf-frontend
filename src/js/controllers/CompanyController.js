angular
    .module('CustomerPortal')
    .controller('CompanyController', function CompanyController($scope, $state, CompanyFactory, ContactFactory, TenantFactory,
                                                                COUNTRIES, _company, _view_mode, SERVER_URL, toastr, $localStorage) {
    function activate() {
    	$scope.limit = 10;
    	$scope.currentPage = 1;
    	$scope.getCompanies();
    	
        $scope.company = _company == null ? {} : angular.copy(_company.data);
        $scope.user = $localStorage.user;
        $scope.countries = angular.copy(COUNTRIES);
        $scope.view_mode = _view_mode;
        ContactFactory.getContacts().then(function(response) {
           $scope.contacts = response.data;
        }).catch(function(error) {
            toastr.error(error.data);
        });

        TenantFactory.getTenants().then(function(response) {
           $scope.tenants = response.data;
        }).catch(function(error) {
            toastr.error(error.data);
        });

    }
    
    $scope.getCompanies = function() {
        CompanyFactory.getCompanies({"limit": $scope.limit, "offset": ($scope.currentPage - 1) * $scope.limit}).then(function(response) {
        	$scope.total = response.data.count;
            $scope.companies = response.data.results
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.addCompany = function() {
        $state.transitionTo("create_company");
    };

    $scope.editCompany = function(id) {
        $state.transitionTo("edit_company", {"id": id});
    };

    $scope.createCompany = function() {
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

    $scope.updateCompany = function() {

        if ($scope.company.logo_info) {
            $scope.company.logo = "data:image/jpg;base64," + $scope.company.logo_info.base64;
        }
        else {
            delete $scope.company.logo
        }
        CompanyFactory.updateCompany($scope.company.id, $scope.company).then(function(response){
            $state.transitionTo("companies");
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.clearCompany = function() {
        $scope.company = _company == null ? {} : _company.data;
    };

    $scope.cancelCompany = function() {
        $state.transitionTo("companies");
    };

    $scope.delete = function(id) {
        CompanyFactory.deleteCompany(id).then(function(response) {
           activate();
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.view = function(id) {
        $state.transitionTo("view_company", {"id": id});
    };

    $scope.edit = function(id) {
        $state.transitionTo("edit_company", {"id": id});
    };

    $scope.sort = function(sortField) {
      var params = {ordering: sortField};

      $scope.sortField = sortField;
      CompanyFactory.getCompanies(params).then(function(response) {
            $scope.companies = response.data
      }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.search = function() {
        $scope.sortField = null;
        var params = {search: $scope.searchField}
        CompanyFactory.getCompanies(params).then(function(response) {
            $scope.companies = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    
    activate();
});
