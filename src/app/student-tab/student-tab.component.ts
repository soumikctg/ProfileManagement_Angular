import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { StudentFormComponent } from '../student-form/student-form.component';
import { StudentsService } from '../students.service';
import { Students } from '../studentModel';
import { MatRippleModule } from '@angular/material/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';

import { MatMenuModule } from '@angular/material/menu';
import { UpdateStudentComponent } from '../update-student/update-student.component';
import { PartialUpdateStudentComponent } from '../partial-update-student/partial-update-student.component';

@Component({
  selector: 'app-student-tab',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTable,
    MatTableModule,
    MatDialogModule,
    MatRippleModule,
    MatPaginatorModule,
    MatPaginator,
    MatMenuModule,
    MatButtonModule
  ],
  templateUrl: './student-tab.component.html',
  styleUrl: './student-tab.component.css',
})
export class StudentTabComponent {
  @ViewChild(MatTable)
  table!: MatTable<Students[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'serialNumber',
    'Id',
    'FirstName',
    'LastName',
    'Contact',
    'Address',
    'Department',
    'Actions'
  ];
  newStudents = new MatTableDataSource<Students>();
  
  pageNumber=1;
  pageSize = 5;
  totalStudents!:number;
  constructor(
    private dialog: MatDialog,
    private studentService: StudentsService,
  ) {
    this.loadPagedStudents();

  }

  handlePageEvent(pageEvent: PageEvent){
    this.pageNumber=pageEvent.pageIndex+1;
    this.pageSize=pageEvent.pageSize;
    this.loadPagedStudents();
  }
  loadPagedStudents() {
    this.studentService
      .getPagedStudents(this.pageNumber, this.pageSize)
      .subscribe((result) => {
        this.newStudents.data = result.Students;
        this.totalStudents=result.Total;
      });
  }

  addStudentForm() {
    this.dialog.open(StudentFormComponent);
  }

  updateStudent(student:Students){
    this.dialog.open(UpdateStudentComponent, {
      data: {student}
    });
  }

  partialUpdateStudent(student:Students){
    this.dialog.open(PartialUpdateStudentComponent, {
      data: {student}
    });
  }

  deleteStudent(studentId:string){
    this.studentService.deleteStudent(studentId).subscribe(
      () => {
        alert("User Deletede Successfully");
      }
    );
  }
}
