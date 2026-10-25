type ErrorInfo = {
  code?: string;
  message?: string;
  cause?: ErrorInfo;
  originalCode?: string;
  originalMessage?: string;
};

export class PrismaError extends Error {
  statusCode: number;
  errCode: string;
  cause?: unknown;

  constructor(statusCode: number, message: string, errCode: string = '') {
    super(message);
    this.statusCode = statusCode;
    this.errCode = errCode;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

class DatabaseQuotaExceeded extends PrismaError {
  constructor(message = 'DatabaseQuotaExceeded') {
    super(503, message, 'DATABASE_QUOTA_EXCEEDED');
  }
}

class DatabaseUnavailable extends PrismaError {
  constructor(message = 'DatabaseUnavailable') {
    super(503, message, 'DATABASE_UNAVAILABLE');
  }
}

class ResourceAlreadyExists extends PrismaError {
  constructor(message = 'ResourceAlreadyExists') {
    super(409, message, 'RESOURCE_ALREADY_EXISTS');
  }
}

class ResourceNotFound extends PrismaError {
  constructor(message = 'ResourceNotFound') {
    super(404, message, 'RESOURCE_NOT_FOUND');
  }
}

class ForeignKeyConstraint extends PrismaError {
  constructor(message = 'ForeignKeyConstraint') {
    super(409, message, 'FOREIGN_KEY_CONSTRAINT');
  }
}

class RelationConstraintViolation extends PrismaError {
  constructor(message = 'RelationConstraintViolation') {
    super(409, message, 'RELATION_CONSTRAINT_VIOLATION');
  }
}

export function classifyPrismaError(error: unknown): PrismaError | null {
  const err = error as ErrorInfo;
  const cause = err?.cause;

  // PrismaPgAdapter có thể bọc lỗi PostgreSQL trong cause.
  const dbCode = cause?.code ?? cause?.originalCode;
  const dbMessage = cause?.originalMessage ?? cause?.message ?? '';

  // PostgreSQL: quota / tài nguyên hệ thống.
  if (dbCode === '53000' || /exceeded the quota/i.test(dbMessage)) {
    return new DatabaseQuotaExceeded(
      'Dịch vụ tạm thời không khả dụng. Vui lòng thử lại sau.'
    );
  }

  // Prisma known request errors.
  const prismaCode = err?.code;

  switch (prismaCode) {
    case 'P2002':
      return new ResourceAlreadyExists('Dữ liệu đã tồn tại.');

    case 'P2025':
      return new ResourceNotFound('Không tìm thấy dữ liệu yêu cầu');
    case 'P2003':
      return new ForeignKeyConstraint('Dữ liệu liên quan không hợp lệ');

    case 'P2014':
      return new RelationConstraintViolation(
        'Thao tác vi phạm ràng buộc dữ liệu'
      );
  }

  // Prisma initialization / connectivity errors.
  if (prismaCode === 'P1001' || prismaCode === 'P1002') {
    return new DatabaseUnavailable(
      'Không thể kết nối database. Vui lòng thử lại sau.'
    );
  }

  return null;
}
