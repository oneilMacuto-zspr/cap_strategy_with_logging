using { Products, ProductCategory } from '../db/schema';

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
    entity ProductProjection as projection on Products;
    entity ProductCategoryProjection as projection on ProductCategory {
        ID, Name, Description
    };
    action addProductCategory(payload: array of CategoryPayload) returns String;
    action addCategoryClass(payload: array of CategoryPayload) returns String;
    action sendDataForApproval(payload: array of itemPayload) returns String;

}