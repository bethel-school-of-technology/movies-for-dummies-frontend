import { Router } from '@angular/router';
import { Movie } from './models/movie';
import { HomeService } from './services/home.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';

// const movies: Movie = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  title = 'Movies For Dummies Blog';
  staticPath: string = 'http://localhost:3001/home';
  movies: Movie[] = [];
  loginStatus = false;

  constructor(private api: HomeService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    // this.authService.isLoggedIn.subscribe((status: any) => {
    //   if (status === true) {
    //     this.loginStatus = true;
    //   } else {
    //     this.loginStatus = false;
    //   }
    // });
    // this.api.getCategories()
    //   .subscribe((res: any) => {
    //     this.categories = res;
    //     console.log(this.categories);
    //   }, err => {
    //     console.log(err);
    //   });
  }

  logout() {
    this.authService.logout()
      .subscribe((res: any) => {
        this.router.navigate(['/']);
      }, err => {
        console.log(err);
      });
  }

}
