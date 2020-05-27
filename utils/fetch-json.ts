import 'abort-controller/polyfill';
import { BaseError } from 'make-error-cause';
import { throwError, Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, catchError } from 'rxjs/operators';

export class FetchErrorResponse extends BaseError {
  url?: string;
  input?: string | Request;
  response?: Response;

  constructor({
    input,
    response,
    cause,
  }: Pick<FetchErrorResponse, 'input' | 'response' | 'cause'>) {
    const url =
      response?.url ||
      (typeof input === 'string' && input) ||
      (input as Request | undefined)?.url;

    let message = `Error fetching ${url} with status code ${response?.status}`;

    if (cause) {
      message += ` AND original error: ${String(cause)}`;
    }

    super(message, cause);

    this.url = url;
    this.input = input;
    this.response = response;
  }
}

export const fetchJson = <T = any>(input: string | Request): Observable<T> => {
  return fromFetch(input).pipe(
    catchError((cause) => {
      return throwError(new FetchErrorResponse({ input, cause }));
    }),
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return throwError(new FetchErrorResponse({ input, response }));
      }
    })
  );
};
