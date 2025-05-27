const cds = require("@sap/cds");
const logger = cds.log("OrderService");
import { Request, Transaction } from "@sap/cds";
const { logStartTime, logEndTime  } = require("./lib/performance_logging");
const { PerformanceLogger } = require("./lib/performance_logging_class_based"); // for class-based functions
const performanceLog = new PerformanceLogger("admin-service"); // for class-based functions
import { ProductProjection } from "#cds-models/AdminService"


module.exports = class AdminService extends cds.ApplicationService {

    init() {

        this.on("addProductCategory", async (req : Request) => await addCategory(req));
        this.on("addCategoryClass", async (req: Request) => await addCategoryClass(req));
        this.on("sendDataForApproval", async (req: Request) => await sendDataForApproval(req))
        this.after("READ", "ProductProjection", async (req : Array<ProductProjection>) => await addCriticalityValues(req))

        return super.init();

        async function addCategory(req : Request) : Promise<ResponseData<ProductCategoryPayload>> {
            try {
                const uuidKey: string = logStartTime("admin-service", "AdminService", "addProductCategory");
                const tx : Transaction = cds.tx();
                const query = INSERT.into(cds.entities.ProductCategory).entries(req.data.payload)
        
                await tx.run(query).then(tx.commit, tx.rollback);
    
                logEndTime("admin-service", "AdminService", uuidKey, "addProductCategory")
                return {
                    message: "Data inserted successfully",
                    code: 200,
                    data: req.data.payload
                }
            } catch (error : any) {
                logger.error(JSON.stringify(error));
    
                return {
                    message: error.message || error.originalMessage || "Inserting category failed",
                    code: error.code || 400,
                    data: req.data.payload
                }
            }
        }
    
        async function addCategoryClass(req : Request) : Promise<ResponseData<ProductCategoryPayload>> {
            try {
                const uuidKey: string = performanceLog.logStartTime("AdminService", "addCategoryClass");
                const tx : Transaction = cds.tx();
                const query = INSERT.into(cds.entities.ProductCategory).entries(req.data.payload);
        
                await tx.run(query).then(tx.commit, tx.rollback);
    
                performanceLog.logEndTime("AdminService", uuidKey, "addCategoryClass");
                return {
                    message: "Data inserted successfully",
                    code: 200,
                    data: req.data.payload
                }
            } catch (error : any) {
                logger.error(JSON.stringify(error));
    
                return {
                    message: error.message || error.originalMessage || "Inserting category failed",
                    code: error.code || 400,
                    data: req.data.payload
                }
            }
        }

        async function sendDataForApproval(req : Request) : Promise<ResponseData<ProductCategoryPayload>> {
            try {
                const uuidKey: string = performanceLog.logStartTime("AdminService", "sendDataForApproval");
                // const tx : Transaction = cds.tx();
                // const query = INSERT.into(cds.entities.ProductCategory).entries(req.data.payload);
        
                // await tx.run(query).then(tx.commit, tx.rollback);
    
                performanceLog.logEndTime("AdminService", uuidKey, "sendDataForApproval");
                return {
                    message: "Data inserted successfully",
                    code: 200,
                    data: req.data.payload
                }
            } catch (error : any) {
                logger.error(JSON.stringify(error));
    
                return {
                    message: error.message || error.originalMessage || "Sending data failed",
                    code: error.code || 400,
                    data: req.data.payload
                }
            }
        }

        async function addCriticalityValues(req : Array<ProductProjection>) {
            try {
                const uuidKey: string = performanceLog.logStartTime("AdminService", "addCriticalityValues");
                const data = req.map((r) => {
                    r.Criticality = r.Stock && r.Stock <= 10 ? 1 : 0;
                    return r;
                })
                performanceLog.logEndTime("AdminService", uuidKey, "addCriticalityValues");
                return data;
            } catch(error : any) {
                logger.error(JSON.stringify(error));
    
                return {
                    message: error.message || error.originalMessage || "Adding Criticality values failed",
                    code: error.code || 400,
                    data: req
                }
            }
        }
    
    }
}