import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';

const GET_BOOKS = gql`
  query GetBooks($title: String, $description: String){
    books(title: $title, description: $description){
      edges{
        node{
          id
          isbn
          title
          description
        }
      }
    }
  }
`;

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

  constructor(private apollo: Apollo ) { }

  getBooks(title: string, description: string){
    return this.apollo.watchQuery(
        {
          query: GET_BOOKS,
          variables: {
            title: title,
            description: description,
          },
          pollInterval: 2000,
        }
      )
      .valueChanges
      .pipe(
        map(item => item?.data)
      );
  }

  create(data: any){
    return this.apollo.mutate(
      {
        mutation: CREATE,
        variables: {
          book: data,
        }
      }
    );
  }
}
