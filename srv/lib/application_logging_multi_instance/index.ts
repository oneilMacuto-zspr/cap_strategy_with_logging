import cds from '@sap/cds';
const constants = require("./constants")
const { getCurrentTime, formatHrTimeToHHMMSS } = require("./helper")

type LoggerType = {
  info: (...args: any[]) => void;
  warn: (...args: any[]) => void;
  error: (...args: any[]) => void;
  debug: (...args: any[]) => void;
};

export class ApplicationLogger {
  private startTime: [number, number];
  public log: LoggerType;
  private logLevel: string;

  constructor(public moduleName: string, public serviceName: string, public functionName: string = constants.BLANK) {
    this.startTime = process.hrtime();
    this.log = this.getLogger();
    this.logLevel = constants.LOG_LEVEL;
    this.logStartTime();
  }

  private getLogger(): LoggerType {
    return cds.log(this.moduleName, this.logLevel);
  }

  private logStartTime() {
    const fnName = this.functionName ? ` - ${this.functionName}` : constants.BLANK;
    this.log.info(`${this.serviceName}${fnName}${constants.EXEC_TIME}${getCurrentTime()}`);
  }

  logEndTime() {
    const timeDiff = process.hrtime(this.startTime);
    const timeTaken = formatHrTimeToHHMMSS(timeDiff);
    const fnName = this.functionName ? ` - ${this.functionName}` : constants.BLANK;
    this.log.info(`${this.serviceName}${fnName}${constants.END_TIME}${getCurrentTime()}`);
    this.log.info(`${this.serviceName}${fnName}${constants.TOTAL_TIME_TAKEN}${timeTaken}`);
  }
}

export class APIExecutionLogger {
  private apiStartTime: [number, number];
  private functionName: string;
  private serviceName: string;
  private log: LoggerType;
  constructor(public appLogInstance: ApplicationLogger) {
    this.apiStartTime = process.hrtime();
    this.functionName = appLogInstance.functionName;
    this.serviceName = appLogInstance.serviceName;
    this.log = appLogInstance.log;
  }

  logAPIResponse(url: string, jsonBody: string, resStatus: number, jsonResponse: string): void {
    const start = this.apiStartTime;
    const timeDiff = process.hrtime(start);
    const timeTaken = formatHrTimeToHHMMSS(timeDiff);
    const fnName = this.functionName ? ` - ${this.functionName}` : constants.BLANK;
    const logDetails = {
      log: `${this.serviceName}${fnName}${constants.API_EXEC_SUCCESS}`,
      'Request URL': url,
      'Request Body': jsonBody,
      'Response Status Code': resStatus,
      'Response Message': jsonResponse,
      'Time Taken to Complete': timeTaken,
    };
    this.log.info(JSON.stringify(logDetails));
  }

  logAPIError(url: string, jsonBody: string, errStatus: number, jsonErrMessage: string): void {
    const start = this.apiStartTime;
    const timeDiff = process.hrtime(start);
    const timeTaken = formatHrTimeToHHMMSS(timeDiff);
    const fnName = this.functionName ? ` - ${this.functionName}` : constants.BLANK;
    const logDetails = {
      log: `${this.serviceName}${fnName}${constants.API_EXEC_FAILED}`,
      'Request URL': url,
      'Request Body': jsonBody,
      'Error Status Code': errStatus,
      'Error Message': jsonErrMessage,
      'Time Taken to Complete': timeTaken,
    };
    this.log.info(JSON.stringify(logDetails));
  }
}
