export class ResponsePattern {
    status: number;
    headers: Object;
    body: Object;

    setStatus(status: number) {
        this.status = status;
        return this;
    }

    setHeaders(headers: Object) {
        this.headers = headers;
        return this;
    }

    setBody(body: Object) {
        this.body = body;
        return this;
    }
}