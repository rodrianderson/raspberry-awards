import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ParametersFilter } from '../model/parameters.model';
import { Injectable } from '@angular/core';
import { UtilsService } from '../utils/utils.service';

@Injectable({
  providedIn: 'root',
})
export class RaspberryService<T> {
  private baseURL = environment.api;

  constructor(private http: HttpClient, private utils: UtilsService) {}

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  getMovies(
    code: string,
    parameters: ParametersFilter
  ): Observable<T> {
    let queryParams = new HttpParams();
    code = '='.concat(code);

    if (!this.utils.isEmpty(parameters)) {
    
      if(parameters.page || parameters.page === 0) {
        queryParams = queryParams.append('page', parameters.page)
      }
      if(parameters.size) {
        queryParams = queryParams.append('size', parameters.size)
      }
      if(parameters.winner != undefined) {
        queryParams = queryParams.append('winner', parameters.winner)
      }
      if(parameters.year) {
        queryParams = queryParams.append('year', parameters.year)
      }
      
      return this.http
        .get<T>(`${this.baseURL}`, {
          params: queryParams,
        })
        .pipe(catchError(this.handleError<T>('Error Movies')));
    } else {
      return this.http
        .get<T>(`${this.baseURL}`.concat('?projection').concat(code))
        .pipe(catchError(this.handleError<T>('Error Movies')));
    }
  }

}
