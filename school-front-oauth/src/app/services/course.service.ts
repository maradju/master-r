import { Injectable } from '@angular/core';
import { Course } from '../common/course';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private baseUrl = 'http://skola.test:8088/api/courses';

  constructor(private httpClient: HttpClient) { }

  getCourseList(): Observable<Course[]> {

    return this.httpClient.get<Course[]>(this.baseUrl);

  }

  searchCourses(theKeyword: string): Observable<Course[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.httpClient.get<GetResponse>(searchUrl).pipe(
      map(response => response._embedded.courses)
    );
    
  }

  
  getCourse(theCourseId: number): Observable<Course> {
    const courseUrl = `${this.baseUrl}/${theCourseId}`;

    return this.httpClient.get<Course>(courseUrl);
  }

  save(course: Course): Observable<any> {
    
    
    const courseUrl = `${this.baseUrl}`;

    return this.httpClient.post<Course>(courseUrl, course);    
  }

  deleteCourse(theCourseId: number) {
    
    const courseUrl = `${this.baseUrl}/${theCourseId}`;

    return this.httpClient.delete(courseUrl);
  }

  updateCourse(theCourseId: number, value: any) : Observable<Object> {
     
      const courseUrl = `${this.baseUrl}/${theCourseId}`;

      return this.httpClient.put(courseUrl, value);
  }

}

  interface GetResponse {
   _embedded: {
     courses: Course[];
    }
  }