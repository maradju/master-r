import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Student } from 'src/app/common/student';
import { StudentService } from 'src/app/services/student.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-details',
  templateUrl: './student-details.component.html',
  styleUrls: ['./student-details.component.css']
})
export class StudentDetailsComponent implements OnInit {

  student: Student = new Student;
  status: String = new String;
  isViewMode: boolean = true;
  theStudentId!: number;

  checkoutFormGroup: FormGroup = this.formBuilder.group({
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
  });;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private studentService: StudentService,
              private router: Router) { }

  ngOnInit(): void {
    // get the "id" param string. convert string to a number using the "+" symbol
    this.theStudentId = +this.route.snapshot.paramMap.get('id')!;

    this.route.paramMap.subscribe(() => {
      this.handleStudentDetails();
    })


  }

  handleStudentDetails() {
    this.studentService.getStudent(this.theStudentId).subscribe(
      data => {
        this.student = data;
      }
    )
  }

  onDelete(){
    this.studentService.deleteStudent(this.theStudentId).subscribe(
     () => this.status = 'Delete successful'  
    )
    this.router.navigateByUrl((`students`))
  }

  changeToAddMode(){
     this.isViewMode = false;
     this.checkoutFormGroup.controls['firstName'].setValue(this.student.firstName);
     this.checkoutFormGroup.controls['lastName'].setValue(this.student.lastName);
     this.checkoutFormGroup.controls['parentName'].setValue(this.student.parentName);
     this.checkoutFormGroup.controls['mobile'].setValue(this.student.mobile);
     this.checkoutFormGroup.controls['email'].setValue(this.student.email);
     this.checkoutFormGroup.controls['address'].setValue(this.student.address);
     this.checkoutFormGroup.controls['gender'].setValue(this.student.gender);
     this.checkoutFormGroup.controls['yearOfBirth'].setValue(this.student.yearOfBirth);
  }

  saveAndChangeToViewMode(){

    this.student.firstName = this.checkoutFormGroup.controls['firstName'].value;
    this.student.lastName = this.checkoutFormGroup.controls['lastName'].value;
    this.student.parentName = this.checkoutFormGroup.controls['parentName'].value;
    this.student.mobile = this.checkoutFormGroup.controls['mobile'].value;
    this.student.email = this.checkoutFormGroup.controls['email'].value;
    this.student.address = this.checkoutFormGroup.controls['address'].value;
    this.student.gender = this.checkoutFormGroup.controls['gender'].value;
    this.student.yearOfBirth = this.checkoutFormGroup.controls['yearOfBirth'].value;

    this.studentService.updateStudent(this.theStudentId, this.student).subscribe(data => {
      console.log(data);
      this.student = new Student();
    }, error => console.log(error));

    this.isViewMode = true;
    this.handleStudentDetails();

  }
}
