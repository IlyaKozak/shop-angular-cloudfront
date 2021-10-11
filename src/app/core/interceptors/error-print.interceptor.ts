import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NotificationService } from '../notification.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class ErrorPrintInterceptor implements HttpInterceptor {
  constructor(private readonly notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap({
        error: ({ status, error: { message } }) => {
          this.notificationService.showError(
            `Request failed with HTTP Status ${status}: 
            ${
              status === 403 ? 'Forbidden' : message
            }. Check the console for the details`,
            0
          );
        },
      })
    );
  }
}
