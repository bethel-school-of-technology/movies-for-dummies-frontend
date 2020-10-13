import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../models/movie';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
// export class MovieComponent implements OnInit {

//   displayedColumns: string[] = ['moviesTitle', 'moviesBody', 'moviesUrl', 'moviesImage'];
//   data: Movie[] = [];
//   isLoadingResults = true;

//   constructor(private api: MovieService) { }

//   getMovies() {
//     this.http.get<Movie[]>(this.moviesRoute).subscribe(movies => {
//         this.movies = movies;
//         console.log('Movies', this.movies);
//     });
// }
//   ngOnInit() {
//     this.api.getMovies()
//       .subscribe((res: any) => {
//         this.data = res;
//         console.log(this.data);
//         this.isLoadingResults = false;
//       }, err => {
//         console.log(err);
//         this.isLoadingResults = false;
//       });
//   }

// }

export class MovieComponent implements OnInit {

  movie: Movie = { moviesId: null, moviesTitle: '', moviesBody: '', moviesImage: '', moviesUrl: ''};
  isLoadingResults = true;
  postForm: any;
  id: any;

  constructor(private route: ActivatedRoute, private api: MovieService, private router: Router) { }

  ngOnInit() {
    this.getMovie(this.route.snapshot.params.id);
  }

//   getMovieDetails(id: any) {
//     this.api.getMovies()
//       .subscribe((data: any) => {
//         this.movie = data;
//         console.log(this.movie);
//         this.isLoadingResults = false;
//       });
//   }
// }
getMovie(id: any) {
  this.api.getMovie(id).subscribe((data: any) => {
    this.id = data.id;
    this.postForm.setValue({
      moviesTitle: data.postTitle,
      moviesBody: data.postBody,
      moviesImage: data.postImage,
      moviesUrl: data.postContent
      
    });
  });
}}