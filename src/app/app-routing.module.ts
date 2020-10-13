import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DetailsComponent } from './components/details/details.component';
import { AdminComponent } from './admin/admin.component';
import { MovieComponent } from './components/movie/movie.component';
import { PostComponent } from './components/post/post.component';
import { MovieDetailsComponent } from './components/movie/movie-details/movie-details.component';
import { MovieAddComponent } from './components/movie/movie-add/movie-add.component';
import { MovieEditComponent } from './components/movie/movie-edit/movie-edit.component';
import { PostDetailsComponent } from './components/post/post-details/post-details.component';
import { PostAddComponent } from './components/post/post-add/post-add.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { BymovieComponent } from './components/bymovie/bymovie.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'movie',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    data: { title: 'Blog Admin' }
  },
  {
    path: 'bymovie/:id',
    component: BymovieComponent,
    data: { title: 'Post by movie' }
  },
  {
    path: 'details/:id',
    component: DetailsComponent,
    data: { title: 'Show Post Details' }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' }
  },
  {
    path: 'movie',
    canActivate: [AuthGuard],
    component: MovieComponent,
    data: { title: 'Movie' }
  },
  {
    path: 'movie/details/:id',
    canActivate: [AuthGuard],
    component: MovieDetailsComponent,
    data: { title: 'Movie Details' }
  },
  {
    path: 'movie/add',
    // canActivate: [AuthGuard],
    component: MovieAddComponent,
    data: { title: 'Movie Add' }
  },
  {
    path: 'movie/edit/:id',
    canActivate: [AuthGuard],
    component: MovieEditComponent,
    data: { title: 'Movie Edit' }
  },
  {
    path: 'post',
    canActivate: [AuthGuard],
    component: PostComponent,
    data: { title: 'Post' }
  },
  {
    path: 'post/details/:id',
    canActivate: [AuthGuard],
    component: PostDetailsComponent,
    data: { title: 'Post Details' }
  },
  {
    path: 'post/add',
    canActivate: [AuthGuard],
    component: PostAddComponent,
    data: { title: 'Post Add' }
  },
  {
    path: 'post/edit/:id',
    canActivate: [AuthGuard],
    component: PostEditComponent,
    data: { title: 'Post Edit' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
