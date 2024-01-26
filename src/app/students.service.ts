import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Students } from './studentModel';
import { pageItems } from './pageItemModel';
import { Observable } from 'rxjs';
import * as http from 'http';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http:HttpClient) { }

  apiUrl = "http://localhost:5280";

  addStudent(student:Students): Observable<Students>{
    return this.http.post<Students>(this.apiUrl+"/api/Student/AddStudent", student);
  }

  getAllStudents(){
    return this.http.get<Students[]>(`${this.apiUrl}/api/Student/GetStudents`)
  }
  
  getPagedStudents(page:number, pageSize: number){
    return this.http.get<pageItems>(`${this.apiUrl}/api/Student/Pagination?page=${page}&pageSize=${pageSize}`)
  }

  updateStudent(student:Students): Observable<Students>{
    return this.http.put<Students>(`${this.apiUrl}/api/Student/UpdateStudent?id=${student.Id}`, student);
  }
  
  deleteStudent(studentId:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/api/Student/DeleteStudent?id=${studentId}`);
  }
}
