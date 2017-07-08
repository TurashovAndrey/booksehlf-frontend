angular
    .module('CustomerPortal')
    .factory('TargetFactory', function TargetFactory($http, SERVER_URL) {

    function getTarget(id) {
        return $http.get(SERVER_URL + "targets/" + id + '/');
    }

    function getTargets(params) {
        return $http.get(SERVER_URL + "targets/", {params: params});
    }

    function createTarget(data) {
        return $http.post(SERVER_URL + "targets/", data);
    }

    function updateTarget(id, data) {
        return $http.patch(SERVER_URL + "targets/" + id + '/', data);
    }

    function deleteTarget(id) {
        return $http.delete(SERVER_URL + "targets/" + id + '/');
    }

    return {
        getTarget: getTarget,
        getTargets: getTargets,
        createTarget: createTarget,
        updateTarget: updateTarget,
        deleteTarget: deleteTarget
    }
});
