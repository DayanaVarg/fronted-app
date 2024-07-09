import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Person } from '../model/person';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private http = inject(HttpClient);

  list(){
    return this.http.get<Person[]>('http://localhost:8080/api/people/list');
  }

  get(id: String){
    return this.http.get<Person>(`http://localhost:8080/api/people/list/${id}`);
  }

  create(person:any){
    return this.http.post<Person>('http://localhost:8080/api/people/add', person);
  }

  update(id: String, person:Person){
    return this.http.put<Person>(`http://localhost:8080/api/people/${id}`, person);
  }

  delete(id: String){
    return this.http.delete<void>(`http://localhost:8080/api/people/${id}`);
  }
}
