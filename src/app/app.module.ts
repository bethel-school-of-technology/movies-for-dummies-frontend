import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './auth/interceptors/token.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { QuillModule } from  'ngx-quill';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { MovieComponent } from './components/movie/movie.component';
import { MovieDetailsComponent } from './components/movie/movie-details/movie-details.component';
import { MovieAddComponent } from './components/movie/movie-add/movie-add.component';
import { MovieEditComponent } from './components/movie/movie-edit/movie-edit.component';
import { PostComponent } from './components/post/post.component';
import { PostDetailsComponent } from './components/post/post-details/post-details.component';
import { PostAddComponent } from './components/post/post-add/post-add.component';
import { PostEditComponent } from './components/post/post-edit/post-edit.component';
import { BymovieComponent } from './components/bymovie/bymovie.component';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    MovieComponent,
    MovieDetailsComponent,
    MovieAddComponent,
    MovieEditComponent,
    PostComponent,
    PostDetailsComponent,
    PostAddComponent,
    PostEditComponent,
    BymovieComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {}
