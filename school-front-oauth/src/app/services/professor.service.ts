import { Injectable } from '@angular/core';
import { Professor } from '../common/professor';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {


  private baseUrl = 'http://localhost:8088/api/professors';

  constructor(private httpClient: HttpClient) { }

  getProfessorList(): Observable<Professor[]> {

    return this.httpClient.get<Professor[]>(this.baseUrl);

  }

  searchProfessors(theKeyword: string): Observable<Professor[]> {
    const searchUrl = `${this.baseUrl}/search/findByFirstNameContaining?first_name=${theKeyword}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.professors)
    );
    
  }

  
  getProfessor(theProfessorId: number): Observable<Professor> {
    const professorUrl = `${this.baseUrl}/${theProfessorId}`;

    return this.httpClient.get<Professor>(professorUrl);
  }

  save(professor: Professor): Observable<any> {
    
    
    const professorUrl = `${this.baseUrl}`;

    return this.httpClient.post<Professor>(professorUrl, professor);    
  }

  deleteProfessor(theProfessorId: number) {
    
    const professorUrl = `${this.baseUrl}/${theProfessorId}`;

    return this.httpClient.delete(professorUrl);
  }

  updateProfessor(theProfessorId: number, value: any) : Observable<Object> {
     
      const professorUrl = `${this.baseUrl}/${theProfessorId}`;

      return this.httpClient.put(professorUrl, value);
  }

}

  interface GetResponse {
   _embedded: {
     professors: Professor[];
    }
  }