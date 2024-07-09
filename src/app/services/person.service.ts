import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private http = inject(HttpClient);

  list(){
    return this.http.get('http://localhost:8080/api/people/list');
  }

  get(id: String){
    return this.http.get(`http://localhost:8080/api/people/list/${id}`);
  }

  create(person:any){
    return this.http.post('http://localhost:8080/api/people/add/', person);
  }

  update(id: String, person:any){
    return this.http.put(`http://localhost:8080/api/people/${id}`, person);
  }

  delete(id: String){
    return this.http.delete(`http://localhost:8080/api/people/${id}`);
  }
}
