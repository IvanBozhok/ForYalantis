import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.scss']
})
export class PreviewDialogComponent implements OnInit {
  url = '';
  constructor(public thisDialogRef: MatDialogRef<PreviewDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ) { }

  ngOnInit() {
    console.log(this.data);
  }
  installBackground(): any {
    if (this.data.newImg !== '') {
      this.url = this.data.newImg;
    } else {
      this.url = this.data.imgUrl;
    }
    return { 'background-image': this.url ? 'url("' + this.url + '")'
        : 'url("")'};
  }

  closeDialog(): void {
    this.thisDialogRef.close();
  }
}
