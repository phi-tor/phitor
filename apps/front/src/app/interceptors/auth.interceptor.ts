import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from "rxjs";
import {inject} from "@angular/core";
import {Router} from "@angular/router";

/**
 * Permits to authenticate requests, and returns a redirection to login page if the user isn't logged in (if server
 * returns HTTP 401).
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router)
  const request = req.clone({withCredentials: true})

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        router.navigateByUrl('auth?action=login');
      }
      return throwError(error);
    })
  );
};
