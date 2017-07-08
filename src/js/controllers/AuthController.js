angular
    .module('CustomerPortal')
    .controller('AuthController', function AuthController($scope, $state, $localStorage, AuthFactory, toastr) {
    $scope.login = function() {
        var data = {"username" : $scope.username,
                    "password": $scope.password};

        $localStorage.$reset();
        AuthFactory.login(data).then(function(response) {
            $scope.user = $localStorage.user;
            AuthFactory.getUserSettings().then(function(response) {
                $scope.userSettings = $localStorage.userSettings;

                if ($scope.userSettings.two_factor_auth) {
                    AuthFactory.getDevices($scope.userSettings.two_factor_method).then(function(response) {
                       $localStorage.devices = response.data;
                       $state.transitionTo("verification");
                    });
                }
                else {
                    $state.transitionTo("dashboard");
                }
            }).catch(function(error) {
                toastr.error(error.data);
            });
        });
    };

    $scope.register = function(form) {
        $scope.error = null;
        if ($scope.password != $scope.passwordConfirm) {
            $scope.error = 'Password and confirm password are not equal';
        }
        else {
            var data = {
                "username": $scope.username,
                "first_name": $scope.firstName,
                "last_name": $scope.lastName,
                "email": $scope.email,
                "password": $scope.password
            };

            AuthFactory.register(data)
                .then(function(response) {
                    $state.transitionTo("login");
                })
                .catch(function(error) {
                    toastr.error(error.data);
                });
        }
    };

    $scope.getVerificationToken = function() {
        AuthFactory.getDevices($localStorage.userSettings.two_factor_method).then(function(response) {
            var devices = response.data;
            angular.forEach(devices, function (device) {
                AuthFactory.getVerificationToken({"device_id": device.id});
            }).catch(function(error) {
                toastr.error(error.data);
            });
        });
    };

    $scope.sendVerificationToken = function() {
        var devices = $localStorage.devices;
        angular.forEach(devices, function(device) {
            AuthFactory.sendVerificationToken(device.id, $scope.token).then(function(response) {
                $localStorage.isVerified = true;
                $state.transitionTo("dashboard");
            }).catch(function(response) { $localStorage.isVerified = false; });
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

});
