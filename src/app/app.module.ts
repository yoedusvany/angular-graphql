import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// RECOMMENDED
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
// NOT RECOMMENDED (Angular 9 doesn't support this kind of import)

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

// COMPONENTS
import { HeaderComponent } from './header/header.component'
import { BooksComponent } from './books/books.component'
import { AuthorsComponent } from './authors/authors.component'
import { HomeComponent } from './home/home.component'
import { BookCreateComponent } from './components/book-create/book-create.component'
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BooksComponent,
    AuthorsComponent,
    HomeComponent,
    BookCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    BsDropdownModule.forRoot(),
    PaginationModule.forRoot(),
    FileUploadModule,
    PaginationModule.forRoot(),
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatGridListModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
