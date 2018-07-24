import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Funcionario } from './funcionario';
import { Campus } from '../campus/campus';

const httpOptions = {
	headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class FuncionarioService {

  private _url: string = 'http://localhost:3000/funcionarios';
  private _urlCampus: string = 'http://localhost:3000/campus';
  
  private _handleError<T>(operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			console.error(error);
			console.error(error, `Operation: --> ${operation} <--`);
			console.log(`${operation} failed: ${error.message}`);
			return of(result as T)
		}
	}

  constructor(private _http: HttpClient) { }

  add(funcionario: Funcionario): Observable<Funcionario> {
		return this._http.post<Funcionario>(this._url, funcionario, httpOptions)
			.pipe(
				tap(funcionario => console.log('add funcionario')),
				catchError(this._handleError<Funcionario>('ERROR: ADD funcionario'))
			);
  }
  
  getFuncionarios(): Observable<Funcionario[]> {
		return this._http.get<Funcionario[]>(this._url)
			.pipe(
				tap(funcionario => console.log('Fetched Funcionario!!!')),
				catchError(this._handleError('getFuncionario', []))
			);
  }
  
  getCampus(): Observable<Campus[]> {
		return this._http.get<Campus[]>(this._urlCampus)
			.pipe(
				tap(() => console.log('Fetched campus!!!')),
				catchError(this._handleError('getCamppus', []))
			);
  }
  
  getFuncionario(funcionario: Funcionario | number): Observable<Funcionario> {
		const id = typeof funcionario === 'number' ? funcionario : funcionario.id;
		const url = `${this._url}/${id}`;
		return this._http.get<Funcionario>(url)
			.pipe(
				tap(() => console.log('')),
				catchError(this._handleError<Funcionario>('get'))
			);
  }
  
  put(funcionario: Funcionario): Observable<Funcionario> {
		return this._http.put<Funcionario>(this._url, funcionario, httpOptions)
			.pipe(
				tap(() => console.log('')),
				catchError(this._handleError<Funcionario>(''))
			);
	}

	delete(funcionario: Funcionario | number): Observable<Funcionario> {
		const id = typeof funcionario === 'number' ? funcionario : funcionario.id ;
		const url = `${this._url}/${id}`;
		return this._http.delete<Funcionario>(url , httpOptions)
			.pipe(
				tap(funcionario => console.log('')),
				catchError(this._handleError<Funcionario>(''))
			);
	}

	search(str: String): Observable<Funcionario[]> {
		if (!str.trim()) return of([]);
		return this._http.get<Funcionario[]>(this._url)
			.pipe(
				tap(() => console.log('Fetched Funcionario!')),
				catchError(this._handleError('searchFuncionario', []))
			);
	}
}