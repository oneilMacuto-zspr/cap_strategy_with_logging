const cds = require("@sap/cds");
const logger = cds.log("OrderService");
import { Request, Transaction } from "@sap/cds";
const { logStartTime, logEndTime } = require("./lib/performance_logging");
const { ApplicationLogger } = require("./lib/application_logging_one_instance"); // for class-based functions
const performanceLog = new ApplicationLogger("admin-service"); // for class-based functions
const { callAPI_multi, callAPI_one } = require("./lib/apiops")

type ExecutionType = {
    uuid: string;
    start: [number, number];
    serviceName: string;
    functionName: string;
};

module.exports = class AdminService extends cds.ApplicationService {

    init() {

        this.on("addProductCategory", async (req: Request) => await addCategory(req));
        this.on("addCategoryClass", async (req: Request) => await addCategoryClass(req));
        this.on("onlyOneInstance", async (req: Request) => await onlyOneInstance(req));

        return super.init();

        async function onlyOneInstance(req: Request) {
            try {
                const objExecData: ExecutionType = performanceLog.logStartTime("AdminService", "onlyOneInstance");
                // LOGIC

                // API CALL
                await callAPI_one();

                performanceLog.logEndTime(objExecData);

            } catch (error) {

            }
        }

        async function addCategory(req: Request): Promise<ResponseData<ProductCategoryPayload>> {
            try {
                const uuidKey: string = logStartTime("admin-service", "AdminService", "addProductCategory");
                const tx: Transaction = cds.tx();
                const query = INSERT.into(cds.entities.ProductCategory).entries(req.data.payload)

                await tx.run(query).then(tx.commit, tx.rollback);

                logEndTime("admin-service", "AdminService", uuidKey, "addProductCategory")
                return {
                    message: "Data inserted successfully",
                    code: 200,
                    data: req.data.payload
                }
            } catch (error: any) {
                logger.error(JSON.stringify(error));

                return {
                    message: error.message || error.originalMessage || "Inserting category failed",
                    code: error.code || 400,
                    data: req.data.payload
                }
            }
        }

        async function addCategoryClass(req: Request): Promise<ResponseData<ProductCategoryPayload>> {
            try {
                const uuidKey: string = performanceLog.logStartTime("AdminService", "addCategoryClass");
                const tx: Transaction = cds.tx();
                const query = INSERT.into(cds.entities.ProductCategory).entries(req.data.payload);

                await tx.run(query).then(tx.commit, tx.rollback);

                performanceLog.logEndTime("AdminService", uuidKey, "addCategoryClass");
                return {
                    message: "Data inserted successfully",
                    code: 200,
                    data: req.data.payload
                }
            } catch (error: any) {
                logger.error(JSON.stringify(error));

                return {
                    message: error.message || error.originalMessage || "Inserting category failed",
                    code: error.code || 400,
                    data: req.data.payload
                }
            }
        }

    }
}