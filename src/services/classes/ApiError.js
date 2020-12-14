class ApiError extends Error {
    constructor(message,code,severity){
        super(message)
        this.httpStatusCode=code
        this.message=message;
        this.severity=severity
    }
}

module.exports = ApiError