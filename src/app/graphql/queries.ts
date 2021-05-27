import { gql } from 'apollo-angular';


export const GET_BOOKS = gql`
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