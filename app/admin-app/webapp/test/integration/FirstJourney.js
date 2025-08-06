sap.ui.define([
    "sap/ui/test/opaQunit"
    ,"sap/ui/test/Opa5"
    ,"adminapp/adminapp/test/integration/pages/CustomPage"
], function (opaTest
    ,Opa5,
    CustomPage
) {
    "use strict";

    var Journey = {
        run: function() {
            QUnit.module("First journey");
            

            opaTest("Start application", function (Given, When, Then) {
                Given.iStartMyApp();

                Then.onTheProductProjectionList.iSeeThisPage();

            });


            // opaTest("Table Action", function (Given, When, Then) {
            //   When.onTheProductProjectionList.onFilterBar().iExecuteSearch();
            //   //custom
            //   When.onTheProductProjectionList.onTable('tableView').iExecuteAction("Send All")
            //   //inline
            //   When.onTheProductProjectionList.onTable('tableView').iExecuteInlineAction(0, 'Change Status');
            //   When.onTheProductProjectionList.onActionDialog().iChangeDialogField({property: "newStatus"}, 'Discontinued', true);
            //   When.onTheProductProjectionList.onActionDialog().iChangeDialogField({property: "Reason"}, 'For testing Discontinued', true);
            //   When.onTheProductProjectionList.onActionDialog().iConfirm();

            // });

            // opaTest("Check Table Column and Row", function (Given, When, Then) {
            //     When.onTheProductProjectionList.onFilterBar().iExecuteSearch();
            //     // iCheckColumn (NumberofColumn,Structure)
            //     Then.onTheProductProjectionList.onTable('tableView').iCheckColumns(7
            //         ,{
            //             0: {header: "ID"},
            //             1: {header: "Name"}
            //         }
            //     )
            //     Then.onTheProductProjectionList.onTable('tableView').iCheckColumns(
            //         {
            //             0: {header: "ID"},
            //             1: {header: "Name"}
            //         }
            //     )
            //     // Then.onTheProductProjectionList.onTable('tableView').iCheckRows({Name: "Electronics Product 3"})
            //     Then.onTheProductProjectionList.onTable('tableView').iCheckRows({ID: "3", Name: "Electronics Product 3"})
            // })

            // opaTest("Create Record", function (Given, When, Then) {
            //     Then.onTheProductProjectionList.iSeeThisPage();
            //     Then.onTheProductProjectionList.onTable('tableView').iCheckAction("Create", { enabled: true });
        
            //     // Click on Create button
            //     When.onTheProductProjectionList.onTable('tableView').iExecuteAction("Create");
            //     When.onTheProductProjectionList.onCreateDialog().iChangeDialogField({property: "ProductProjection::ID"}, '5431', true).and.iConfirm()
            //     Then.onTheProductProjectionObjectPage.iSeeObjectPageInEditMode();
            //     // When.onTheProductProjectionObjectPage.iGoToSection("General Information");
            //     When.onTheProductProjectionObjectPage
            //       .onForm({ section: "GeneratedFacet1", fieldGroup: "GeneratedFacet1" })
            //       .iChangeField(
            //         { property: "Price"},
            //         "123435"
            //     );
            //     When.onTheProductProjectionObjectPage
            //       .onForm({ section: "GeneratedFacet1", fieldGroup: "GeneratedFacet1" })
            //       .iChangeField(
            //         { property: "Description"},
            //         "Test123"
            //     );
            //     Then.onTheProductProjectionObjectPage.onForm({ section: "GeneratedFacet1", fieldGroup: "GeneratedFacet1" })
            //     .iCheckField({ property: "Description"},
            //         { value: "Test123" },
            //          {editable: true}
            //     )
            //     Then.onTheProductProjectionObjectPage.onForm({ section: "GeneratedFacet1", fieldGroup: "GeneratedFacet1" })
            //     .iCheckField({ property: "Price"},
            //         { value: "123,435.00" },
            //          {editable: true}
            //     )
            //     When.onTheProductProjectionObjectPage
            //       .onForm({ section: "GeneratedFacet1", fieldGroup: "GeneratedFacet1" })
            //       .iOpenValueHelp({ property: "Category_ID" });
            //     When.onTheProductProjectionObjectPage.onValueHelpDialog().iSelectRows({ID: "7"})
                
            //     // // Save all
            //     // Then.onTheProductProjectionObjectPage.onFooter().iCheckDraftStateSaved();
            //     // When.onTheProductProjectionObjectPage.onFooter().iExecuteSave();
            //     //Discard
            //     When.onTheProductProjectionObjectPage.onFooter().iExecuteCancel()
            //     When.onTheProductProjectionObjectPage.onFooter().iConfirmCancel()
            //     // When.iNavigateBack();
            // });

            // opaTest("Check Form", function (Given, When, Then) {
            //     When.onTheProductProjectionList.onFilterBar().iExecuteSearch();
            //     When.onTheProductProjectionList
            //       .onTable('tableView')
            //       .iPressRow({ Name: "Electronics Product 2" });
            //     Then.onTheProductProjectionObjectPage.onHeader()
            //     .iCheckEdit({visible: true})
            //     Then.onTheProductProjectionObjectPage.onHeader()
            //     .iCheckDelete({visible: true})
            //     Then.onTheProductProjectionObjectPage.onForm({ section: "GeneratedFacet1", fieldGroup: "GeneratedFacet1" })
            //     .iCheckField({ property: "Description"},
            //         { value: "Description of Electronics Product 2" },
            //         {editable: false}
            //     )
            //     Then.onTheProductProjectionObjectPage.onForm({ section: "GeneratedFacet1", fieldGroup: "GeneratedFacet1" })
            //     .iCheckField({ property: "Price"},
            //         { value: "307.15" },
            //         {editable: false}
            //     )
                
            // });



            // opaTest("Delete Record", function (Given, When, Then) {
            //     When.onTheProductProjectionList.onFilterBar().iExecuteSearch();
            //     Then.onTheProductProjectionList.iSeeThisPage();
        
            //     Then.onTheProductProjectionList
            //       .onTable('tableView')
            //       .iCheckDelete({ visible: true, enabled: false });
        
            //     // select row to be deleted
            //     // When.onTheProductProjectionList
            //     //   .onTable('tableView')
            //     //   .iSelectRows({ Name: "Electronics Product 2" });

            //     When.onTheProductProjectionList
            //     .onTable('tableView')
            //     .iSelectRows({ ID: "3" });
        
            //     Then.onTheProductProjectionList
            //       .onTable('tableView')
            //       .iCheckDelete({ visible: true, enabled: true });
            //     When.onTheProductProjectionList.onTable('tableView').iExecuteDelete();
            //     When.onTheProductProjectionList.onDialog().iConfirm();
            //     Then.onTheProductProjectionList
            //       .onTable('tableView')
            //       .iCheckDelete({ visible: true, enabled: false });
            //   });

            // opaTest("Header Action", function (Given, When, Then) {
            //     Then.onTheProductProjectionList.onHeader().iCheckAction('Show Planning Calendar', {visible: true})
            //     When.onTheProductProjectionList.onHeader().iExecuteAction('Show Planning Calendar')
            //     // Navigate back to the previous page in the application
            //     // When.iNavigateBack();

            // });

            // opaTest("Custom Page Check", function (Given, When, Then) {
            //     Then.onTheTestPage.iShouldSeePage()
            //     Then.onTheTestPage.iShouldSeeButton("btnCustomPage1")
            // });

            // opaTest("Custom Page Action", function (Given, When, Then) {
            //     Then.onTheTestPage.iShouldSeeButton("btnCustomPage1")
            //     Then.onTheTestPage.iShouldSeeTeamMember("Donna Moore")
            //     When.onTheTestPage.iPressTheTestButton()
            //     When.onTheTestPage.iPressCalenderButton()
            //     When.onTheTestPage.iPressComboBox()
            // });

            // opaTest("Set Filter and Check Filter", function (Given, When, Then) {
            //     // Filter bar is visible
            //     Then.onTheProductProjectionList.onFilterBar().iCheckState({visible: true})
            //     // Then.onTheProductProjectionList.onFilterBar().iCheckFilterField({property: 'Price'},null,null,{visible: true}) // Not working

            //     // Set Filter 
            //     When.onTheProductProjectionList.onFilterBar().iChangeFilterField('Price', '307.15', true) // Set true to clear filter
            //     When.onTheProductProjectionList.onFilterBar().iChangeFilterField('Price', '79.07', false) // Set true to not clear previous filter
            //     // Check set filter
            //     Then.onTheProductProjectionList.onFilterBar().iCheckFilterField({property: 'Price'},['307.15','79.07'],"",{visible: true})
            //     Then.onTheProductProjectionList.onFilterBar().iCheckFilterField({property: 'Price'},'307.15',"",{visible: true})
            //     When.onTheProductProjectionList.onFilterBar().iExecuteSearch();
            //     // iCheckAdaptationFilterField(vFieldIdentifier, mState?)
            // });


            // opaTest("Navigate to ObjectPage", function (Given, When, Then) {
            //     // Note: this test will fail if the ListReport page doesn't show any data
                
            //     When.onTheProductProjectionList.onFilterBar().iExecuteSearch();
                
            //     Then.onTheProductProjectionList.onTable().iCheckRows();

            //     When.onTheProductProjectionList.onTable().iPressRow(0);
            //     Then.onTheProductProjectionObjectPage.iSeeThisPage();

            // });

            // opaTest("Teardown", function (Given, When, Then) { 
            //     // Cleanup
            //     Given.iTearDownMyApp();
            // });


            QUnit.module("Second journey");
            
            opaTest("Start application", function (Given, When, Then) {
                Given.iStartMyApp();

                Then.onTheProductProjectionList.iSeeThisPage();

            });
            
            opaTest("Header Action", function (Given, When, Then) {
                Then.onTheProductProjectionList.onHeader().iCheckAction('Show Planning Calendar', {visible: true})
                When.onTheProductProjectionList.onHeader().iExecuteAction('Show Planning Calendar')
                // Navigate back to the previous page in the application
                // When.iNavigateBack();

            });

            opaTest("Custom Page Check", function (Given, When, Then) {
                Then.onTheTestPage.iShouldSeePage()
                Then.onTheTestPage.iShouldSeeButton("btnCustomPage1")
            });

            opaTest("Custom Page Action", function (Given, When, Then) {
                Then.onTheTestPage.iShouldSeeButton("btnCustomPage1")
                Then.onTheTestPage.iShouldSeeTeamMember("Donna Moore")
                When.onTheTestPage.iSetCalenderStartDate()
                When.onTheTestPage.iPressComboBox()
                When.onTheTestPage.iSetInput("testasdasd")
                When.onTheTestPage.iPressTheTestButton()
                When.onTheTestPage.IPressDialogConfirm()
            });

        }
    }

    return Journey;
});