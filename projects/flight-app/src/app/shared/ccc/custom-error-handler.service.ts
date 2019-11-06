import { Injectable, ErrorHandler } from '@angular/core';

@Injectable()
export class CustomErrorHandlerService implements ErrorHandler {
  
  constructor() { }

  handleError(error: any): void {
    console.log(
      '[Custom Error Handler]',
      error
    )
  }
}
