import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { BookCreateComponent } from '../components/book-create/book-create.component';
import { BookService } from '../services/book.service'
import { GET_BOOKS } from '../graphql/queries'
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books$: BehaviorSubject<any>;
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
    private modalService: BsModalService,
  ) {
    this.books$ = new BehaviorSubject([]);
  }

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
      this.books$.next(result.collection);

      if(result && result?.collection?.length > 0){
        const {paginationInfo} = result;
        this.totalCount = paginationInfo.totalCount;
      }
      
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
