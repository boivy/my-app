import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseRegistrationReactiveComponent } from './course-registration-reactive-component';

describe('CourseRegistrationReactiveComponent', () => {
  let component: CourseRegistrationReactiveComponent;
  let fixture: ComponentFixture<CourseRegistrationReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forRoot([])],
      providers: [provideHttpClient(), provideHttpClientTesting()],
      declarations: [CourseRegistrationReactiveComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseRegistrationReactiveComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
