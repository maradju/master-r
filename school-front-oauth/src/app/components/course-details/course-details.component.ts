import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from 'src/app/common/course';
import { CourseService } from 'src/app/services/course.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.css']
})
export class CourseDetailsComponent implements OnInit {

  course: Course = new Course;
  status: String = new String;
  isViewMode: boolean = true;
  theCourseId!: number;

  checkoutFormGroup: FormGroup = this.formBuilder.group({
    name: new FormControl('', 
                          [Validators.required, 
                           Validators.minLength(2)])
  });;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private courseService: CourseService) { }

  ngOnInit(): void {
    // get the "id" param string. convert string to a number using the "+" symbol
    this.theCourseId = +this.route.snapshot.paramMap.get('id')!;

    this.route.paramMap.subscribe(() => {
      this.handleCourseDetails();
    })


  }

  handleCourseDetails() {
    this.courseService.getCourse(this.theCourseId).subscribe(
      data => {
        this.course = data;
      }
    )
  }

  onDelete(){
    this.courseService.deleteCourse(this.theCourseId).subscribe(
     () => this.status = 'Delete successful'  
    )
  }

  changeToAddMode(){
     this.isViewMode = false;
     this.checkoutFormGroup.controls['name'].setValue(this.course.name);

  }

  saveAndChangeToViewMode(){

    this.course.name = this.checkoutFormGroup.controls['name'].value;

    this.courseService.updateCourse(this.theCourseId, this.course).subscribe(data => {
      console.log(data);
      this.course = new Course();
    }, error => console.log(error));

    this.isViewMode = true;
    this.handleCourseDetails();
  }

  get name() { return this.checkoutFormGroup.get('course.name'); }


}
