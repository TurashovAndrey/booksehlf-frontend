'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('CustomerPortal').config([ '$stateProvider', '$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {

		// For unmatched routes
		$urlRouterProvider.otherwise('/dashboard');

		// Application routes
		$stateProvider
			.state('common', {
				templateUrl : 'templates/common.html',
				abstract : true
			})
			.state('dashboard', {
				url : "/dashboard",
				templateUrl : 'templates/dashboard.html',
				controller : 'DashboardController',
				parent : 'common',
				authenticate : true
			})
			.state('companies', {
				url : "/companies",
				templateUrl : 'templates/companies.html',
				controller : 'CompanyController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_company : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('company_users', {
				url : "/company_users/{id:\\d+}",
				templateUrl : 'templates/company_users.html',
				controller : 'CompanyUserController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_company : [ '$stateParams', 'CompanyFactory',
						function($stateParams, CompanyFactory) {
							return CompanyFactory.getCompany($stateParams.id);
						}
					]
				}
			})
			.state('create_company', {
				url : "/companies/create",
				templateUrl : 'templates/edit_company.html',
				controller : 'CompanyController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_company : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('edit_company', {
				url : "/companies/{id:\\d+}/edit",
				templateUrl : 'templates/edit_company.html',
				controller : 'CompanyController',
				parent : 'common',
				//authenticate: true,
				resolve : {
					_company : [ '$stateParams', 'CompanyFactory',
						function($stateParams, CompanyFactory) {
							return CompanyFactory.getCompany($stateParams.id);
						}
					],
					_view_mode : function() {
						return false;
					}
				}
			})
			.state('view_company', {
				url : "/companies/{id:\\d+}/view",
				templateUrl : 'templates/edit_company.html',
				controller : 'CompanyController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_company : [ '$stateParams', 'CompanyFactory',
						function($stateParams, CompanyFactory) {
							return CompanyFactory.getCompany($stateParams.id);
						}
					],
					_view_mode : function() {
						return true;
					}
				}
			})
			.state('tenants', {
				url : "/tenants",
				templateUrl : 'templates/tenants.html',
				controller : 'TenantController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_tenant : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('tenant_users', {
				url : "/tenant_users/{id:\\d+}",
				templateUrl : 'templates/tenant_users.html',
				controller : 'TenantUserController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_tenant : [ '$stateParams', 'TenantFactory',
						function($stateParams, TenantFactory) {
							return TenantFactory.getTenant($stateParams.id);
						}
					]
				}
			})
			.state('create_tenant', {
				url : "/tenants/create",
				templateUrl : 'templates/edit_tenant.html',
				controller : 'TenantController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_tenant : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('edit_tenant', {
				url : "/tenants/{id:\\d+}/edit",
				templateUrl : 'templates/edit_tenant.html',
				controller : 'TenantController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_tenant : [ '$stateParams', 'TenantFactory',
						function($stateParams, TenantFactory) {
							return TenantFactory.getTenant($stateParams.id);
						}
					],
					_view_mode : function() {
						return false;
					}
				}
			})
			.state('view_tenant', {
				url : "/tenants/{id:\\d+}/view",
				templateUrl : 'templates/edit_tenant.html',
				controller : 'TenantController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_tenant : [ '$stateParams', 'TenantFactory',
						function($stateParams, TenantFactory) {
							return TenantFactory.getTenant($stateParams.id);
						}
					],
					_view_mode : function() {
						return true;
					}
				}
			})
			.state('sites', {
				url : "/sites",
				templateUrl : 'templates/sites.html',
				controller : 'SiteController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_site : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('create_site', {
				url : "/sites/create",
				templateUrl : 'templates/edit_site.html',
				controller : 'SiteController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_site : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('edit_site', {
				url : "/sites/{id:\\d+}/edit",
				templateUrl : 'templates/edit_site.html',
				controller : 'SiteController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_site : [ '$stateParams', 'SiteFactory',
						function($stateParams, SiteFactory) {
							return SiteFactory.getSite($stateParams.id);
						}
					],
					_view_mode : function() {
						return false;
					}
				}
			})
			.state('view_site', {
				url : "/sites/{id:\\d+}/view",
				templateUrl : 'templates/edit_site.html',
				controller : 'SiteController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_site : [ '$stateParams', 'SiteFactory',
						function($stateParams, SiteFactory) {
							return SiteFactory.getSite($stateParams.id);
						}
					],
					_view_mode : function() {
						return true;
					}
				}
			})
			.state('field_units', {
				url : "/field_units",
				templateUrl : 'templates/field_units.html',
				controller : 'FieldUnitController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_fieldUnit : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('create_field_unit', {
				url : "/field_units/create",
				templateUrl : 'templates/edit_field_unit.html',
				controller : 'FieldUnitController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_fieldUnit : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('edit_field_unit', {
				url : "/field_units/{id:\\d+}/edit",
				templateUrl : 'templates/edit_field_unit.html',
				controller : 'FieldUnitController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_fieldUnit : [ '$stateParams', 'FieldUnitFactory',
						function($stateParams, FieldUnitFactory) {
							return FieldUnitFactory.getFieldUnit($stateParams.id);
						}
					],
					_view_mode : function() {
						return false;
					}
				}
			})
			.state('view_field_unit', {
				url : "/field_units/{id:\\d+}/view",
				templateUrl : 'templates/edit_field_unit.html',
				controller : 'FieldUnitController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_fieldUnit : [ '$stateParams', 'FieldUnitFactory',
						function($stateParams, FieldUnitFactory) {
							return FieldUnitFactory.getFieldUnit($stateParams.id);
						}
					],
					_view_mode : function() {
						return true;
					}
				}
			})
			.state('contacts', {
				url : "/contacts",
				templateUrl : 'templates/contacts.html',
				controller : 'ContactController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_contact : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('create_contact', {
				url : "/contacts/create",
				templateUrl : 'templates/edit_contact.html',
				controller : 'ContactController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_contact : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('edit_contact', {
				url : "/contacts/{id:\\d+}/edit",
				templateUrl : 'templates/edit_contact.html',
				controller : 'ContactController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_contact : [ '$stateParams', 'ContactFactory',
						function($stateParams, ContactFactory) {
							return ContactFactory.getContact($stateParams.id);
						}
					],
					_view_mode : function() {
						return false;
					}
				}
			})
			.state('view_contact', {
				url : "/contacts/{id:\\d+}/view",
				templateUrl : 'templates/edit_contact.html',
				controller : 'ContactController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_contact : [ '$stateParams', 'ContactFactory',
						function($stateParams, ContactFactory) {
							return ContactFactory.getContact($stateParams.id);
						}
					],
					_view_mode : function() {
						return true;
					}
				}
			})
			// .state('rosters', {
			//     url: "/rosters",
			//     templateUrl: 'templates/rosters.html',
			//     controller: 'RosterController',
			//     parent: 'common',
			//     authenticate: true,
			//     resolve: {_roster: function() {return null;},
			//               _view_mode: function() {return null;}
			//              }
			// })
			// .state('create_roster', {
			//     url: "/rosters/create",
			//     templateUrl: 'templates/edit_roster.html',
			//     controller: 'RosterController',
			//     parent: 'common',
			//     authenticate: true,
			//     resolve: {_roster: function() {return null;},
			//               _view_mode: function() {return null;}
			//              }
			// })
			// .state('edit_roster', {
			//     url: "/rosters/{id:\\d+}/edit",
			//     templateUrl: 'templates/edit_roster.html',
			//     controller: 'RosterController',
			//     parent: 'common',
			//     authenticate: true,
			//     resolve: {
			//         _roster: ['$stateParams', 'RosterFactory',
			//             function ($stateParams, RosterFactory) {
			//                 return RosterFactory.getRoster($stateParams.id);
			//             }
			//         ],
			//         _view_mode: function() {return false;}
			//     }
			// })
			// .state('view_roster', {
			//     url: "/rosters/{id:\\d+}/view",
			//     templateUrl: 'templates/edit_roster.html',
			//     controller: 'RosterController',
			//     parent: 'common',
			//     authenticate: true,
			//     resolve: {
			//         _roster: ['$stateParams', 'RosterFactory',
			//             function ($stateParams, RosterFactory) {
			//                 return RosterFactory.getRoster($stateParams.id);
			//             }
			//         ],
			//         _view_mode: function() {return true;}
			//     }
			// })
			.state('sensors', {
				url : "/sensors",
				templateUrl : 'templates/sensors.html',
				controller : 'SensorController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_sensor : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('create_sensor', {
				url : "/sensors/create",
				templateUrl : 'templates/edit_sensor.html',
				controller : 'SensorController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_sensor : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('edit_sensor', {
				url : "/sensors/{id:\\d+}/edit",
				templateUrl : 'templates/edit_sensor.html',
				controller : 'SensorController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_sensor : [ '$stateParams', 'SensorFactory',
						function($stateParams, SensorFactory) {
							return SensorFactory.getSensor($stateParams.id);
						}
					],
					_view_mode : function() {
						return false;
					}
				}
			})
			.state('view_sensor', {
				url : "/sensors/{id:\\d+}/view",
				templateUrl : 'templates/edit_sensor.html',
				controller : 'SensorController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_sensor : [ '$stateParams', 'SensorFactory',
						function($stateParams, SensorFactory) {
							return SensorFactory.getSensor($stateParams.id);
						}
					],
					_view_mode : function() {
						return true;
					}
				}
			})
			.state('targets', {
				url : "/targets",
				templateUrl : 'templates/targets.html',
				controller : 'TargetController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_target : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('create_target', {
				url : "/targets/create",
				templateUrl : 'templates/edit_target.html',
				controller : 'TargetController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_target : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('edit_target', {
				url : "/targets/{id:\\d+}/edit",
				templateUrl : 'templates/edit_target.html',
				controller : 'TargetController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_target : [ '$stateParams', 'TargetFactory',
						function($stateParams, TargetFactory) {
							return TargetFactory.getTarget($stateParams.id);
						}
					],
					_view_mode : function() {
						return false;
					}
				}
			})
			.state('view_target', {
				url : "/targets/{id:\\d+}/view",
				templateUrl : 'templates/edit_target.html',
				controller : 'TargetController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_target : [ '$stateParams', 'TargetFactory',
						function($stateParams, TargetFactory) {
							return TargetFactory.getTarget($stateParams.id);
						}
					],
					_view_mode : function() {
						return true;
					}
				}
			})
			.state('tests_recurring', {
				url : "/tests_recurring",
				templateUrl : 'templates/tests.html',
				parent : 'common',
				controller : 'TestController',
				resolve : {
					_recurring : function() {
						return true;
					},
					_view_mode : function() {
						return true;
					},
					_test : function() {
						return null;
					}
				}
			})
			.state('tests_onetime', {
				url : "/tests_onetime",
				templateUrl : 'templates/tests.html',
				parent : 'common',
				controller : 'TestController',
				resolve : {
					_recurring : function() {
						return false;
  					},
 					_view_mode : function() {
						return true;
 					},
					_test : function() {
						return null;
					}
				}
			})
			.state('tests_load', {
				url : "/tests_load",
				templateUrl : 'templates/tests_load.html',
				parent : 'common',
			})
			.state('create_test', {
				url : "/tests/create",
				templateUrl : 'templates/edit_test.html',
				controller : 'TestController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_test : function() {
						return null;
					},
					_view_mode : function() {
						return null;
					}
				}
			})
			.state('edit_test', {
				url : "/tests/{id:\\d+}/edit",
				templateUrl : 'templates/edit_test.html',
				controller : 'TestController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_test : [ '$stateParams', 'TestFactory',
						function($stateParams, TestFactory) {
							return TestFactory.getTest($stateParams.id);
						}
					],
					_view_mode : function() {
						return false;
					}
				}
			})
			.state('view_test', {
				url : "/tests/{id:\\d+}/view",
				templateUrl : 'templates/edit_test.html',
				controller : 'TestController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_test : [ '$stateParams', 'TestFactory',
						function($stateParams, TestFactory) {
							return TestFactory.getTest($stateParams.id);
						}
					],
					_view_mode : function() {
						return true;
					}
				}
			})
			.state('wizard_recurring', {
				url : "/wizard_recurring",
				templateUrl : 'templates/wizard.html',
				controller : 'WizardController',
				parent : 'common',
				authenticate : true,
				resolve : {
				    _recurring : function() {
						return true;
					}
				}
				
			})
			.state('wizard_onetime', {
				url : "/wizard_onetime",
				templateUrl : 'templates/wizard.html',
				controller : 'WizardController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_recurring : function() {
						return false;
					}
				}
				
			})
			.state('login', {
				url : "/login",
				templateUrl : 'templates/login.html',
				controller : 'AuthController'
			})
			.state('register', {
				url : "/register",
				templateUrl : 'templates/register.html',
				controller : 'AuthController'
			})
			.state('account', {
				url : "/account",
				templateUrl : 'templates/account.html',
				controller : 'AccountController',
				parent : 'common',
				authenticate : true
			})
			.state('verification', {
				url : "/verification",
				templateUrl : 'templates/verification.html',
				controller : 'AuthController'
			})
			.state('graphics', {
				url : "/graphics/{id:\\d+}",
				templateUrl : 'templates/graphics.html',
				controller : 'GraphicsController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_test : [ '$stateParams', 'TestFactory',
						function($stateParams, TestFactory) {
							return TestFactory.getTest($stateParams.id);
						}
					],
					_tab : function() {
						return null;
					}
				}
			})
			.state('graphics_new_details', {
				url : "/graphics_new/{id:\\d+}/details",
				templateUrl : 'templates/graphics_new.html',
				controller : 'GraphicsController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_test : [ '$stateParams', 'TestFactory',
						function($stateParams, TestFactory) {
							return TestFactory.getTest($stateParams.id);
						}
					],
					_tab : function() {
						return 'details';
					}

				}
			})
			.state('graphics_new_analysis', {
				url : "/graphics_new/{id:\\d+}/analysis",
				templateUrl : 'templates/graphics_new.html',
				controller : 'GraphicsController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_test : [ '$stateParams', 'TestFactory',
						function($stateParams, TestFactory) {
							return TestFactory.getTest($stateParams.id);
						}
					],
					_tab : function() {
						return 'analysis';
					}

				}
			})
			.state('graphics_new_recent', {
				url : "/graphics_new/{id:\\d+}/recent",
				templateUrl : 'templates/graphics_new.html',
				controller : 'GraphicsController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_test : [ '$stateParams', 'TestFactory',
						function($stateParams, TestFactory) {
							return TestFactory.getTest($stateParams.id);
						}
					],
					_tab : function() {
						return 'recent';
					}

				}
			})
			.state('graphics_new_data', {
				url : "/graphics_new/{id:\\d+}/data",
				templateUrl : 'templates/graphics_new.html',
				controller : 'GraphicsController',
				parent : 'common',
				authenticate : true,
				resolve : {
					_test : [ '$stateParams', 'TestFactory',
						function($stateParams, TestFactory) {
							return TestFactory.getTest($stateParams.id);
						}
					],
					_tab : function() {
						return 'data';
					}

				}
			})

	}
]);


angular.module("CustomerPortal").run(function($rootScope, $state, AuthFactory) {
	$rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams) {
		if (toState.authenticate && !AuthFactory.isAuthenticated()) {
			// User isn’t authenticated
			$state.transitionTo("login");
			event.preventDefault();
		}
	});
});