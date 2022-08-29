import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from 'src/app/common/student';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.css']
})
export class StudentCreateComponent implements OnInit {

  student: Student = new Student;
  checkoutFormGroup!: FormGroup ;
  // imageUrl: String = assets\img\images\students\{{event.target.files[0]}}

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private studentService: StudentService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      firstName: new FormControl('', 
                            [Validators.required, 
                             Validators.minLength(2)]),
      lastName: new FormControl('', 
                            [Validators.required, 
                            Validators.minLength(2)]),
      parentName: new FormControl('', 
                            [Validators.required, 
                            Validators.minLength(2)]),
      mobile: new FormControl('', 
                            [Validators.required, 
                            Validators.minLength(2)]),
      email: new FormControl('', 
                            [Validators.required, 
                            Validators.minLength(2)]),
      address: new FormControl('', 
                            [Validators.required, 
                            Validators.minLength(2)]),
      gender: new FormControl('', 
                            [Validators.required, 
                            Validators.minLength(2)]),
      yearOfBirth: new FormControl('', 
                            [Validators.required, 
                            Validators.minLength(2)])
      });
  }

  onSubmit() {
    console.log("Handling the submit button");
    this.student.firstName = this.checkoutFormGroup.controls['firstName'].value;
    this.student.lastName = this.checkoutFormGroup.controls['lastName'].value;
    this.student.parentName = this.checkoutFormGroup.controls['parentName'].value;
    this.student.mobile = this.checkoutFormGroup.controls['mobile'].value;
    this.student.email = this.checkoutFormGroup.controls['email'].value;
    this.student.address = this.checkoutFormGroup.controls['address'].value;
    this.student.gender = this.checkoutFormGroup.controls['gender'].value;
    this.student.yearOfBirth = this.checkoutFormGroup.controls['yearOfBirth'].value;
    this.studentService.save(this.student).subscribe({
    })

    this.router.navigateByUrl((`students`))

  }

}
