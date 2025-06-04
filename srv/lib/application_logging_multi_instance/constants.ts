module.exports = {
    BLANK: "",
    EXEC_TIME: " - Execution Start Time (UTC): ",
    END_TIME: " - Execution End Time (UTC): ",
    TOTAL_TIME_TAKEN: " - Total Time Taken to Complete Processing (HH:MM:SS): ",
    API_EXEC_SUCCESS: " - API Call Execution Successful:",
    API_EXEC_FAILED: " - API Call Execution Failed:",
    LOG_LEVEL: process.env["ENV"] === "LOCAL" ? "DEBUG" : "ERROR", // dynamic logging depending on environment
}