import { Injectable } from '@angular/core';
import { Student } from '../common/student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseUrl = 'http://skola.test:8088/api/students';

  constructor(private httpClient: HttpClient) { }

  getStudentList(): Observable<Student[]> {

    return this.httpClient.get<Student[]>(this.baseUrl);
  }

  searchStudents(theKeyword: string): Observable<Student[]> {

    const searchUrl = `${this.baseUrl}/search/findByFirstNameContaining?firstName=${theKeyword}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.students)
    );
    
  }

  
  getStudent(theStudentId: number): Observable<Student> {

    const studentUrl = `${this.baseUrl}/${theStudentId}`;

    return this.httpClient.get<Student>(studentUrl);
  }

  save(student: Student): Observable<any> {
    
    
    const studentUrl = `${this.baseUrl}`;

    return this.httpClient.post<Student>(studentUrl, student);    
  }

  deleteStudent(theStudentId: number) {
    
    const studentUrl = `${this.baseUrl}/${theStudentId}`;

    return this.httpClient.delete(studentUrl);
  }

  updateStudent(theStudentId: number, value: any) : Observable<Object> {
     
      const studentUrl = `${this.baseUrl}/${theStudentId}`;

      return this.httpClient.put(studentUrl, value);
  }

}

  interface GetResponse {
   _embedded: {
     students: Student[];
    }
  }