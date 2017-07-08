angular
    .module('CustomerPortal')
    .controller('SiteController', function SiteController($scope, $state, SiteFactory, ContactFactory, TenantFactory,
                                                                COUNTRIES, _site, _view_mode, CompanyFactory, toastr) {
    function activate() {
    	$scope.limit = 10;
    	$scope.currentPage = 1;

    	$scope.getSites();
    	
    	$scope.site = _site == null ? {} : angular.copy(_site.data);
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

    $scope.getSites = function() {
        SiteFactory.getSites({"limit": $scope.limit, "offset": ($scope.currentPage - 1) * $scope.limit}).then(function(response) {
        	$scope.total = response.data.count;
            $scope.sites = response.data.results
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    
    $scope.addSite = function() {
        $state.transitionTo("create_site");
    };

    $scope.editSite = function(id) {
        $state.transitionTo("edit_site", {"id": id});
    };

    $scope.createSite = function() {
        var valid = true;
        if (!$scope.site.name) {
            toastr.error('Name field is required')
            valid = false;
        }
        if (!$scope.site.company) {
            toastr.error('Company field is required')
            valid = false;
        }
        if (!$scope.site.country) {
            $scope.site.country = null;
        }
        if (valid) {
            SiteFactory.createSite($scope.site).then(function (response) {
                $state.transitionTo("sites");
            }).catch(function (error) {
                toastr.error(error.data);
            });
        }
    };

    $scope.updateSite = function() {
        if ($scope.site.picture_info) {
            $scope.site.picture = "data:image/jpg;base64," + $scope.site.picture_info.base64
        }
        else {
            delete $scope.site.picture;
        }

        SiteFactory.updateSite($scope.site.id, $scope.site).then(function(response){
            $state.transitionTo("sites");
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.clearSite = function() {
        $scope.site = _site == null ? {} : _site.data;
    };

    $scope.cancelSite = function() {
        $state.transitionTo("sites");
    };

    $scope.delete = function(id) {
        SiteFactory.deleteSite(id).then(function(response) {
           activate();
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.view = function(id) {
        $state.transitionTo("view_site", {"id": id});
    };

    $scope.edit = function(id) {
        $state.transitionTo("edit_site", {"id": id});
    };

    $scope.sort = function(sortField) {
      var params = {ordering: sortField};

      $scope.sortField = sortField;
      SiteFactory.getSites(params).then(function(response) {
            $scope.sites = response.data
      }).catch(function(error) {
            toastr.error(error.data);
      });
    };

    $scope.search = function() {
        $scope.sortField = null;
        var params = {search: $scope.searchField}
        SiteFactory.getSites(params).then(function(response) {
            $scope.sites = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };
    
    activate();
});
