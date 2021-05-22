import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// RECOMMENDED
import { AccordionModule } from 'ngx-bootstrap/accordion';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 

// COMPONENTS
import { HeaderComponent } from './header/header.component'
import { BooksComponent } from './books/books.component'
import { AuthorsComponent } from './authors/authors.component'
import { HomeComponent } from './home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BooksComponent,
    AuthorsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
