import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teachers } from './teacherModel';
import { pageItems } from './pageItemModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  constructor(private http: HttpClient) { }
  apiUrl= "http://localhost:5280";

  addTeacher(teacher: Teachers):Observable<Teachers>{
    return this.http.post<Teachers>(`${this.apiUrl}/api/Teacher/AddTeacher`, teacher);
  }
  getPagedTeachers(page:number, pageSize: number){
    return this.http.get<pageItems>(`${this.apiUrl}/api/Teacher/PaginationTeacher?page=${page}&pageSize=${pageSize}`);
  }

  getTeacherByName(teacherName:string):Observable<Teachers>{
    return this.http.get<Teachers>(`${this.apiUrl}/api/Teacher/GetTeacherByName?name=${teacherName}`);
  }

  updateTeacher(teacher:Teachers): Observable<Teachers>{
    return this.http.put<Teachers>(`${this.apiUrl}/api/Teacher/UpdateTeacher?id=${teacher.Id}`, teacher);
  }
  
  deleteTeacher(teacherId:string):Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/api/Teacher/DeleteTeacher?id=${teacherId}`);
  }
}
