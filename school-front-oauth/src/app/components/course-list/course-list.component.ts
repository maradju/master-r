import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule  } from '@angular/router';
import { Course } from 'src/app/common/course';
import { CourseService } from 'src/app/services/course.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses:  Course[] = [];
  searchMode: boolean = false;

  constructor(private courseService: CourseService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listCourses();
    });
  }

  doSearch(value: String){
    console.log(`value = ${value}`);
    this.router.navigateByUrl(`courses/search/${value}`);
  }

  listCourses() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchCourses();
    }
    else {
      this.handleListCourses();
    }

  }

  handleListCourses() {
    this.courseService.getCourseList().subscribe(
      data => {
        this.courses = data;
      }
    )
  }

  handleSearchCourses() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    console.log(`keyword=${theKeyword}`);

    // pretrazi coursee koristeci keywird
    this.courseService.searchCourses(theKeyword).subscribe(     
      data => {
      this.courses = data;
      }
    )
  }

}
