angular
    .module('CustomerPortal')
    .factory('ContactFactory', function ContactFactory($http, SERVER_URL) {

    function getContact(id) {
        return $http.get(SERVER_URL + "contacts/" + id + '/');
    }

    function getContacts(params) {
        return $http.get(SERVER_URL + "contacts/", {params: params} );
    }

    function createContact(data) {
        return $http.post(SERVER_URL + "contacts/", data);
    }

    function updateContact(id, data) {
        return $http.patch(SERVER_URL + "contacts/" + id + '/', data);
    }

    function deleteContact(id) {
        return $http.delete(SERVER_URL + "contacts/" + id + '/');
    }

    return {
        getContact: getContact,
        getContacts: getContacts,
        createContact: createContact,
        updateContact: updateContact,
        deleteContact: deleteContact
    }
});
