import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Students } from '../studentModel';
import { StudentsService } from '../students.service';
import { UpdateStudentComponent } from '../update-student/update-student.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-partial-update-student',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './partial-update-student.component.html',
  styleUrl: './partial-update-student.component.css',
})
export class PartialUpdateStudentComponent {
  studentForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { student: Students },
    private builder: FormBuilder,
    private studentService: StudentsService,
    private dialogRef: MatDialogRef<UpdateStudentComponent>
  ) {
    this.studentForm = this.builder.group({
      Id: '',
      FirstName: '',
      LastName: '',
      Contact: '',
      Address: '',
      Department: '',
    });
    this.updateForm();
  }
  student: Students = this.data.student;

  updateForm() {
    this.studentForm.setValue({
      Id: this.student.Id,
      FirstName: this.student.FirstName,
      LastName: this.student.LastName,
      Contact: this.student.Contact,
      Address: this.student.Address,
      Department: this.student.Department,
    });
  }
  onSubmit() {
    const newStudent = this.studentForm.value;

    this.studentService
      .updateStudent(<Students>newStudent)
      .subscribe((result) => {
        alert('User Updated Successfully');
        this.studentForm.reset();
        this.dialogRef.close();
        // window.location.reload();
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}
