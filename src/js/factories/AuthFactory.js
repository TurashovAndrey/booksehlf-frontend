angular
    .module('CustomerPortal')
    .factory('AuthFactory', function SiteFactory($http, $rootScope, $localStorage, SERVER_URL) {

        if ($localStorage.token) {
            $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.token;
        }

    function login(data) {
        return $http.post(SERVER_URL + "users/login/", data).then(function(response) {
            $rootScope.user = response.data.user;
            $localStorage.user = $rootScope.user;
            $localStorage.token = response.data.key;
        });
    };

    function register(data) {
        return $http.post(SERVER_URL + "users/register/", data);
    };

    function isAuthenticated() {
        var isAuthenticated = !!$localStorage.token;
        var isVerified = true;
        if ($localStorage.userSettings &&
            $localStorage.userSettings.two_factor_auth &&
            !$localStorage.isVerified) {
            isVerified = false;
        }
        return isAuthenticated && isVerified;
    };

    function logout() {
        return $http.post(SERVER_URL + 'users/logout/').finally(function() {
            $rootScope.user = null;
            $localStorage.token = null;
        });
    };

    function getUsers() {
    	return $http.get(SERVER_URL + "/users/");
    };
    
    function getUserSettings() {
        if ($localStorage.token) {
            $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.token;
        }

        return $http.get(SERVER_URL + "user_settings/").then(function(response) {
            $localStorage.userSettings = response.data;
        });
    };

    function updateUserSettings(id, data) {
        if ($localStorage.token) {
            $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.token;
        }

        return $http.patch(SERVER_URL + "user_settings/" + id + '/' , data);
    };

    function insertUserSettings(data) {
        return $http.post(SERVER_URL + "user_settings/", data);
    };

    function updateUser(id, data) {
        return $http.patch(SERVER_URL + "users/" + id + '/', data);
    };

    function addEmailDevice() {
        return $http.post(SERVER_URL + "email_device/", {"name": "EmailDevice"});
    };

    function addStaticDevice() {
        return $http.post(SERVER_URL + "static_device/", {"name": "StaticDevice"});
    };

    function addHOTPDevice() {
        return $http.post(SERVER_URL + "hotp_device/", {"name": "HOTPDevice"});
    };

    function addTOTPDevice() {
        return $http.post(SERVER_URL + "totp_device/", {"name": "TOTPDevice"});
    };

    function getVerificationToken(data) {
        return $http.post(SERVER_URL + "users/get_challenge/", data);
    };

    function sendVerificationToken(device_id, otpToken) {
        return $http.post(SERVER_URL + "users/verify/", {device_id: device_id,
                                                         otp_token: otpToken,
                                                         type: $localStorage.userSettings.two_factor_method});
    };

    function getEmailDevices() {
        if ($localStorage.token) {
            $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.token;
        }
        return $http.get(SERVER_URL + "email_device/");
    };

    function getStaticDevices() {
        if ($localStorage.token) {
            $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.token;
        }
        return $http.get(SERVER_URL + "static_device/");
    };

    function getHOTPDevices() {
        if ($localStorage.token) {
            $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.token;
        }
        return $http.get(SERVER_URL + "hotp_device/");
    };

    function getTOTPDevices() {
        if ($localStorage.token) {
            $http.defaults.headers.common.Authorization = 'Token ' + $localStorage.token;
        }
        return $http.get(SERVER_URL + "totp_device/");
    };

    function getDevices(type) {
        switch (type) {
            case 0: return getEmailDevices();
            case 1: return getStaticDevices();
            case 2: return getHOTPDevices();
            case 3: return getTOTPDevices();
        }
    };

    function addDevice(type) {
        switch (type) {
            case 0: return addEmailDevice();
            case 1: return addStaticDevice();
            case 2: return addHOTPDevice();
            case 3: return addTOTPDevice();
        }
    };

    return {
        login: login,
        logout: logout,
        register: register,
        isAuthenticated: isAuthenticated,
        getUserSettings: getUserSettings,
        insertUserSettings: insertUserSettings,
        updateUserSettings: updateUserSettings,
        updateUser: updateUser,
        addDevice: addDevice,
        getVerificationToken: getVerificationToken,
        sendVerificationToken: sendVerificationToken,
        getDevices: getDevices,
        getUsers: getUsers	
    }
});
