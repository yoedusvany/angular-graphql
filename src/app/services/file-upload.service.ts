import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { map } from 'rxjs/operators';


const UPLOAD = gql`
  mutation CreateMediaObject($file: Upload!) {
      uploadMediaObject(input: {file: $file}) {
          mediaObject {
              id
              contentUrl
          }
      }
  }
`;


@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private apollo: Apollo
  ) { }


  create(data: any){
    return this.apollo.mutate(
      {
        mutation: UPLOAD,
        variables: {
          file: data,
        },
        context: {
          useMultipart: true,
        },
      }
    ).pipe(
      map((data: any) => data.data.uploadMediaObject.mediaObject)
    );
  }
}
