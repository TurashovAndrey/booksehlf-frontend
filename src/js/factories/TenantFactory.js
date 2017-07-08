angular
    .module('CustomerPortal')
    .factory('TenantFactory', function TenantFactory($http, SERVER_URL) {

    function getTenant(id) {
        return $http.get(SERVER_URL + "tenants/" + id + '/');
    }

    function getTenants(params) {
        return $http.get(SERVER_URL + "tenants/", {params: params});
    }

    function createTenant(data) {
        return $http.post(SERVER_URL + "tenants/", data);
    }

    function updateTenant(id, data) {
        return $http.patch(SERVER_URL + "tenants/" + id + '/', data);
    }

    function deleteTenant(id) {
        return $http.delete(SERVER_URL + "tenants/" + id + '/');
    }

    function getCount() {
        return $http.get(SERVER_URL + "tenants/count/");
    }
    
    function getTenantUser(params) {
    	return $http.get(SERVER_URL + "tenant_users/", {params: params});
    }

    function createTenantUser(data) {
    	return $http.post(SERVER_URL + "tenant_users/", data);
    }

    function updateTenantUser(id, data) {
        return $http.patch(SERVER_URL + "tenant_users/" + id + '/', data);
    }

    function deleteTenantUser(id) {
        return $http.delete(SERVER_URL + "tenant_users/" + id + '/');
    }
    

    return {
        getTenant: getTenant,
        getTenants: getTenants,
        createTenant: createTenant,
        updateTenant: updateTenant,
        deleteTenant: deleteTenant,
        getCount: getCount,
        getTenantUser: getTenantUser,
        createTenantUser: createTenantUser,
        updateTenantUser: updateTenantUser,
        deleteTenantUser: deleteTenantUser
    }
});
