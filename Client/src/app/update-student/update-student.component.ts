import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StudentsService } from '../students.service';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Students } from '../studentModel';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update-student',
  standalone: true,
  imports: [MatToolbarModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './update-student.component.html',
  styleUrl: './update-student.component.css'
})
export class UpdateStudentComponent {

  studentForm : FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) private data : {student:Students}, private builder: FormBuilder, private studentService: StudentsService, private dialogRef: MatDialogRef<UpdateStudentComponent>){
    this.studentForm = this.builder.group({
      Id : '',
      FirstName : '',
      LastName : '',
      Contact : '',
      Address: '',
      Department: ''
    });
    this.updateForm();

    console.log(this.data.student);
  }
  student:Students=this.data.student;

  updateForm(){
    this.studentForm.setValue({
      Id : this.student.Id,
      FirstName : this.student.FirstName,
      LastName: this.student.LastName,
      Contact: this.student.Contact,
      Address: this.student.Address,
      Department: this.student.Department
    })
  }
  onSubmit(){
    const newStudent = this.studentForm.value;

    this.studentService.updateStudent(<Students> newStudent).subscribe( result => {
      alert("User Updated Successfully")
      console.log(result);
      this.studentForm.reset();
      this.dialogRef.close();
      // window.location.reload();
    })
  }

  onClose(){
    this.dialogRef.close();
  }
}
