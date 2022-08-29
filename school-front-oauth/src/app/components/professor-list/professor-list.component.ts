import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule  } from '@angular/router';
import { Professor } from 'src/app/common/professor';
import { ProfessorService } from 'src/app/services/professor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-professor-list',
  templateUrl: './professor-list.component.html',
  styleUrls: ['./professor-list.component.css']
})
export class ProfessorListComponent implements OnInit {



  professors:  Professor[] = [];
  searchMode: boolean = false;

  constructor(private professorService: ProfessorService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProfessors();
    });
  }

  doSearch(value: String){
    console.log(`value = ${value}`);
    this.router.navigateByUrl(`/search/${value}`);
  }

  listProfessors() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProfessors();
    }
    else {
      this.handleListProfessors();
    }

  }

  handleListProfessors() {
    this.professorService.getProfessorList().subscribe(
      data => {
        this.professors = data;
      }
    )
  }

  handleSearchProfessors() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    console.log(`keyword=${theKeyword}`);

    // pretrazi professore koristeci keywird
    this.professorService.searchProfessors(theKeyword).subscribe(     
      data => {
      this.professors = data;
      }
    )
  }

}
