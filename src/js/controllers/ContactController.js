angular
    .module('CustomerPortal')
    .controller('ContactController', function ContactController($scope, ContactFactory, toastr, _view_mode, _contact, COUNTRIES, $state) {
    function activate() {
        ContactFactory.getContacts().then(function(response) {
            $scope.contacts = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });

        $scope.contact = _contact == null ? {} : angular.copy(_contact.data);

        $scope.countries = angular.copy(COUNTRIES);
        $scope.view_mode = _view_mode;
    }

    $scope.addContact = function() {
        $state.transitionTo("create_contact");
    };

    $scope.editContact = function(id) {
        $state.transitionTo("edit_contact", {"id": id});
    };

    $scope.createContact = function() {
        var valid = true;
        if (!$scope.contact.name) {
            toastr.error('Name field is required')
            valid = false;
        }
        if (!$scope.contact.country) {
            $scope.contact.country = null;
        }

        if (valid) {
            ContactFactory.createContact($scope.contact).then(function (response) {
                $state.transitionTo("contacts");
            }).catch(function (error) {
                toastr.error(error.data);
            });
        }
    };

    $scope.updateContact = function() {
        if ($scope.contact.avatar_info)
            $scope.contact.avatar = "data:image/jpg;base64,"  + $scope.contact.avatar_info.base64;
        ContactFactory.updateContact($scope.contact.id, $scope.contact).then(function(response){
            $state.transitionTo("contacts");
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.clearContact = function() {
        $scope.contact = _contact == null ? {} : _contact.data;
    };

    $scope.cancelContact = function() {
        $state.transitionTo("contacts");
    };

    $scope.delete = function(id) {
        ContactFactory.deleteContact(id).then(function(response) {
           activate();
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.view = function(id) {
        $state.transitionTo("view_contact", {"id": id});
    };

    $scope.edit = function(id) {
        $state.transitionTo("edit_contact", {"id": id});
    };

    $scope.sort = function(sortField) {
      var params = {ordering: sortField};

      $scope.sortField = sortField;
      ContactFactory.getContacts(params).then(function(response) {
            $scope.contacts = response.data
      }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.search = function() {
        $scope.sortField = null;
        var params = {search: $scope.searchField}
        ContactFactory.getContacts(params).then(function(response) {
            $scope.contacts = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    activate();
});
