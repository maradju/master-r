import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Professor } from 'src/app/common/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-professor-details',
  templateUrl: './professor-details.component.html',
  styleUrls: ['./professor-details.component.css']
})
export class ProfessorDetailsComponent implements OnInit {

 
  professor: Professor = new Professor;
  status: String = new String;
  isViewMode: boolean = true;
  theProfessorId!: number;

  checkoutFormGroup: FormGroup = this.formBuilder.group({
    firstName: new FormControl('', 
                          [Validators.required, 
                           Validators.minLength(2)]),
    lastName: new FormControl('', 
                          [Validators.required, 
                          Validators.minLength(2)]),
    about: new FormControl('', 
                          [Validators.required, 
                          Validators.minLength(2)])
  });;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private professorService: ProfessorService) { }

  ngOnInit(): void {
    // get the "id" param string. convert string to a number using the "+" symbol
    this.theProfessorId = +this.route.snapshot.paramMap.get('id')!;

    this.route.paramMap.subscribe(() => {
      this.handleProfessorDetails();
    })


  }

  handleProfessorDetails() {
    this.professorService.getProfessor(this.theProfessorId).subscribe(
      data => {
        this.professor = data;
      }
    )
  }

  onDelete(){
    this.professorService.deleteProfessor(this.theProfessorId).subscribe(
     () => this.status = 'Delete successful'  
    )
  }

  changeToAddMode(){
     this.isViewMode = false;
     this.checkoutFormGroup.controls['firstName'].setValue(this.professor.firstName);
     this.checkoutFormGroup.controls['lastName'].setValue(this.professor.lastName);
     this.checkoutFormGroup.controls['about'].setValue(this.professor.about);
  }

  saveAndChangeToViewMode(){

    this.professor.firstName = this.checkoutFormGroup.controls['firstName'].value;
    this.professor.lastName = this.checkoutFormGroup.controls['lastName'].value;
    this.professor.about = this.checkoutFormGroup.controls['about'].value;

    this.professorService.updateProfessor(this.theProfessorId, this.professor).subscribe(data => {
      console.log(data);
      this.professor = new Professor();
    }, error => console.log(error));

    this.isViewMode = true;
    this.handleProfessorDetails();
  }

  get name() { return this.checkoutFormGroup.get('professor.firstName'); }
  get email() { return this.checkoutFormGroup.get('professor.lastName'); }
  get jmbg() { return this.checkoutFormGroup.get('professor.about'); }

}
