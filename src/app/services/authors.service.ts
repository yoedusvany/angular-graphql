import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';


const GET_AUTHORS = gql`
  query GetAuthors($name: String){
    authors(name: $name){
      collection{
          id
          name
          image{
            id
            contentUrl
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
        image{
          id
          contentUrl
        }
      }
      clientMutationId
    }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class AuthorsService {
  authors$: BehaviorSubject<any>;

  constructor(
    private apollo: Apollo
  ) { 
    this.authors$ = new BehaviorSubject([]);
  }

  getAuthors(name: string = ""){
    const authors = this.apollo.client.readQuery({
      query: GET_AUTHORS,
      variables: {
        name,
      },
    });

    if(authors){
      this.authors$.next(authors)
      return this.authors$.asObservable();
    }else{
      return this.apollo.watchQuery(
        {
          query: GET_AUTHORS,
          variables: {
            name,
          },
          pollInterval:5000
        }
      )
      .valueChanges
      .pipe(
        map((item: any) => item?.data)
      )
    }
  }

  create(name: string, image: string){
    return this.apollo.mutate(
      {
        mutation: CREATE,
        variables: {
          input: {
            name: name,
            image: image
          },
        }
      }
    )/*.subscribe(result => {
      this.authors$.subscribe(authorsData => {
        this.authors$.next([authorsData, result]);
      });
    })*/
  }
}
