const cds = require("@sap/cds");
const logger = cds.log("OrderService");
import { Request, Transaction } from "@sap/cds";
const { logStartTime, logEndTime } = require("./lib/performance_logging");
const { PerformanceLogger } = require("./lib/performance_logging_class_based"); // for class-based functions
const performanceLog = new PerformanceLogger("admin-service"); // for class-based functions
import { getPlanCalendarData, ProductProjection } from "#cds-models/AdminService"


module.exports = class AdminService extends cds.ApplicationService {

    init() {

        this.on("addProductCategory", async (req: Request) => await addCategory(req));
        this.on("addCategoryClass", async (req: Request) => await addCategoryClass(req));
        this.on("sendDataForApproval", async (req: Request) => await sendDataForApproval(req))
        this.after("READ", "ProductProjection", async (req : Array<ProductProjection>) => await addCriticalityValues(req))
        this.on("changeStatus", async (req : Request) => await changeStatusFn(req));
        this.on("getPlanCalendarData", async (req : Request) => await getPlanCalendarData(req));
        const cds = require('@sap/cds');

        // this.before('CREATE', 'ProductProjection', async (req : Request) => {
        //     console.log('asdfs')
        //     const db = await cds.connect.to('db');
        //     const result = await db.run(`SELECT nextval('order_id_seq') AS id`);
        //     req.data.ID = result[0].ID;
        // });


        return super.init();

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

        async function sendDataForApproval(req: Request): Promise<ResponseData<ProductCategoryPayload>> {
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
            } catch (error: any) {
                logger.error(JSON.stringify(error));

                return {
                    message: error.message || error.originalMessage || "Sending data failed",
                    code: error.code || 400,
                    data: req.data.payload
                }
            }
        }

        async function addCriticalityValues(req: Array<ProductProjection>) {
            try {
                const uuidKey: string = performanceLog.logStartTime("AdminService", "addCriticalityValues");
                const data = req.map((r) => {
                    r.Criticality = r.Stock && r.Stock <= 10 ? 1 : 0;
                    r.inputField = "";
                    return r;
                })
                performanceLog.logEndTime("AdminService", uuidKey, "addCriticalityValues");
                return data;
            } catch (error: any) {
                logger.error(JSON.stringify(error));

                return {
                    message: error.message || error.originalMessage || "Adding Criticality values failed",
                    code: error.code || 400,
                    data: req
                }
            }
        }

        async function changeStatusFn(req: Request) {
            try {
                await UPDATE (req.subject) .with ({ Status: req.data.newStatus });
                const uuidKey: string = performanceLog.logStartTime("AdminService", "changeStatusFn");
                const reqData = req.data;
                const reqParams = req.params;
                performanceLog.logEndTime("AdminService", uuidKey, "changeStatusFn");
            } catch (error) {
                logger.error(error);
            }
        }

        async function getPlanCalendarData(req: Request) {
            try {
                const uuidKey: string = performanceLog.logStartTime("AdminService", "changeStatusFn");
                // insert logic to retrieve data from DB and manipulate
                // for now, hardcoded data to be passed to frontend
                const data = {
                    startDate: new Date(2017, 0, 15, 8, 0),
                    people: [{
                        pic: "test-resources/sap/ui/documentation/sdk/images/John_Miller.png",
                        name: "John Miller",
                        role: "team member",
                        appointments: [
                            {
                                start: new Date(2017, 0, 8, 8, 30),
                                end: new Date(2017, 0, 8, 9, 30),
                                title: "Meet Max Mustermann",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 11, 10, 0),
                                end: new Date(2017, 0, 11, 12, 0),
                                title: "Team meeting",
                                info: "room 1",
                                type: "Type01",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 12, 11, 30),
                                end: new Date(2017, 0, 12, 13, 30),
                                title: "Lunch",
                                info: "canteen",
                                type: "Type03",
                                tentative: true
                            },
                            {
                                start: new Date(2017, 0, 15, 8, 30),
                                end: new Date(2017, 0, 15, 9, 30),
                                title: "Meet Max Mustermann",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 15, 10, 0),
                                end: new Date(2017, 0, 15, 12, 0),
                                title: "Team meeting",
                                info: "room 1",
                                type: "Type01",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 15, 11, 30),
                                end: new Date(2017, 0, 15, 13, 30),
                                title: "Lunch",
                                info: "canteen",
                                type: "Type03",
                                tentative: true
                            },
                            {
                                start: new Date(2017, 0, 15, 13, 30),
                                end: new Date(2017, 0, 15, 17, 30),
                                title: "Discussion with clients",
                                info: "online meeting",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 16, 4, 0),
                                end: new Date(2017, 0, 16, 22, 30),
                                title: "Discussion of the plan",
                                info: "Online meeting",
                                type: "Type04",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 18, 8, 30),
                                end: new Date(2017, 0, 18, 9, 30),
                                title: "Meeting with the manager",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 18, 11, 30),
                                end: new Date(2017, 0, 18, 13, 30),
                                title: "Lunch",
                                info: "canteen",
                                type: "Type03",
                                tentative: true
                            },
                            {
                                start: new Date(2017, 0, 18, 1, 0),
                                end: new Date(2017, 0, 18, 22, 0),
                                title: "Team meeting",
                                info: "regular",
                                type: "Type01",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 21, 0, 30),
                                end: new Date(2017, 0, 21, 23, 30),
                                title: "New Product",
                                info: "room 105",
                                type: "Type03",
                                tentative: true
                            },
                            {
                                start: new Date(2017, 0, 25, 11, 30),
                                end: new Date(2017, 0, 25, 13, 30),
                                title: "Lunch",
                                type: "Type03",
                                tentative: true
                            },
                            {
                                start: new Date(2017, 0, 29, 10, 0),
                                end: new Date(2017, 0, 29, 12, 0),
                                title: "Team meeting",
                                info: "room 1",
                                type: "Type01",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 30, 8, 30),
                                end: new Date(2017, 0, 30, 9, 30),
                                title: "Meet Max Mustermann",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 30, 10, 0),
                                end: new Date(2017, 0, 30, 12, 0),
                                title: "Team meeting",
                                info: "room 1",
                                type: "Type01",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 30, 11, 30),
                                end: new Date(2017, 0, 30, 13, 30),
                                title: "Lunch",
                                type: "Type03",
                                tentative: true
                            },
                            {
                                start: new Date(2017, 0, 30, 13, 30),
                                end: new Date(2017, 0, 30, 17, 30),
                                title: "Discussion with clients",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 31, 10, 0),
                                end: new Date(2017, 0, 31, 11, 30),
                                title: "Discussion of the plan",
                                info: "Online meeting",
                                type: "Type04",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 1, 3, 8, 30),
                                end: new Date(2017, 1, 13, 9, 30),
                                title: "Meeting with the manager",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 1, 4, 10, 0),
                                end: new Date(2017, 1, 4, 12, 0),
                                title: "Team meeting",
                                info: "room 1",
                                type: "Type01",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 2, 30, 10, 0),
                                end: new Date(2017, 4, 33, 12, 0),
                                title: "Working out of the building",
                                type: "Type07",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            }
                        ],
                        headers: [
                            {
                                start: new Date(2017, 0, 15, 8, 0),
                                end: new Date(2017, 0, 15, 10, 0),
                                title: "Reminder",
                                type: "Type06"
                            },
                            {
                                start: new Date(2017, 0, 15, 17, 0),
                                end: new Date(2017, 0, 15, 19, 0),
                                title: "Reminder",
                                type: "Type06"
                            },
                            {
                                start: new Date(2017, 8, 1, 0, 0),
                                end: new Date(2017, 10, 30, 23, 59),
                                title: "New quarter",
                                type: "Type10",
                                tentative: false
                            },
                            {
                                start: new Date(2018, 1, 1, 0, 0),
                                end: new Date(2018, 3, 30, 23, 59),
                                title: "New quarter",
                                type: "Type10",
                                tentative: false
                            }
                        ]
                    },
                    {
                        pic: "test-resources/sap/ui/documentation/sdk/images/Donna_Moore.jpg",
                        name: "Donna Moore",
                        role: "team member",
                        appointments: [
                            {
                                start: new Date(2017, 0, 10, 18, 0),
                                end: new Date(2017, 0, 10, 19, 10),
                                title: "Discussion of the plan",
                                info: "Online meeting",
                                type: "Type04",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 9, 10, 0),
                                end: new Date(2017, 0, 13, 12, 0),
                                title: "Workshop out of the country",
                                type: "Type07",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 15, 8, 0),
                                end: new Date(2017, 0, 15, 9, 30),
                                title: "Discussion of the plan",
                                info: "Online meeting",
                                type: "Type04",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 15, 10, 0),
                                end: new Date(2017, 0, 15, 12, 0),
                                title: "Team meeting",
                                info: "room 1",
                                type: "Type01",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 15, 18, 0),
                                end: new Date(2017, 0, 15, 19, 10),
                                title: "Discussion of the plan",
                                info: "Online meeting",
                                type: "Type04",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 16, 10, 0),
                                end: new Date(2017, 0, 31, 12, 0),
                                title: "Workshop out of the country",
                                type: "Type07",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2018, 0, 1, 0, 0),
                                end: new Date(2018, 2, 31, 23, 59),
                                title: "New quarter",
                                type: "Type10",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 1, 11, 10, 0),
                                end: new Date(2017, 2, 20, 12, 0),
                                title: "Team collaboration",
                                info: "room 1",
                                type: "Type01",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 3, 1, 10, 0),
                                end: new Date(2017, 3, 31, 12, 0),
                                title: "Workshop out of the country",
                                type: "Type07",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 4, 1, 10, 0),
                                end: new Date(2017, 4, 31, 12, 0),
                                title: "Out of the office",
                                type: "Type08",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 7, 1, 0, 0),
                                end: new Date(2017, 7, 31, 23, 59),
                                title: "Vacation",
                                info: "out of office",
                                type: "Type04",
                                tentative: false
                            }
                        ],
                        headers: [
                            {
                                start: new Date(2017, 0, 15, 9, 0),
                                end: new Date(2017, 0, 15, 10, 0),
                                title: "Payment reminder",
                                type: "Type06"
                            },
                            {
                                start: new Date(2017, 0, 15, 16, 30),
                                end: new Date(2017, 0, 15, 18, 0),
                                title: "Private appointment",
                                type: "Type06"
                            }
                        ]
                    },
                    {
                        pic: "sap-icon://employee",
                        name: "Max Mustermann",
                        role: "team member",
                        appointments: [
                            {
                                start: new Date(2017, 0, 15, 8, 30),
                                end: new Date(2017, 0, 15, 9, 30),
                                title: "Meet John Miller",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 15, 10, 0),
                                end: new Date(2017, 0, 15, 12, 0),
                                title: "Team meeting",
                                info: "room 1",
                                type: "Type01",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 15, 13, 0),
                                end: new Date(2017, 0, 15, 16, 0),
                                title: "Discussion with clients",
                                info: "online",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 16, 0, 0),
                                end: new Date(2017, 0, 16, 23, 59),
                                title: "Vacation",
                                info: "out of office",
                                type: "Type04",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 17, 1, 0),
                                end: new Date(2017, 0, 18, 22, 0),
                                title: "Workshop",
                                info: "regular",
                                type: "Type07",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 19, 8, 30),
                                end: new Date(2017, 0, 19, 18, 30),
                                title: "Meet John Doe",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 19, 10, 0),
                                end: new Date(2017, 0, 19, 16, 0),
                                title: "Team meeting",
                                info: "room 1",
                                type: "Type01",
                                pic: "sap-icon://sap-ui5",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 19, 7, 0),
                                end: new Date(2017, 0, 19, 17, 30),
                                title: "Discussion with clients",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 20, 0, 0),
                                end: new Date(2017, 0, 20, 23, 59),
                                title: "Vacation",
                                info: "out of office",
                                type: "Type04",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 0, 22, 7, 0),
                                end: new Date(2017, 0, 27, 17, 30),
                                title: "Discussion with clients",
                                info: "out of office",
                                type: "Type02",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 2, 13, 9, 0),
                                end: new Date(2017, 2, 17, 10, 0),
                                title: "Payment week",
                                type: "Type06"
                            },
                            {
                                start: new Date(2017, 3, 10, 0, 0),
                                end: new Date(2017, 5, 16, 23, 59),
                                title: "Vacation",
                                info: "out of office",
                                type: "Type04",
                                tentative: false
                            },
                            {
                                start: new Date(2017, 7, 1, 0, 0),
                                end: new Date(2017, 9, 31, 23, 59),
                                title: "New quarter",
                                type: "Type10",
                                tentative: false
                            }
                        ],
                        headers: [
                            {
                                start: new Date(2017, 0, 16, 0, 0),
                                end: new Date(2017, 0, 16, 23, 59),
                                title: "Private",
                                type: "Type05"
                            }
                        ]
                    }
                    ]
                }
                performanceLog.logEndTime("AdminService", uuidKey, "changeStatusFn");
                return data;
            } catch (error) {
                // catch logic
            }
        }

        async function getDropDownOptions(req: Request) {
            const data = {
                options: [
                    { key: "D", text: "Option from Backend D" },
                    { key: "E", text: "Option from Backend E" },
                    { key: "F", text: "Option from Backend F" }
                ]
            }
            return data;
        }

    }
}