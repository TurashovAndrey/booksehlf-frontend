angular
    .module('CustomerPortal')
    .factory('SiteFactory', function SiteFactory($http, SERVER_URL) {

    function getSite(id) {
        return $http.get(SERVER_URL + "sites/" + id + '/');
    }

    function getSites(params) {
        return $http.get(SERVER_URL + "sites/", {params: params});
    }

    function createSite(data) {
        return $http.post(SERVER_URL + "sites/", data);
    }

    function updateSite(id, data) {
        return $http.patch(SERVER_URL + "sites/" + id + '/', data);
    }

    function deleteSite(id) {
        return $http.delete(SERVER_URL + "sites/" + id + '/');
    }


    return {
        getSite: getSite,
        getSites: getSites,
        createSite: createSite,
        updateSite: updateSite,
        deleteSite: deleteSite
    }
});
