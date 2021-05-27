import { Injector, NgModule } from '@angular/core';
import { Apollo, APOLLO_OPTIONS } from 'apollo-angular';
import { ApolloClientOptions, ApolloLink, InMemoryCache } from '@apollo/client/core';
import { HttpLink } from 'apollo-angular/http';
import { HttpHeaders } from '@angular/common/http';
import { onError, ErrorHandler } from '@apollo/client/link/error';
import { SecurityService } from './services/security.service'
import { Router } from '@angular/router';


@NgModule({
  providers: [],
})
export class GraphQLModule {
  uri = 'http://localhost:8000/api/graphql'; // <-- add the URL of the GraphQL server here

  constructor(
    private apollo: Apollo, 
    private httpLink: HttpLink,
    private securityService:SecurityService,
    private router: Router
  )
  {
    const http = httpLink.create(
      {
        uri: this.uri,
        includeExtensions: true
      }
    );

    const error = onError(({networkError}) => {
      const error:any = networkError;
      if (error.status === 401) {
        this.securityService.logout();
      }
    });
  
    const middleware = new ApolloLink((operation, forward) => {
      if (operation.operationName.toLowerCase() !== 'login_check') {
        operation.setContext({
          headers: new HttpHeaders().set(
            'Authorization',
            `Bearer ${localStorage.getItem('token') || null}`,
          ),
        });
      }
  
      return forward(operation);
    });

    const link = middleware.concat(http);
    const client = error.concat(link)
  
    this.apollo.create({
      link: client,
      cache: new InMemoryCache(),
    })
  }
}
