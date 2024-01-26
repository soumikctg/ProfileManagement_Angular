import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TeachersService } from '../teachers.service';
import { Teachers } from '../teacherModel';


@Component({
  selector: 'app-teacher-form',
  standalone: true,
  imports: [MatDialogModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './teacher-form.component.html',
  styleUrl: './teacher-form.component.css'
})
export class TeacherFormComponent {
  teacherForm : FormGroup;

  constructor(private builder: FormBuilder, private teacherService: TeachersService, private dialogRef: MatDialogRef<TeacherFormComponent>){
    this.teacherForm = this.builder.group({
      Name : '',
      Contact : '',
      Address: '',
      Department: ''
    });
  }

  onSubmit(){
    const newTeacher = this.teacherForm.value;
    this.teacherService.addTeacher(<Teachers> newTeacher).subscribe( result => {
      alert("User added Successfully")
      this.teacherForm.reset();
      this.dialogRef.close();
      // window.location.reload();
    })
  }

  onClose(){
    this.dialogRef.close();
  }
}
