import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Students } from '../studentModel';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [MatDialogModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatSelectModule,MatInputModule, ReactiveFormsModule],
  templateUrl: './student-form.component.html',
  styleUrl: './student-form.component.css'
})
export class StudentFormComponent {

  studentForm : FormGroup;

  constructor(private builder: FormBuilder, private studentService: StudentsService, private dialogRef: MatDialogRef<StudentFormComponent>){
    this.studentForm = this.builder.group({
      FirstName : '',
      LastName : '',
      Contact : '',
      Address: '',
      Department: ''
    });
  }

  onSubmit(){
    const newStudent = this.studentForm.value;
    this.studentService.addStudent(<Students> newStudent).subscribe( result => {
      alert("User added Successfully")
      this.studentForm.reset();
      this.dialogRef.close();
      window.location.reload();
    })
  }

  onClose(){
    this.dialogRef.close();
  }
}
