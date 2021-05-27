import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthorsService } from '../services/authors.service';
import { map } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../services/file-upload.service';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {
  authors$ = this.authorsService.authors$;
  modalRef: BsModalRef;
  formAuthor: FormGroup;

  constructor(
    private authorsService: AuthorsService,
    private modalService: BsModalService,
    private fb: FormBuilder,
    private fileUploadService: FileUploadService
  ) { }

  ngOnInit(): void {
    this.formAuthor = this.fb.group({
      name: [null, [Validators.required]],
      image: [null, [Validators.required]],
    });
  }

  create(){
    const input = this.formAuthor.value;
    console.log(input.image[0]);
    
    this.fileUploadService.create(input.image[0])
    .subscribe((data: any) => {
      this.authorsService.create(input.name, data.id);
      this.modalRef.hide();
    })
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
