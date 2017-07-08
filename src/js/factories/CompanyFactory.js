angular
    .module('CustomerPortal')
    .factory('CompanyFactory', function CompanyFactory($http, SERVER_URL) {

    function getCompany(id) {
        return $http.get(SERVER_URL + "companies/" + id + '/');
    }

    function getCompanies(params) {
        return $http.get(SERVER_URL + "companies/", {params: params});
    }

    function createCompany(data) {
        return $http.post(SERVER_URL + "companies/", data);
    }

    function updateCompany(id, data) {
        return $http.patch(SERVER_URL + "companies/" + id + '/', data);
    }

    function deleteCompany(id) {
        return $http.delete(SERVER_URL + "companies/" + id + '/');
    }

    function getCompanyUser(params) {
    	return $http.get(SERVER_URL + "company_users/", params);
    }

    function createCompanyUser(data) {
    	return $http.post(SERVER_URL + "company_users/", data);
    }

    function updateCompanyUser(id, data) {
        return $http.patch(SERVER_URL + "company_users/" + id + '/', data);
    }

    function deleteCompanyUser(id) {
        return $http.delete(SERVER_URL + "company_users/" + id + '/');
    }
    
    return {
        getCompany: getCompany,
        getCompanies: getCompanies,
        createCompany: createCompany,
        updateCompany: updateCompany,
        deleteCompany: deleteCompany,
        getCompanyUser: getCompanyUser,
        createCompanyUser: createCompanyUser,
        updateCompanyUser: updateCompanyUser,
        deleteCompanyUser: deleteCompanyUser
        
    }
});
