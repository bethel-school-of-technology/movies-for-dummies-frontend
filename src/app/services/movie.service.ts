import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Movie } from '../models/movie';

const apiUrl = 'http://localhost:3001/api/movie/';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  getPosts() {
    throw new Error("Method not implemented.");
  }

  constructor(private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(apiUrl)
      .pipe(
        tap(_ => this.log('fetched Movies')),
        catchError(this.handleError('getMovies', []))
      );
  }

  getMovie(id: any): Observable<Movie> {
    const url = `${apiUrl}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(_ => console.log(`fetched movie by id=${id}`)),
      catchError(this.handleError<Movie>(`getMovie id=${id}`))
    );
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(apiUrl, movie).pipe(
      tap((prod: Movie) => console.log(`added movie w/ id=${movie.id}`)),
      catchError(this.handleError<Movie>('addMovie'))
    );
  }

  updateMovie(id: any, movie: Movie): Observable<any> {
    const url = `${apiUrl}/${id}`;
    return this.http.put(url, movie).pipe(
      tap(_ => console.log(`updated movie id=${id}`)),
      catchError(this.handleError<any>('updateMovie'))
    );
  }

  deleteMovie(id: any): Observable<Movie> {
    const url = `${apiUrl}/${id}`;
    return this.http.delete<Movie>(url).pipe(
      tap(_ => console.log(`deleted movie id=${id}`)),
      catchError(this.handleError<Movie>('deleteMovie'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
