angular
    .module('CustomerPortal')
    .controller('TenantController', function TenantController($scope, $state, COUNTRIES, TenantFactory,
                                                              ContactFactory, _tenant, _view_mode, toastr, $localStorage) {
    function activate() {
    	$scope.limit = 10;
    	$scope.currentPage = 1;
    	$scope.getTenants();

        $scope.user = $localStorage.user;	
        $scope.tenant = _tenant == null ? {} : angular.copy(_tenant.data);
        $scope.countries = angular.copy(COUNTRIES);
        $scope.view_mode = _view_mode;
        $scope.showAddressInfo = false;
        ContactFactory.getContacts().then(function(response) {
           $scope.contacts = response.data;
        }).catch(function(error) {
            toastr.error(error.data);
        });
        $scope.map = { center: { latitude: 50.46, longitude: 30.44 }, zoom: 8 };
    }

    $scope.addTenant = function() {
        $state.transitionTo("create_tenant");
    };

    $scope.editTenant = function(id) {
        $state.transitionTo("edit_tenant", {"id": id});
    };

    $scope.getTenants = function() {
        TenantFactory.getTenants({"limit": $scope.limit, "offset": ($scope.currentPage - 1) * $scope.limit}).then(function(response) {
        	$scope.total = response.data.count;
            $scope.tenants = response.data.results
        });
    }
    
    $scope.createTenant = function() {
        var valid = true;
        if (!$scope.tenant.name) {
            toastr.error('Name field is required')
            valid = false;
        }
        if (!$scope.tenant.country) {
            $scope.tenant.country = null;
        }

        if ($scope.tenant.url) {
            $scope.tenant.url = ($scope.tenant.url.indexOf('www') === -1) ? 'www.' + $scope.tenant.url : $scope.tenant.url;
            $scope.tenant.url = ($scope.tenant.url.indexOf('://') === -1) ? 'http://' + $scope.tenant.url : $scope.tenant.url;
        }

        if (valid) {
            TenantFactory.createTenant($scope.tenant).then(function (response) {
                $state.transitionTo("tenants");
            }).catch(function (error) {
                toastr.error(error.data)
            });
        }
    };

    $scope.updateTenant = function() {
        if ($scope.tenant.logo_info) {
            $scope.tenant.logo = "data:image/jpg;base64," + $scope.tenant.logo_info.base64;
        }
        else {
            delete $scope.tenant.logo
        }

        if ($scope.tenant.url) {
            $scope.tenant.url = ($scope.tenant.url.indexOf('www') === -1) ? 'www.' + $scope.tenant.url : $scope.tenant.url;
            $scope.tenant.url = ($scope.tenant.url.indexOf('://') === -1) ? 'http://' + $scope.tenant.url : $scope.tenant.url;
        }

        TenantFactory.updateTenant($scope.tenant.id, $scope.tenant).then(function(response){
            $state.transitionTo("tenants");
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.clearTenant = function() {
        $scope.tenant = _tenant == null ? {} : _tenant.data;
    };

    $scope.cancelTenant = function() {
        $state.transitionTo("tenants");
    };

    $scope.delete = function(id) {
        TenantFactory.deleteTenant(id).then(function(response) {
           activate();
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.view = function(id) {
        $state.transitionTo("view_tenant", {"id": id});
    };

    $scope.edit = function(id) {
        $state.transitionTo("edit_tenant", {"id": id});
    };

    $scope.sort = function(sortField) {
      var params = {ordering: sortField};

      $scope.sortField = sortField;
      TenantFactory.getTenants(params).then(function(response) {
            $scope.tenants = response.data
      }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.search = function() {
        $scope.sortField = null;
        var params = {search: $scope.searchField}
        TenantFactory.getTenants(params).then(function(response) {
            $scope.tenants = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.toggleAddressInfo = function() {
      $scope.showAddressInfo = !$scope.showAddressInfo;
    };

    activate();
});
