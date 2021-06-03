import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BookService } from 'src/app/services/book.service';
import { AuthorsService } from 'src/app/services/authors.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit, OnDestroy {
  title: string;
  closeBtnName: string;
  formBook: FormGroup;
  authors$: BehaviorSubject<any>;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorsService
  ) {
  }
 
  ngOnInit() {
    this.formBook = this.fb.group({
      title: [null, [Validators.required]],
      isbn: [null, [Validators.required]],
      description: [null, [Validators.required]],
      author: [null, [Validators.required]]
    });
    this.authors$ = new BehaviorSubject([]);
    this.loadAuthors();
  }

  ngOnDestroy(){
    this.authors$.unsubscribe();
  }

  loadAuthors(){
    this.authorService.getAuthors().subscribe(data => {
      this.authors$.next(data.authors.collection);
    });
  }

  submit(){
    const input = this.formBook.value;
    this.bookService.create(input).subscribe(data => {
      this.bsModalRef.hide();
    });
  }

}
