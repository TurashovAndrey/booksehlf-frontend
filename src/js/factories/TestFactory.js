angular
    .module('CustomerPortal')
    .factory('TestFactory', function TestFactory($http, SERVER_URL) {

    function getTest(id) {
        return $http.get(SERVER_URL + "tests/" + id + "/");
    }

    function getTestResults(id) {
        return $http.get(SERVER_URL + "tests/" + id + '/get_test_results/');
    }

    function getTestResultsXls(id) {
        return $http.get(SERVER_URL + "tests/" + id + '/get_test_results/?xls=true');
    }

    function getTestResultsTsv(id) {
        return $http.get(SERVER_URL + "tests/" + id + '/get_test_results/?tsv=true');
    }
        
    function getTests(params) {
        return $http.get(SERVER_URL + "tests/", {params: params});
    }

    function createTest(data) {
        return $http.post(SERVER_URL + "tests/", data);
    }

    function updateTest(id, data) {
        return $http.patch(SERVER_URL + "tests/" + id + "/", data);
    }

    function deleteTest(id) {
        return $http.delete(SERVER_URL + "tests/" + id + '/');
    }

    function skewness( arr ) {
        if ( !Array.isArray( arr ) ) {
            throw new TypeError( 'skewness()::invalid input argument. Must provide an array.' );
        }
        var len = arr.length,
            delta = 0,
            delta_n = 0,
            term1 = 0,
            N = 0,
            mean = 0,
            M2 = 0,
            M3 = 0,
            g;

        for ( var i = 0; i < len; i++ ) {
            N += 1;

            delta = arr[ i ] - mean;
            delta_n = delta / N;

            term1 = delta * delta_n * (N-1);

            M3 += term1*delta_n*(N-2) - 3*delta_n*M2;
            M2 += term1;
            mean += delta_n;
        }
        // Calculate the population skewness:
        g = Math.sqrt( N )*M3 / Math.pow( M2, 3/2 );

        // Return the corrected sample skewness:
        return Math.sqrt( N*(N-1))*g / (N-2);
    } // end FUNCTION skewness()

    return {
        getTest: getTest,
        getTests: getTests,
        getTestResults: getTestResults,
        getTestResultsXls: getTestResultsXls,
        getTestResultsTsv: getTestResultsTsv,
        createTest: createTest,
        updateTest: updateTest,
        deleteTest: deleteTest,
        skewnessArray: skewness
    }
});
