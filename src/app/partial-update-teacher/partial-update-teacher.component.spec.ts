import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialUpdateTeacherComponent } from './partial-update-teacher.component';

describe('PartialUpdateTeacherComponent', () => {
  let component: PartialUpdateTeacherComponent;
  let fixture: ComponentFixture<PartialUpdateTeacherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartialUpdateTeacherComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PartialUpdateTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
