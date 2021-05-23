import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BookCreateComponent } from '../components/book-create/book-create.component';
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
  bsModalRef: BsModalRef;
  totalCount: number = 0;
  currentPage: 1;
  previousPage: any;
  nextPage: any;

  constructor(
    private bookService: BookService,
    private modalService: BsModalService
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
    this.bookService.getBooks(this.filterTitle, this.filterDesc, this.currentPage)
    .subscribe((result: any) => {
      console.log(result);
      
      this.totalCount = result.books.paginationInfo.totalCount;

      this.books = result?.books?.collection;
      this.loading = result.loading;
      this.error = result.error;
    });
  }


  openModalWithComponent(){
    const initialState = {
      title: 'Create Book'
    };
    this.bsModalRef = this.modalService.show(BookCreateComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

  pageChanged(event){
    this.currentPage = event.page;
    this.loadBooks();
  }
}
