import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Professor } from 'src/app/common/professor';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor-create',
  templateUrl: './professor-create.component.html',
  styleUrls: ['./professor-create.component.css']
})
export class ProfessorCreateComponent implements OnInit {


  professor: Professor = new Professor;
  checkoutFormGroup!: FormGroup ;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private professorService: ProfessorService) { }

  ngOnInit(): void {
    this.checkoutFormGroup = this.formBuilder.group({
      firstName: new FormControl('', 
                            [Validators.required, 
                             Validators.minLength(2)]),
      lastName: new FormControl('', 
                            [Validators.required, 
                            Validators.minLength(2)]),
      about: new FormControl('', 
                            [Validators.required, 
                            Validators.minLength(2)])
    });
  }

  onSubmit() {
    console.log("Handling the submit button");
    this.professor.firstName = this.checkoutFormGroup.controls['firstName'].value;
    this.professor.lastName = this.checkoutFormGroup.controls['lastName'].value;
    this.professor.about = this.checkoutFormGroup.controls['about'].value;

    this.professorService.save(this.professor).subscribe({

    })
  }
}
