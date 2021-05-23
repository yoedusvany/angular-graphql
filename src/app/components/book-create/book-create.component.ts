import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BookService } from 'src/app/services/book-service';
import { AuthorsService } from 'src/app/services/authors.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  title: string;
  closeBtnName: string;
  formBook: FormGroup;
  authors: any[] = [];
 
  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private bookService: BookService,
    private authorService: AuthorsService

  ) {}
 
  ngOnInit() {
    this.formBook = this.fb.group({
      title: [null, [Validators.required]],
      isbn: [null, [Validators.required]],
      description: [null, [Validators.required]],
      author: [null, [Validators.required]]
    });
    this.authorService.getAuthors().subscribe((data:any) => {
      this.authors = data.authors.edges;
    });
  }

  submit(){
    const input = this.formBook.value;
    this.bookService.create(input)
      .subscribe(({ data }) => {
        console.log('got data', data);
        this.bsModalRef.hide();
      }, (error) => {
        console.log('there was an error sending the query', error);
      });
  }

}
