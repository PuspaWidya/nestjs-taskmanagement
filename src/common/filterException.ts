import { HttpException, HttpStatus } from '@nestjs/common';

export class FilterException extends HttpException {
  /**
   * used to filter error responses
   * @example
   *
   * thror new FilterException(new Error("Something"))
   */
  constructor(error: any) {
    const { status, response, message } = error;
    const statusCode = status ?? HttpStatus.INTERNAL_SERVER_ERROR;
    super({ message, statusCode: null, ...response }, statusCode);
  }
}
