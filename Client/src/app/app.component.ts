import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTabsModule} from '@angular/material/tabs';
import { StudentTabComponent } from "./student-tab/student-tab.component";
import { TeacherTabComponent } from "./teacher-tab/teacher-tab.component";



@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [CommonModule, RouterOutlet, MatToolbarModule, MatTabsModule, StudentTabComponent, TeacherTabComponent]
})
export class AppComponent {
  title = 'Profile_Management';
}
