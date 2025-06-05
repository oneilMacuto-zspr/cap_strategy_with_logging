import cds from '@sap/cds';
const constants = require("./constants")
const { getCurrentTime, formatHrTimeToHHMMSS } = require("./helper")

type ExecutionType = {
  start: [number, number];
  serviceName: string;
  functionName: string;
};

export class ApplicationLogger {
  constructor(private moduleName: string, private logLevel: string = constants.LOG_LEVEL) {

  }

  private getLogger() {
    return cds.log(this.moduleName, this.logLevel);
  }

  logStartTime(serviceName: string, functionName: string = constants.BLANK): ExecutionType {
    const LOG = this.getLogger();
    const fnName = functionName ? ` - ${functionName}` : constants.BLANK;
    LOG.info(`${serviceName}${fnName}${constants.EXEC_TIME}${getCurrentTime()}`);
    const start = process.hrtime();
    const execRecord: ExecutionType = { start, serviceName, functionName }
    return execRecord;
  }

  logEndTime(execRecord: ExecutionType): void {
    const LOG = this.getLogger();
    const start = execRecord.start;
    const timeDiff = process.hrtime(start);
    const timeTaken = formatHrTimeToHHMMSS(timeDiff);
    const fnName = execRecord.functionName ? ` - ${execRecord.functionName}` : constants.BLANK;
    LOG.info(`${execRecord.serviceName}${fnName}${constants.END_TIME}${getCurrentTime()}`);
    LOG.info(`${execRecord.serviceName}${fnName}${constants.TOTAL_TIME_TAKEN}${timeTaken}`);
  }

  logGetAPICallStartRecord(execRecord: ExecutionType): ExecutionType {
    const start = process.hrtime();
    const apiExecRecord: ExecutionType = { start, serviceName: execRecord.serviceName, functionName: execRecord.functionName }
    return apiExecRecord;
  }

  logAPIResponse(execRecord: ExecutionType, url: string, jsonBody: string, resStatus: number, jsonResponse: string): void {
    const LOG = this.getLogger();
    const start = execRecord.start;
    const timeDiff = process.hrtime(start);
    const timeTaken = formatHrTimeToHHMMSS(timeDiff);
    const fnName = execRecord.functionName ? ` - ${execRecord.functionName}` : constants.BLANK;
    const logDetails = {
      log: `${execRecord.serviceName}${fnName}${constants.API_EXEC_SUCCESS}`,
      'Request URL': url,
      'Request Body': jsonBody,
      'Response Status Code': resStatus,
      'Response Message': jsonResponse,
      'Time Taken to Complete': timeTaken,
    };
    LOG.info(JSON.stringify(logDetails));
  }

  logAPIError(execRecord: ExecutionType, url: string, jsonBody: string, errStatus: number, jsonErrMessage: string): void {
    const LOG = this.getLogger();
    const start = execRecord.start;
    const timeDiff = process.hrtime(start);
    const timeTaken = formatHrTimeToHHMMSS(timeDiff);
    const fnName = execRecord.functionName ? ` - ${execRecord.functionName}` : constants.BLANK;
    const logDetails = {
      log: `${execRecord.serviceName}${fnName}${constants.API_EXEC_FAILED}`,
      'Request URL': url,
      'Request Body': jsonBody,
      'Error Status Code': errStatus,
      'Error Message': jsonErrMessage,
      'Time Taken to Complete': timeTaken,
    };
    LOG.info(JSON.stringify(logDetails));
  }
}
