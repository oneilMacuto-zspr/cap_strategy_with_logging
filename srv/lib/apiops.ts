const { ApplicationLogger, APIExecutionLogger } = require("./application_logging_multi_instance"); // for multiple logging instances

const { PerformanceLogger } = require("./application_logging_one_instance"); // for class-based functions
const performanceLog = new PerformanceLogger("apiops"); // for class-based functions

type ExecutionType = {
    uuid: string;
    start: [number, number];
    serviceName: string;
    functionName: string;
};

function callAPI_multi() {
    const appLog = new ApplicationLogger("apiops", "AdminService", "callAPI")
    const samplePath = "https://openapi.ariba.com/api/sourcing/v1/rfx"
    const sampleBody = {
        contractId: "CW123",
        docId: "Doc1234",
    }
    const apiExecLog = new APIExecutionLogger(appLog);
    // API CALL HERE
    const sampleResponse = {
        "requisitionId": "PR123456",
        "requester": {
            "name": "Jane Doe",
            "email": "jane.doe@example.com"
        },
        "items": [
            {
                "itemId": "10",
                "description": "Laptop",
                "quantity": 1,
                "unitPrice": 1200.00,
                "currency": "USD"
            }
        ],
    }
    apiExecLog.logAPIResponse(samplePath, JSON.stringify(sampleBody), JSON.stringify(sampleResponse));
    appLog.logEndTime()
}

function callAPI_one() {
    const fnExecData: ExecutionType = performanceLog.logStartTime("AdminService", "onlyOnePerFile");
    const samplePath = "https://openapi.ariba.com/api/sourcing/v1/rfx"
    const sampleBody = {
        contractId: "CW123",
        docId: "Doc1234",
    }
    const apiExecData = performanceLog.logGetAPICallStartRecord(fnExecData)
    // API CALL HERE
    const sampleResponse = {
        "requisitionId": "PR123456",
        "requester": {
            "name": "Jane Doe",
            "email": "jane.doe@example.com"
        },
        "items": [
            {
                "itemId": "10",
                "description": "Laptop",
                "quantity": 1,
                "unitPrice": 1200.00,
                "currency": "USD"
            }
        ],
    }
    performanceLog.logAPIResponse(apiExecData, samplePath, JSON.stringify(sampleBody), JSON.stringify(sampleResponse));
    performanceLog.logEndTime(fnExecData)
}

module.exports = {
    callAPI_multi,
    callAPI_one,
}