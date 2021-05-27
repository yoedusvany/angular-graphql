import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { GET_BOOKS } from '../graphql/queries';



const CREATE = gql`
  mutation createBook($book: createBookInput! ){
      createBook(input: $book){
        book{
          isbn,
          id
          title
          description
        }
      }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class BookService {
  public books$: BehaviorSubject<any>;

  constructor(private apollo: Apollo ) {
    this.books$ = new BehaviorSubject([]);
  }

  getBooks(title: string, description: string, page: number=1){
    const books = this.apollo.client.readQuery({
        query: GET_BOOKS,
        variables: {
          title: title,
          description: description,
          page: page
        },
    });

    if(books){
      this.books$.next(books.books);
    }else{
      this.apollo.watchQuery(
        {
          query: GET_BOOKS,
          variables: {
            title: title,
            description: description,
            page: page
          },
          pollInterval:5000
        }
      )
      .valueChanges
      .pipe(
        map((item: any) => item?.data?.books)
      ).subscribe(result => {
        this.books$.next(result);
      });
    }
  }

  create(data: any){
    this.apollo.mutate(
      {
        mutation: CREATE,
        variables: {
          book: data,
        }
      }
    ).subscribe(result => {
      console.log(result);
      this.books$.subscribe(booksData => {
        this.books$.next([booksData,result]);
      });
    })
  }
}
