angular
    .module('CustomerPortal')
    .factory('RosterFactory', function RosterFactory($http, SERVER_URL) {

    function getRoster(id) {
        return $http.get(SERVER_URL + "rosters/" + id + '/') ;
    }

    function getRosters(params) {
        return $http.get(SERVER_URL + "rosters/", {params: params});
    }

    function createRoster(data) {
        return $http.post(SERVER_URL + "rosters/", data);
    }

    function updateRoster(id, data) {
        return $http.patch(SERVER_URL + "rosters/" + id + '/', data);
    }

    function deleteRoster(id) {
        return $http.delete(SERVER_URL + "rosters/" + id + '/');
    }

    return {
        getRoster: getRoster,
        getRosters: getRosters,
        createRoster: createRoster,
        updateRoster: updateRoster,
        deleteRoster: deleteRoster
    }
});
