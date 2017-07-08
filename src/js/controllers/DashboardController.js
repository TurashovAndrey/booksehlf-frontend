angular
    .module('CustomerPortal')
    .controller('DashboardController', function DashboardController($scope, TenantFactory, toastr) {
    function activate() {
        TenantFactory.getCount().then(function(response) {
           $scope.tenants = response.data.tenants;
           $scope.companies = response.data.companies;
           $scope.fieldUnits = response.data.field_units;
           $scope.sites = response.data.sites;
           $scope.targets = response.data.targets;
           $scope.sensors = response.data.sensors;
           $scope.tests_recurring = response.data.tests_recurring;
           $scope.tests_diagnostic = response.data.tests_diagnostic;
        }).catch(function(error) {
            toastr.error(error.data);
        });
    }

    activate();
});
