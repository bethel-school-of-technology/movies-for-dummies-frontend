import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-bymovie',
  templateUrl: './bymovie.component.html',
  styleUrls: ['./bymovie.component.css']
})
export class BymovieComponent implements OnInit {

  posts: Post[] = [];
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: HomeService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPostsByMovie(this.route.snapshot.params.id);
    });
  }

  getPostsByMovie(id: any) {
    this.posts = [];
    this.api.getPostsByMovie(id)
      .subscribe((res: any) => {
        this.posts = res;
        console.log(this.posts);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }

}
