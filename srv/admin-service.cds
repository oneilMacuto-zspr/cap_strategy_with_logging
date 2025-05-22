using { Products, ProductCategory } from '../db/schema';

service AdminService @(path: '/admin', impl: 'srv/admin-service.ts'){
    type CategoryPayload {
        ID: Integer;
        Name: String;
        Description: String;
    }
    entity ProductProjection as projection on Products;
    entity ProductCategoryProjection as projection on ProductCategory {
        ID, Name, Description
    };
    action addProductCategory(payload: array of CategoryPayload) returns String;
    action addCategoryClass(payload: array of CategoryPayload) returns String;

}