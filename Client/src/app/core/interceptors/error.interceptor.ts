import { NavigationExtras, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error) {
          if (error.status === 400) {
            if (error.errors) {
              throw error.errors;
            } else {
              this.toastr.error(error.error.message);
            }
          }

          if (error.status === 401) {
            this.toastr.error(error.error.message);
          }

          if (error.status === 404) {
            this.router.navigate(['/not-found']);
          }

          if (error.status === 500) {
            const navigationExtras: NavigationExtras = {state: {error: error.error}};
            this.router.navigate(['/server-error'], navigationExtras);
          }
        }
        return throwError(error);
      })
    );
  }
}
