using { Products, ProductCategory, Statuses } from '../db/schema';

service AdminService @(path: '/admin', impl: 'srv/admin-service.ts'){
    type CategoryPayload {
        ID: Integer;
        Name: String;
        Description: String;
    }
    type itemPayload {
        ID: Integer;
        Name: String;
        Description: String;
        Price: Decimal(10, 2);
        Stock: Integer;
    }
    entity StatusesProjection as projection on Statuses;
    entity ProductProjection as select from Products actions {
        @(
            //Update the UI after action
            Common.SideEffects              : {
                TargetProperties : ['in/Status']
            }
        )

        action changeStatus (
            //Value Helper for the Input Parameter
            //Search-Term: #ValueHelpParameter
            @(
                title                       : 'New Status',
                UI.ParameterDefaultValue    : in.Status,
                Common : {
                    ValueListWithFixedValues : true,
                    ValueList : {
                        Label          : '{i18n>Criticality}',
                        CollectionPath : 'StatusesProjection',
                        Parameters     : [
                            {
                                $Type             : 'Common.ValueListParameterInOut',
                                ValueListProperty : 'Status',
                                LocalDataProperty : newStatus
                            }
                        ]
                    }
                }
            )
            newStatus : String,
            Reason : String
        );
    };
    entity ProductCategoryProjection as projection on ProductCategory {
        ID, Name, Description
    };
    action addProductCategory(payload: array of CategoryPayload) returns String;
    action addCategoryClass(payload: array of CategoryPayload) returns String;
    action sendDataForApproval(payload: array of itemPayload) returns String;
    function getPlanCalendarData() returns String;
    function getDropDownOptions() returns String;
}