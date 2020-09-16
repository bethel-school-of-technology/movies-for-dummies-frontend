import { Router } from '@angular/router';
import { Movie } from './models/movie';
import { HomeService } from './services/home.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



// export class AppComponent implements OnInit {
// ...
// }
export class AppComponent {
  title = 'Angular 2 Planets';
  staticPath: string = 'http://localhost:3001/staticPlanets';
  movies: Movie[] = [];
  loginStatus = false;




  constructor(private api: HomeService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((status: any) => {
      if (status === true) {
        this.loginStatus = true;
      } else {
        this.loginStatus = false;
      }
    });
    this.api.getMovies()
      .subscribe((res: any) => {
        this.movies = res;
        console.log(this.movies);
      }, err => {
        console.log(err);
      });
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
