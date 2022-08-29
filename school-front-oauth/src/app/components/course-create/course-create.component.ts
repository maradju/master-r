import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Course } from 'src/app/common/course';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.css']
})
export class CourseCreateComponent implements OnInit {

  course: Course = new Course;
  checkoutFormGroup!: FormGroup ;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private courseService: CourseService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      name: new FormControl('', 
                            [Validators.required, 
                             Validators.minLength(2)])
    });
  }

  onSubmit() {
    console.log("Handling the submit button");
    this.course.name = this.checkoutFormGroup.controls['name'].value;


    this.courseService.save(this.course).subscribe({

    })
  }
}
