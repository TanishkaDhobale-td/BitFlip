// backend/src/services/alertEngine.js

const NORMAL_MAX = 3000;
const WARNING_MAX = 3800;
const CRITICAL_MIN = 3800;

function checkRPMThreshold(rpm) {
    if (rpm <= NORMAL_MAX) {
        return {
            status: "NORMAL",
            color: "green",
            message: "Spindle running normally"
        };
    } 
    
    if (rpm > NORMAL_MAX && rpm <= WARNING_MAX) {
        return {
            status: "WARNING",
            color: "yellow",
            message: "RPM entering high stress zone"
        };
    }

    if (rpm > CRITICAL_MIN) {
        return {
            status: "CRITICAL",
            color: "red",
            message: "DANGER! RPM exceeded safe limit"
        };
    }
}

module.exports = { checkRPMThreshold };