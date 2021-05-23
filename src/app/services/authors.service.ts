import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
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


@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  constructor(
    private apollo: Apollo
  ) { }

  getAuthors(name: string = ""){
    return this.apollo.watchQuery(
        {
          query: GET_AUTHORS,
          variables: {
            name,
          },
          pollInterval: 2000,
        }
      )
      .valueChanges
      .pipe(
        map(item => item?.data)
      );
  }
}
