import { HttpClientModule,HTTP_INTERCEPTORS, HttpClientXsrfModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { StudentService } from './services/student.service';
import { StudentListComponent } from './components/student-list/student-list.component';
import { SearchComponent } from './components/search/search.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { StudentCreateComponent } from './components/student-create/student-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfessorListComponent } from './components/professor-list/professor-list.component';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseCreateComponent } from './components/course-create/course-create.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { ProfessorDetailsComponent } from './components/professor-details/professor-details.component';
import { ProfessorCreateComponent } from './components/professor-create/professor-create.component';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { AuthKeyClockGuard } from './routeguards/auth.route';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [ 
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'students/add', component: StudentCreateComponent},
  {path: 'students/:id', component: StudentDetailsComponent},
  {path: 'students/search/:keyword', component: StudentListComponent},
  {path: 'students', component: StudentListComponent, canActivate: [AuthKeyClockGuard],data: {
    roles: ['USER','ADMIN']
  }},
  {path: 'home', component: HomeComponent},
  {path: 'professors/add', component: ProfessorCreateComponent},
  {path: 'professors/:id', component: ProfessorDetailsComponent},
  {path: 'professors/search/:keyword', component: ProfessorListComponent},
  {path: 'professors', component: ProfessorListComponent},
  {path: 'courses/add', component: CourseCreateComponent},
  {path: 'courses/:id', component: CourseDetailsComponent},
  {path: 'courses/search/:keyword', component: CourseListComponent},
  {path: 'courses', component: CourseListComponent},
  {path: ' ', redirectTo: '/students'},
  {path: '**',  redirectTo: '/students'}

];

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://skola.test:8080/auth',
        realm: 'dev',
        clientId: 'klijent_skola',
      },
      initOptions: {
        pkceMethod: 'S256',
        redirectUri: 'http://skola.test:4401/students'
      },loadUserProfileAtStartUp: false
    });
}

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    SearchComponent,
    StudentDetailsComponent,
    StudentCreateComponent,
    ProfessorListComponent,
    CourseListComponent,
    CourseCreateComponent,
    CourseDetailsComponent,
    ProfessorDetailsComponent,
    ProfessorCreateComponent,
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    KeycloakAngularModule
  ],
  providers: [{
    provide : APP_INITIALIZER,
    useFactory : initializeKeycloak,
    multi : true,
    deps: [KeycloakService],
  }, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
