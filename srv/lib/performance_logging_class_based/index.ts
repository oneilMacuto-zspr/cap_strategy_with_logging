
import { randomUUID } from 'crypto';
import cds from '@sap/cds';
const constants = require("./constants")
const { getCurrentTime, formatHrTimeToHHMMSS } = require("./helper")

type ExecutionType = {
  uuid: string;
  start: [number, number];
};

export class PerformanceLogger {
  private arrExecutionKeys: ExecutionType[] = [];

  constructor(private moduleName: string, private logLevel: string = constants.LOG_LEVEL) {}

  private getLogger() {
    return cds.log(this.moduleName, this.logLevel);
  }

  logStartTime(serviceName: string, functionName: string = constants.BLANK): string {
    const LOG = this.getLogger();
    const fnName = functionName ? ` - ${functionName}` : constants.BLANK;
    LOG.info(`${serviceName}${fnName}${constants.EXEC_TIME}${getCurrentTime()}`);
    const uuid = randomUUID();
    const start = process.hrtime();
    this.arrExecutionKeys.push({ uuid, start });
    return uuid;
  }

  logEndTime(serviceName: string, uuid: string, functionName: string = constants.BLANK): void {
    const LOG = this.getLogger();
    const start = this.arrExecutionKeys.find((r) => r.uuid === uuid)?.start;
    const timeDiff = process.hrtime(start);
    const timeTaken = formatHrTimeToHHMMSS(timeDiff);
    const fnName = functionName ? ` - ${functionName}` : constants.BLANK;
    LOG.info(`${serviceName}${fnName}${constants.END_TIME}${getCurrentTime()}`);
    LOG.info(`${serviceName}${fnName}${constants.TOTAL_TIME_TAKEN}${timeTaken}`);
    this.deleteExecutionKey(uuid);
  }

  logGetAPICallStartKey(): string {
    const uuid = randomUUID();
    const start = process.hrtime();
    this.arrExecutionKeys.push({ uuid, start });
    return uuid;
  }

  logAPIResponse(serviceName: string, functionName: string, uuid: string, url: string, jsonBody: string, resStatus: number, jsonResponse: string): void {
    const LOG = this.getLogger();
    const start = this.arrExecutionKeys.find((r) => r.uuid === uuid)?.start;
    const timeDiff = process.hrtime(start);
    const timeTaken = formatHrTimeToHHMMSS(timeDiff);
    const fnName = functionName ? ` - ${functionName}` : constants.BLANK;
    const logDetails = {
      log: `${serviceName}${fnName}${constants.API_EXEC_SUCCESS}`,
      'Request URL': url,
      'Request Body': jsonBody,
      'Response Status Code': resStatus,
      'Response Message': jsonResponse,
      'Time Taken to Complete': timeTaken,
    };
    LOG.info(JSON.stringify(logDetails));
    this.deleteExecutionKey(uuid);
  }

  logAPIError(serviceName: string, functionName: string, uuid: string, url: string, jsonBody: string, errStatus: number, jsonErrMessage: string): void {
    const LOG = this.getLogger();
    const start = this.arrExecutionKeys.find((r) => r.uuid === uuid)?.start;
    const timeDiff = process.hrtime(start);
    const timeTaken = formatHrTimeToHHMMSS(timeDiff);
    const fnName = functionName ? ` - ${functionName}` : constants.BLANK;
    const logDetails = {
      log: `${serviceName}${fnName}${constants.API_EXEC_FAILED}`,
      'Request URL': url,
      'Request Body': jsonBody,
      'Error Status Code': errStatus,
      'Error Message': jsonErrMessage,
      'Time Taken to Complete': timeTaken,
    };
    LOG.info(JSON.stringify(logDetails));
    this.deleteExecutionKey(uuid);
  }

  private deleteExecutionKey(uuid: string): void {
    const index = this.arrExecutionKeys.findIndex((r) => r.uuid === uuid);
    if (index !== -1) {
      this.arrExecutionKeys.splice(index, 1);
    }
  }
}
