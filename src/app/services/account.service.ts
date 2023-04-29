import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url = "http://localhost:8080/api/v1/account";

  constructor(private http: HttpClient) { }

  getAllAccount(): Observable<Account[]> {
    return this.http.get<any[]>(this.url).pipe(
      map(res => {
        return res.map(jsonAccount => {
          const account = new Account();
          account.loadFromJson(jsonAccount);
          return account;
        });
      }),
      catchError(error => {
        console.error('Une erreur s\'est produite lors de la récupération des comptes.', error);
        return throwError('Une erreur s\'est produite. Veuillez réessayer plus tard.');
      })
    );
  }

  deleteAccount(id:number): Observable<Object>{
    return this.http.delete(this.url+"/"+id)
  }

  createAccount(account:Account): Observable<Object>{
    return this.http.post(this.url,account)
  }

  updateAccount(account:Account): Observable<Object>{
    return this.http.put(this.url,account)
  }
}
