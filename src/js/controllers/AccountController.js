angular
    .module('CustomerPortal')
    .controller('AccountController', function AccountController($scope, $rootScope, AuthFactory, $localStorage, toastr) {
    function activate() {
        AuthFactory.getUserSettings().then(function(response) {
            $scope.userSettings = $localStorage.userSettings;
            if (!$scope.userSettings) {
                $scope.userSettings = {two_factor_auth: false, two_factor_method: 2};
            }
        }).catch(function(error) {
            toastr.error(error.data);
        });
        $scope.user = $localStorage.user
    };

    $scope.updateUser = function() {
        AuthFactory.updateUser($scope.user.id, $scope.user).then(function(response) {
            $localStorage.user = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });

        $scope.userSettings.user = $scope.user.id;
        if ($scope.userSettings.avatar_info) {
            $scope.userSettings.avatar = "data:image/jpg;base64," + $scope.userSettings.avatar_info.base64;
        }
        else {
            delete $scope.userSettings.avatar;
        }

        if (!$scope.userSettings.id) {
            AuthFactory.insertUserSettings($scope.userSettings).then(function(response) {
                $scope.userSettings = response.data;

                if ($scope.userSettings.two_factor_auth) {
                    if ($scope.userSettings.two_factor_method == null) {
                        $scope.userSettings.two_factor_method = 0;
                    }

                    AuthFactory.getDevices($scope.userSettings.two_factor_method).then(function(response) {
                        $localStorage.devices = response.data;
                        if (!$localStorage.devices.length) {
                            AuthFactory.addDevice($scope.userSettings.two_factor_method);
                        }
                    });
                }
            }).catch(function(error) {
            toastr.error(error.data);
        });

        }
        else {
            AuthFactory.updateUserSettings($scope.userSettings.id, $scope.userSettings).then(function(response) {
                if ($scope.userSettings.two_factor_auth) {
                    AuthFactory.getDevices($scope.userSettings.two_factor_method).then(function(response) {
                        $localStorage.devices = response.data;
                        if (!$localStorage.devices.length) {
                            AuthFactory.addDevice($scope.userSettings.two_factor_method);
                        }
                    });
                }
            }).catch(function(error) {
                toastr.error(error.data);
            });
        }
    };

    activate();
});
