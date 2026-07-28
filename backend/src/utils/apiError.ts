export class ApiError extends Error {
  statusCode: number;
  errCode: string;

  constructor(statusCode: number, message: string, errCode: string = '') {
    super(message);
    this.statusCode = statusCode;
    this.errCode = errCode;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

export class BadRequestError extends ApiError {
  constructor(message = 'BadRequestError') {
    super(400, message);
  }
}

export class UnauthorizedError extends ApiError {
  constructor(message = 'UnauthorizedError', errCode = '') {
    super(401, message, errCode);
  }
}

export class ForbiddenError extends ApiError {
  constructor(message = 'ForbiddenError') {
    super(403, message);
  }
}

export class NotFoundError extends ApiError {
  constructor(message = 'NotFoundError') {
    super(404, message);
  }
}

export class MethodNotAllowed extends ApiError {
  constructor(message = 'MethodNotAllowed') {
    super(405, message);
  }
}

export class ConflictError extends ApiError {
  constructor(message = 'ConflictError') {
    super(409, message);
  }
}

export class PayloadTooLargeError extends ApiError {
  constructor(message = 'PayloadTooLargeError') {
    super(413, message);
  }
}

export class InternalServerError extends ApiError {
  constructor(message = 'InternalServerError') {
    super(500, message);
  }
}

export class BadGatewayError extends ApiError {
  constructor(message = 'BadGatewayError') {
    super(502, message);
  }
}
