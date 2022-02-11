import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../modules/user.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly userSubject: Subject<boolean> = new Subject;

  constructor(private readonly http: HttpClient) { }

  handleError(error: any): Observable<any> {
    console.error(error);

    alert('Terjadi kesalahan!');

    return EMPTY;
  }

  public getAll(): Observable<User[]> {
    return this.http.get<User[]>('/api/users')
  }

  public getById(id: string): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`)
  }

  public save(user: User): Observable<any> {
    if (user.id) {
      return this.http.put<any>('/api/users', user)
      .pipe(
        map(()=> this.userSubject.next(true))
      )
    } else {
      return this.http.post<any>(`/api/users`, user)
      .pipe(
        map(()=> this.userSubject.next(true))
      )
    }
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(`/api/users/${id}`)
    .pipe(
      map(()=> this.userSubject.next(true))
    )
  }

  public listUpdated(): Observable<boolean> {
    return this.userSubject.asObservable();
  }
}
