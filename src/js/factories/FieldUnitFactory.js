angular
    .module('CustomerPortal')
    .factory('FieldUnitFactory', function FieldUnitFactory($http, SERVER_URL) {

        function getFieldUnit(id) {
            return $http.get(SERVER_URL + "/field_units/" + id + '/');
        }

        function getFieldUnits(params) {
            return $http.get(SERVER_URL + "field_units/", {params: params});
        }

        function createFieldUnit(data) {
            return $http.post(SERVER_URL + "field_units/", data);
        }

        function updateFieldUnit(id, data) {
            return $http.patch(SERVER_URL + "field_units/" + id + '/', data);
        }

        function updateFieldUnitVersion(MAC_address) {
            return $http.post(SERVER_URL + "field_unit_updaters/update_versions/", {mac_address: MAC_address});
        }

        function deleteFieldUnit(id) {
            return $http.delete(SERVER_URL + "field_units/" + id + '/');
        }

        return {
            getFieldUnit: getFieldUnit,
            getFieldUnits: getFieldUnits,
            createFieldUnit: createFieldUnit,
            updateFieldUnit: updateFieldUnit,
            deleteFieldUnit: deleteFieldUnit,
            updateFieldUnitVersion: updateFieldUnitVersion
        }
    })
    .factory('FieldUnitUpdaterFactory', function FieldUnitFactory($http, SERVER_URL) {

        function updateFieldUnitUpdater(id, data) {
            return $http.patch(SERVER_URL + "field_unit_updaters/" + id + '/', data);
        }

        return {
            updateFieldUnitUpdater: updateFieldUnitUpdater
        }
    });

