import { Component, OnInit } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators'

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
})
export class BooksComponent implements OnInit {
  books: any;
  loading: boolean = true;
  error: any;
  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
          {
            books{
              edges{
                node{
                  isbn
                  title
                  description
                  id
                }
              }
            }
          }
        `,
      })
      .valueChanges
      .pipe(
        map(item => item?.data)
      )
      .subscribe((result: any) => {
        this.books = result?.books?.edges;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
