export class ErrorDTO {
    statusCode: number;
    code: string;
    message: string;

    constructor(statusCode: number, code: string, message: string) {
        this.statusCode = statusCode;
        this.code = code;
        this.message = message;
    }
}