import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';

const GET_BOOKS = gql`
  query GetBooks($title: String, $description: String, $page: Int){
    books( page: $page, title: $title, description: $description){
      collection {
        id
        title
        isbn
        description
      }
      paginationInfo {
        itemsPerPage
        lastPage
        totalCount
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

  getBooks(title: string, description: string, page: number){
    return this.apollo.watchQuery(
        {
          query: GET_BOOKS,
          variables: {
            title: title,
            description: description,
            page: page
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
