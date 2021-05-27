import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


const GET_AUTHORS = gql`
  query GetAuthors($name: String){
    authors(name: $name){
      edges{
        node{
          id
          name
        }
      }
    }
  }
`;



const CREATE = gql`
  mutation createAuthor($input: createAuthorInput!){
    createAuthor(input: $input) {
      author {
        id
        name,
        image
      }
      clientMutationId
    }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  public authors$: BehaviorSubject<any>;

  constructor(
    private apollo: Apollo
  ) { 
    this.authors$ = new BehaviorSubject([]);
    this.getAuthors();
  }

  getAuthors(name: string = ""){
    this.apollo.watchQuery(
        {
          query: GET_AUTHORS,
          variables: {
            name,
          },
          //pollInterval: 2000,
        }
      )
      .valueChanges
      .pipe(
        map(item => item?.data)
      ).subscribe((result: any) => {
        this.authors$.next(result.authors.edges);
      })
  }

  create(name: string, image: string){
    this.apollo.mutate(
      {
        mutation: CREATE,
        variables: {
          input: {
            name: name,
            imageId: image
          },
        }
      }
    ).subscribe(result => {
      this.authors$.subscribe(booksData => {
        this.authors$.next([booksData, result]);
      });
    })
  }
}
