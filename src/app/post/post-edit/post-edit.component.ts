import { Post } from './../../models/post';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {

  posts: Post[] = [];
  postForm: FormGroup;
  movie = '';
  id = '';
  postTitle = '';
  postAuthor = '';
  postDesc = '';
  postContent = '';
  postReference = '';
  postImgUrl = '';
  updated: Date = null;
  isLoadingResults = false;
  matcher = new MyErrorStateMatcher();
  movies: Movie[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: PostService,
    private catApi: MovieService,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getMovies();
    this.getPost(this.route.snapshot.params.id);
    this.postForm = this.formBuilder.group({
      postTitle : [null, Validators.required],
      postAuthor : [null, Validators.required],
      postDesc : [null, Validators.required],
      postContent : [null, Validators.required],
      postReference : [null, Validators.required],
      postImgUrl : [null, Validators.required]
    });
  }

  getPost(id: any) {
    this.api.getPost(id).subscribe((data: any) => {
      this.id = data.id;
      this.postForm.setValue({
        postTitle: data.postTitle,
        postAuthor: data.postAuthor,
        postDesc: data.postDesc,
        postContent: data.postContent,
        postReference: data.postReference,
        postImgUrl: data.postImgUrl
      });
    });
  }

  getMovies() {
    this.catApi.getMovies()
      .subscribe((res: any) => {
        this.posts = res;
        console.log(this.posts);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

  onFormSubmit() {
    this.isLoadingResults = true;
    this.api.updatePost(this.id, this.postForm.value)
      .subscribe((res: any) => {
          const id = res.id;
          this.isLoadingResults = false;
          this.router.navigate(['/post-details', id]);
        }, (err: any) => {
          console.log(err);
          this.isLoadingResults = false;
        }
      );
  }

  postDetails() {
    this.router.navigate(['/post-details', this.id]);
  }

}
