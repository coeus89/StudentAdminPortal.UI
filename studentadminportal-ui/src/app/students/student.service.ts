import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Student } from '../models/api-models/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private baseApiUrl = 'https://localhost:7220';


  constructor(private httpClient : HttpClient) { }

  getStudents() : Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseApiUrl + '/students')  // Watch out. Route text is case sensitive
  }

  getStudent(studentId: string) {
    return this.httpClient.get<Student>(this.baseApiUrl + "/students/" + studentId)
  }
}
