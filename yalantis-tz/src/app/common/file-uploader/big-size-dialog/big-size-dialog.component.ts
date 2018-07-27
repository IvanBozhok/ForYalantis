import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-big-size-dialog',
  templateUrl: './big-size-dialog.component.html',
  styleUrls: ['./big-size-dialog.component.scss']
})
export class BigSizeDialogComponent implements OnInit {

  constructor(public thisDialogRef: MatDialogRef<BigSizeDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog(): void {
    this.thisDialogRef.close();
  }
}
