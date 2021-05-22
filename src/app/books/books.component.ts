import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators'
import { BookService } from '../services/book-service'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: any;
  loading: boolean = true;
  error: any;
  filterTitle: string;
  filterDesc: string;

  constructor(
    private apollo: Apollo,
    private bookService: BookService
  ) {}

  ngOnInit() {
    this.loadBooks();
  }

  filterDescEvent(e){
    this.filterDesc = e.target.value;
    this.loadBooks();
  }

  filterTitleEvent(e){
    this.filterTitle = e.target.value;
    this.loadBooks();
  }

  loadBooks(){
    this.bookService.getBooks(this.filterTitle, this.filterDesc)
    .subscribe((result: any) => {
      this.books = result?.books?.edges;
      this.loading = result.loading;
      this.error = result.error;
    });
  }
}
