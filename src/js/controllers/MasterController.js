/**
 * Master Controller
 */

angular.module('CustomerPortal')
    .controller('MasterCtrl', ['$scope', '$cookieStore', 'AuthFactory', '$state', '$localStorage', MasterCtrl]);

function MasterCtrl($scope, $cookieStore, AuthFactory, $state, $localStorage) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
    $scope.showChild = false;
    $scope.showChildMeasure = false;
    $scope.showChildDiagnose = false;
    $scope.showChildLoadTest = false;
    $scope.showChildAnalyze = false;
    $scope.user = $localStorage.user;
    $scope.userSettings = $localStorage.userSettings;

    $scope.getWidth = function() {
        return window.innerWidth;
    };

    $scope.$watch($scope.getWidth, function(newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = ! $cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.logout = function() {
       $localStorage.$reset();
       AuthFactory.logout().then(function() {
           $state.transitionTo("login");
       });
    };

    $scope.showChildNodes = function() {
        $scope.showChildMeasure = false;
        $scope.showChildDiagnose = false;
        $scope.showChildLoadTest = false;
        $scope.showChildAnalyze = false;
        $scope.showChild = !$scope.showChild;
    };

    $scope.showChildNodesMeasure = function() {
        $scope.showChild = false;
        $scope.showChildDiagnose = false;
        $scope.showChildLoadTest = false;
        $scope.showChildAnalyze = false;
        $scope.showChildMeasure = !$scope.showChildMeasure;
    };

    $scope.showChildNodesDiagnose = function() {
        $scope.showChild = false;
        $scope.showChildMeasure = false;
        $scope.showChildLoadTest = false;
        $scope.showChildAnalyze = false
        $scope.showChildDiagnose = !$scope.showChildDiagnose;
    };

    $scope.showChildNodesLoadTest = function() {
        $scope.showChild = false;
        $scope.showChildMeasure = false;
        $scope.showChildDiagnose = false;
        $scope.showChildAnalyze = false;
        $scope.showChildLoadTest = !$scope.showChildLoadTest;
    };

    $scope.showChildNodesAnalyze = function() {
        $scope.showChild = false;
        $scope.showChildMeasure = false;
        $scope.showChildDiagnose = false;
        $scope.showChildLoadTest = false;
        $scope.showChildAnalyze = !$scope.showChildAnalyze;
    };

    $scope.toggleSidebar = function() {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function() {
        $scope.$apply();
    };
}