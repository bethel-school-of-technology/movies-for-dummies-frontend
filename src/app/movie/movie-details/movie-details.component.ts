import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {

  movie: Movie = { id: null, movieName: '', movieDesc: '', movieImgUrl: '', movieContent: '', updated: null };
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: MovieService, private router: Router) { }

  ngOnInit() {
    this.getMovieDetails(this.route.snapshot.params.id);
  }

  getMovieDetails(id: any) {
    // this.api.getMovies(id)
    //   .subscribe((data: any) => {
    //     this.movie = data;
    //     console.log(this.movie);
    //     this.isLoadingResults = false;
    //   });
  }

  deleteMovie(id: any) {
    // this.isLoadingResults = true;
    // this.api.deleteMovie(id)
    //   .subscribe(res => {
    //       this.isLoadingResults = false;
    //       this.router.navigate(['/movie']);
    //     }, (err) => {
    //       console.log(err);
    //       this.isLoadingResults = false;
    //     }
    //   );
  }

}
