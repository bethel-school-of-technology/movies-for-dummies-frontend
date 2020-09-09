import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  movieForm: FormGroup;
  id = '';
  movieName = '';
  movieDesc = '';
  movieImgUrl = '';
  movieContent = '';
  updated: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();

  constructor(private router: Router, private route: ActivatedRoute, private api: MovieService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getMovie(this.route.snapshot.params.id);
    this.movieForm = this.formBuilder.group({
      movieName : [null, Validators.required],
      movieDesc : [null, Validators.required],
      movieImgUrl : [null, Validators.required],
      movieContent : [null, Validators.required]
    });
  }

  getMovie(id: any) {
    this.api.getMovie(id).subscribe((data: any) => {
      this.id = data.id;
      this.movieForm.setValue({
        prod_name: data.prod_name,
        prod_desc: data.prod_desc,
        prod_price: data.prod_price
      });
    });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updateMovie(this.id, this.movieForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/movie-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  movieDetails() {
    this.router.navigate(['/movie-details', this.id]);
  }

}
