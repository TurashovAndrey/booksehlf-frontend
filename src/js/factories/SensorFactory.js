angular
    .module('CustomerPortal')
    .factory('SensorFactory', function SensorFactory($http, SERVER_URL) {

    function getSensor(id) {
        return $http.get(SERVER_URL + "/sensors/" + id + '/');
    }

    function getSensors(params) {
        return $http.get(SERVER_URL + "sensors/", {params: params});
    }

    function createSensor(data) {
        return $http.post(SERVER_URL + "sensors/", data);
    }

    function updateSensor(id, data) {
        return $http.patch(SERVER_URL + "sensors/" + id + '/', data);
    }

    function deleteSensor(id) {
        return $http.delete(SERVER_URL + "sensors/" + id + '/');
    }

    function getSensorParameters(id) {
        return $http.get(SERVER_URL + "/sensor_parameters/" + id + '/');
    }

    return {
        getSensor: getSensor,
        getSensorParameters: getSensorParameters,
        getSensors: getSensors,
        createSensor: createSensor,
        updateSensor: updateSensor,
        deleteSensor: deleteSensor
    }
});
