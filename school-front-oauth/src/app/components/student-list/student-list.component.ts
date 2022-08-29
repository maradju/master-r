import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule  } from '@angular/router';
import { Student } from 'src/app/common/student';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students:  Student[] = [];
  searchMode: boolean = false;

  constructor(private studentService: StudentService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listStudents();
    });
    this.handleListStudents()
  }

  doSearch(value: String){
    console.log(`value = ${value}`);
    this.router.navigateByUrl(`students/search/${value}`);
  }

  listStudents() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchStudents();
    }
    else {
      this.handleListStudents();
    }

  }

  handleListStudents() {
    this.studentService.getStudentList().subscribe(
      data => {
        this.students = data;
      }
    )
  }

  handleSearchStudents() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    console.log(`keyword=${theKeyword}`);

    // pretrazi studente koristeci keywird
    this.studentService.searchStudents(theKeyword).subscribe(     
      data => {
      this.students = data;
      }
    )
  }

}
