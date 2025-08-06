sap.ui.define([
    "sap/ui/test/Opa5"
    // ,"sap/ui/test/action/Press"
], function (Opa5
    // ,Press
) {
    "use strict";

    Opa5.createPageObjects({
        onTheTestPage: {
            baseClass: Opa5,
            actions: {
                iPressTheTestButton: function () {
                    return this.waitFor({
                        viewNamespace: "adminapp.adminapp.ext.view.",
                        viewName : "CustomPage",
                        id: "btnCustomPage1",
                        // actions: new sap.ui.test.action.Press(),
                        success : function (oButton) {
                            oButton.$().trigger("tap");
                        },
                        errorMessage: "The Test Button could not be found"
                    });
                },
                iPressComboBox: function () {
                    return this.waitFor({
                        viewNamespace: "adminapp.adminapp.ext.view.",
                        viewName : "CustomPage",
                        id: "CustomComboBox",
                        actions: function (oComboBox) {
                            oComboBox.open(); // Simulate opening the ComboBox
                            oComboBox.close(); // Simulate opening the ComboBox
                            // oComboBox.getItems()[0].firePress()
                            oComboBox.setSelectedKey("John Miller") 
                        },
                        errorMessage: "ComboBox not found"
                    })
                },
                iSetInput: function (sText) {
                    return this.waitFor({
                        viewNamespace: "adminapp.adminapp.ext.view.",
                        viewName : "CustomPage",
                        id: "CustomInput",
                        actions: function (oInput) {
                            oInput.setValue(sText)
                            Opa5.assert.ok(oInput.getValue() === sText, `${sText} was set`);
                        },
                        errorMessage: "ComboBox not found"
                    })
                },
                IPressDialogConfirm: function () {
                    return this.waitFor({
                        controlType: "sap.m.Button",
                        searchOpenDialogs: true,
                        matchers: new sap.ui.test.matchers.Properties({ text: "Ok" }),
                        success: function (oButton) {
                            //matchers return array/list
                            oButton[0].firePress()
                            // const oDate = new Date();
                            // oPlanner.setStartDate(oDate);
                        },
                        errorMessage: "Start date planner not found"
                    });
                },
                iSetCalenderStartDate: function () {
                    return this.waitFor({
                        viewNamespace: "adminapp.adminapp.ext.view.",
                        viewName : "CustomPage",
                        id: "PC1",
                        // actions: new sap.ui.test.action.Press(),
                        success : function (oPlanner) {
                            const oDate = new Date()
                            oPlanner.setStartDate(oDate)
                        },
                        errorMessage: "The Test Button could not be found"
                    });
                }
            },
            assertions: {
                iShouldSeeTeamMember: function (Name) {
                    return this.waitFor({
                        viewNamespace: "adminapp.adminapp.ext.view.",
                        viewName : "CustomPage",
                        id: "PC1",
                        // actions: new sap.ui.test.action.Press(),
                        success : function (oPlanner) {
                            //get 1st Row Name
                            oPlanner.getRows()[0].getTitle()
                            // oPlanner.getRows().map(x => {
                            //     Opa5.assert.strictEqual(x.getTitle(), Name, "Row " + Name + " is found");
                            // })
                            const listMember = oPlanner.getRows().map(x => 
                                x.getTitle()
                            )
                            // assert.ok(condition, message)
                            Opa5.assert.ok(listMember.includes(Name), `Team Member ${Name} was found`);
                            //get 1st Row Appointments
                            // oPlanner.getRows()[0].getAppointments()
                            // oButton.$().trigger("tap");
                        },
                        errorMessage: "The Test Button could not be found"
                    });
                },
                iShouldSeePage: function () {
                    return this.waitFor({
                        viewNamespace: "adminapp.adminapp.ext.view.",
                        viewName : "CustomPage",
                        success : function () {
                            Opa5.assert.ok(true, "Page is Loaded");
                        },
                        errorMessage: 'Page not laoded'
                    });
                },
                iShouldSeeButton: function (id) {
                    return this.waitFor({
                        viewNamespace: "adminapp.adminapp.ext.view.",
                        viewName : "CustomPage",
                        id: id,
                        success : function (oElement) {
                            Opa5.assert.ok(true, "Button is Loaded");
                        },
                        errorMessage: 'Button not laoded'
                    });
                },
            }
        }
    });
});