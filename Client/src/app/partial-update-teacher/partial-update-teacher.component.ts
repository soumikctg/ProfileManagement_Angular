import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Teachers } from '../teacherModel';
import { TeachersService } from '../teachers.service';

@Component({
  selector: 'app-partial-update-teacher',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule, MatDialogModule, MatFormFieldModule, MatSelectModule, MatInputModule, ReactiveFormsModule],
  templateUrl: './partial-update-teacher.component.html',
  styleUrl: './partial-update-teacher.component.css'
})
export class PartialUpdateTeacherComponent {
  teacherForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { teacher: Teachers },
    private builder: FormBuilder,
    private teacherService: TeachersService,
    private dialogRef: MatDialogRef<PartialUpdateTeacherComponent>
  ) {
    this.teacherForm = this.builder.group({
      Id: '',
      Name: '',
      Contact: '',
      Address: '',
      Department: '',
    });
    this.updateForm();
  }
  teacher: Teachers = this.data.teacher;

  updateForm() {
    this.teacherForm.setValue({
      Id: this.teacher.Id,
      Name: this.teacher.Name,
      Contact: this.teacher.Contact,
      Address: this.teacher.Address,
      Department: this.teacher.Department,
    });
  }
  onSubmit() {
    const newTeacher = this.teacherForm.value;

    this.teacherService
      .updateTeacher(<Teachers>newTeacher)
      .subscribe((result) => {
        alert('User Updated Successfully');
        this.teacherForm.reset();
        this.dialogRef.close();
        // window.location.reload();
      });
  }

  onClose() {
    this.dialogRef.close();
  }
}
