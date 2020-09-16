import { MovieService } from './../../services/movie.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../../services/post.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { MovieService } from '../../services/movie.service';
import { Movie } from 'src/app/models/movie';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrls: ['./post-add.component.css']
})
export class PostAddComponent implements OnInit {

  postForm: FormGroup;
  movie = '';
  postTitle = '';
  postAuthor = '';
  postDesc = '';
  postContent = '';
  postReference = '';
  postImgUrl = '';
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  movies: Movie[] = [];

  quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['clean'],                                         // remove formatting button
        ['link'],
        //['link', 'image', 'video']
      ],
    },
  }

  constructor(
    private router: Router,
    private api: PostService,
    private catApi: MovieService,
    private formBuilder: FormBuilder) { }

  ngOnInit() 
    // this.getMovies();
    this.postForm = this.formBuilder.group({
      movie : [null, Validators.required],
      postTitle : [null, Validators.required],
      postAuthor : [null, Validators.required],
      postDesc : [null, Validators.required],
      postContent : [null, Validators.required],
      postReference : [null, Validators.required],
      postImgUrl : [null, Validators.required]
    });
  }
  getMovie() {
    throw new Error("Method not implemented.");
  }

  onFormSubmit() {
    console.log(this.postContent)
    this.isLoadingResults = true;
    this.api.addPost(this.postForm.value)
      .subscribe((res: any) => {
          const id = res._id;
          this.isLoadingResults = false;
          this.router.navigate(['/post/details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        });
  }

  getMovies() {
    this.movieApi.getMovies()
      .subscribe((res: any) => {
        this.movies = res;
        console.log(this.movies);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
}
