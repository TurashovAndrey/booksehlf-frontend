angular
    .module('CustomerPortal')
    .controller('WizardController', function WizardController($scope, $state, TenantFactory, TestFactory, FieldUnitFactory, SensorFactory,
                                                              ContactFactory, CompanyFactory, TargetFactory, toastr, $q, _recurring, $filter) {
    function activate() {
        $q.all([TenantFactory.getTenants(),
                CompanyFactory.getCompanies()
               ]).then(function(results) {
                    $scope.tenants = results[0].data;
                    $scope.companies = results[1].data;
                    FieldUnitFactory.getFieldUnits().then(function (response) {
                        $scope.fieldUnits = response.data
                    })
              }
        )
        $scope.step = 1;
        $scope.checkedAll = false;
        $scope.results = [];
        $scope.recurring = _recurring;
    }

    $scope.changeTenant = function(tenant) {
        CompanyFactory.getCompanies({company__tenant: tenant}).then(function(response) {
            $scope.companies = response.data;
        });
        
        FieldUnitFactory.getFieldUnits({company__tenant: tenant}).then(function (response) {
            $scope.fieldUnits = response.data;
        });
    }
        
    $scope.changeCompany = function(company) {
        FieldUnitFactory.getFieldUnits({company: company}).then(function (response) {
            $scope.fieldUnits = response.data;
        });
    }    

    $scope.search = function() {
        $scope.sortField = null;
        var params = {search: $scope.searchField}
        FieldUnitFactory.getFieldUnits(params).then(function(response) {
            $scope.fieldUnits = response.data
        }).catch(function(error) {
            toastr.error(error.data);
        });
    };

    $scope.checkFieldUnit = function(fieldUnit) {
        fieldUnit.checked = !fieldUnit.checked;

        $scope.checkedFieldUnits = $scope.fieldUnits.filter(function(fieldUnit) {
            if (fieldUnit.checked) {
                return fieldUnit;
            }
        }).map(function(fieldUnit) {return fieldUnit.id});

        if ($scope.recurring)
	        SensorFactory.getSensors({type: "recurring"}).then(function(response) {
	            $scope.sensors = response.data
	        });
        else
	        SensorFactory.getSensors({type: "onetime"}).then(function(response) {
	            $scope.sensors = response.data
	        });
        	
    };

    $scope.checkAllFieldUnits = function() {
        $scope.checkedAll = !$scope.checkedAll;
        angular.forEach($scope.fieldUnits, function(fieldUnit) {
            fieldUnit.checked = $scope.checkedAll;
        });
    };
    
    $scope.setStep = function(step) {
        $scope.step = step
    };

    $scope.checkTarget = function(target) {
        angular.forEach($scope.targets, function(target) {
             target.checked = false;
        });

        target.checked = !target.checked;
    };

    $scope.checkSensor = function(sensor) {
      angular.forEach($scope.sensors, function(sensor) {
            sensor.checked = false;
      });
      sensor.checked = !sensor.checked;
    };

    $scope.previousStep = function() {
    	if ($scope.results)
    		$scope.results = [];

        if ($scope.step == 5) {
            var sensors = $scope.sensors.filter(function (sensor) {
                if (sensor.checked) {
                    return sensor;
                }
            });

            if (sensors[0].parameters && sensors[0].parameters.options && Object.keys(sensors[0].parameters.options).length == 0) {
                $scope.step -= 1;
            }
        }


        if ($scope.step == 4) {
            var sensors = $scope.sensors.filter(function (sensor) {
                if (sensor.checked) {
                    return sensor;
                }
            });

            if (!sensors[0].target_mandatory) {
                $scope.step -= 1;
            }
        }
        $scope.step -= 1;
    };

    $scope.nextStep = function() {
        if ($scope.step == 1) {
            var fieldUnits = $scope.fieldUnits.filter(function(fieldUnit) {
                if (fieldUnit.checked) {
                    return fieldUnit.id;
                }
            });
            if (!fieldUnits.length) {
                toastr.error('Please choose at least one fieldUnit')
                return;
            }
        }

        if ($scope.step == 2) {
            var sensors = $scope.sensors.filter(function(sensor) {
                if (sensor.checked) {
                    return sensor.id;
                }
            });
            if (!sensors.length) {
                toastr.error('Please choose at least one sensor');
                return;
            }
        }
         
        if ($scope.step == 3) {
            var targets = $scope.targets.filter(function(target) {
                if (target.checked) {
                    return target.id;
                }
            });
            
            var sensors = $scope.sensors.filter(function(sensor) {
                if (sensor.checked) {
                    return sensor.id;
                }
            });
            
            if (sensors[0].target_mandatory) {
                var targets = $scope.targets.filter(function(target) {
                    if (target.checked) {
                        return target.id;
                    }
                });

                if (!targets.length) {
                    toastr.error('Please choose at least one target');
                    return;
                }
            }
        }

        $scope.step += 1;

        if ($scope.step == 2) {
            var fieldUnits = $scope.fieldUnits.filter(function(fieldUnit) {
                if (fieldUnit.checked) {
                    return fieldUnit;
                }
            }).map(function(fieldUnit) {return fieldUnit.id});

            if (!$scope.sensors || $scope.sensors.length == 0) {
                if ($scope.recurring)
        	        SensorFactory.getSensors({type: "recurring"}).then(function(response) {
        	            $scope.sensors = response.data
        	        });
                else
        	        SensorFactory.getSensors({type: "onetime"}).then(function(response) {
        	            $scope.sensors = response.data
        	        });
            }
        }

        if ($scope.step == 3) {
            var companies = $scope.fieldUnits.filter(function(fieldUnit) {return fieldUnit.checked}).map(function(fieldUnit) {return fieldUnit.company});
            
            if (!$scope.targets || $scope.targets.length == 0) {
                TargetFactory.getTargets({companies: companies.join(',')}).then(function (response) {
                    $scope.targets = response.data
                });
            }

            var sensors = $scope.sensors.filter(function(sensor) {
                if (sensor.checked) {
                    return sensor.id;
                }
            });

            if (!sensors[0].target_mandatory) {
                $scope.step += 1;
            }
        }
        
        if ($scope.step == 4) {
            var sensors = $scope.sensors.filter(function(sensor) {
                if (sensor.checked) {
                    return sensor;
                }
            });

            $scope.parameters = $scope.recurring ? {recurring: true} : {}
            if (sensors[0].parameters && sensors[0].parameters.options && Object.keys(sensors[0].parameters.options).length == 0) {
                $scope.custom_parameters = {};
                $scope.step += 1;
            }
            else {
                $scope.custom_parameters = angular.copy(sensors[0].parameters.options);
                angular.forEach($scope.custom_parameters, function (value, key) {
                    $scope.custom_parameters[key] = value["default_value"];
                });
            }

            if ($scope.recurring) {
                var start = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                var stop = new Date();
                stop.setMinutes(stop.getMinutes() + 10);
                stop = $filter('date')(stop, 'yyyy-MM-dd HH:mm:ss');
                angular.merge($scope.custom_parameters, {start: start, stop: stop, interval: 300});
            }
        }
    };

    $scope.addParameter = function(parameter_name, parameter_value) {
      $scope.custom_parameters[parameter_name] = parameter_value;
    };

    $scope.deleteParameter = function(parameter_name) {
        delete $scope.custom_parameters[parameter_name];
    };

    $scope.setSchedule = function(schedule_start, schedule_end, interval) {
        if (schedule_start) {
            $scope.custom_parameters["start"] = schedule_start;
        }
        if (schedule_end) {
            $scope.custom_parameters["stop"] = schedule_end;
        }
        if (interval) {
            $scope.custom_parameters["interval"] = interval;
        }
    };
        
    $scope.setMode = function(mode) {
        if ($scope.recurring) 
            $scope.custom_parameters["mode"] = "recurring";
        else {
            delete $scope.custom_parameters["mode"];
            delete $scope.custom_parameters["start"];
            delete $scope.custom_parameters["stop"];
            delete $scope.custom_parameters["interval"];
        }
    };
        
    $scope.submit = function() {
        if ($scope.step == 5) {
            var fieldUnits = $scope.fieldUnits.filter(function(fieldUnit) {
                if (fieldUnit.checked) {
                    return fieldUnit;
                }
            }).map(function(fieldUnit) {return fieldUnit.id});
            var sensor = $scope.sensors.filter(function(sensor) {
                if (sensor.checked) {
                    return sensor;
                }
            }).map(function(sensor) {return sensor.id})[0];
            var checkedTargets = $scope.targets.filter(function(target) {
                if (target.checked) {
                    return target;
                }
            })
            
            var target = null;
            if (checkedTargets) 
            	target = checkedTargets.map(function(target) {return target.id})[0];

            var promises = [];
            parameters = angular.copy($scope.parameters);
            angular.merge(parameters, $scope.custom_parameters);

            angular.forEach(fieldUnits, function(fieldUnit) {
                var data = {field_unit: fieldUnit,
                            sensor: sensor,
                            target: target,
                            parameters: parameters}
                var deferred = $q.defer();
                TestFactory.createTest(data).then(function(response) {
                    deferred.resolve(response.data);
                    toastr.info("Test is saved successfully");
                    $scope.results.push(response.data);
                }, function(error) {
                    toastr.error("Test is not saved");
                });
                promises.push(deferred);
            });

            $q.all(promises).then(function() {});
        }
    }
        
    activate();
});
