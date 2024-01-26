import { Component, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { Teachers } from '../teacherModel';
import { TeachersService } from '../teachers.service';
import { TeacherFormComponent } from '../teacher-form/teacher-form.component';
import { UpdateTeacherComponent } from '../update-teacher/update-teacher.component';
import { PartialUpdateTeacherComponent } from '../partial-update-teacher/partial-update-teacher.component';

@Component({
  selector: 'app-teacher-tab',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatTable,
    MatTableModule,
    MatDialogModule,
    MatRippleModule,
    MatPaginatorModule,
    MatPaginator,
    MatMenuModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
    CommonModule,
  ],
  templateUrl: './teacher-tab.component.html',
  styleUrl: './teacher-tab.component.css',
})
export class TeacherTabComponent {
  @ViewChild(MatTable)
  table!: MatTable<Teachers[]>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = [
    'serialNumber',
    'Id',
    'Name',
    'Contact',
    'Address',
    'Department',
    'Actions',
  ];
  newTeachers = new MatTableDataSource<Teachers>();

  pageNumber = 1;
  pageSize = 5;
  totalTeachers!: number;

  singleTeacherName!: string;
  singleTeacher!: Teachers;

  constructor(
    private dialog: MatDialog,
    private teacherService: TeachersService
  ) {
    this.loadPagedTeachers();
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.pageNumber = pageEvent.pageIndex + 1;
    this.pageSize = pageEvent.pageSize;
    this.loadPagedTeachers();
  }

  loadPagedTeachers() {
    this.teacherService
      .getPagedTeachers(this.pageNumber, this.pageSize)
      .subscribe((result) => {
        this.newTeachers.data = result.Teachers;
        this.totalTeachers = result.Total;
      });
  }

  addStudentForm() {
    this.dialog.open(TeacherFormComponent);
  }

  getTeacherByName() {
    this.teacherService
      .getTeacherByName(this.singleTeacherName)
      .subscribe((teacher) => {
        this.singleTeacher = teacher;
      });
  }

  updateTeacher(teacher: Teachers) {
    this.dialog.open(UpdateTeacherComponent, {
      data: { teacher },
    });
  }

  partialUpdateTeacher(teacher: Teachers) {
    this.dialog.open(PartialUpdateTeacherComponent, {
      data: { teacher },
    });
  }

  deleteTeacher(teacherId: string) {
    this.teacherService.deleteTeacher(teacherId).subscribe(() => {
      alert('User Deleted Successfully');
    });
  }
}
