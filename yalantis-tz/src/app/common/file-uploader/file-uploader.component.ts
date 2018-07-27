import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import {BigSizeDialogComponent} from './big-size-dialog/big-size-dialog.component';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss']
})
export class FileUploaderComponent {

  @Input() activeColor = 'green';
  @Input() baseColor = '#ccc';
  @Input() overlayColor = 'rgba(255,255,255,0.5)';

  @Output() changed = new EventEmitter<File>();
  @Output() newImg = new EventEmitter<string>();
  @ViewChild('fileInput') fileInput: ElementRef;

  dragging = false;
  loaded = false;
  imageLoaded = false;
  imageSource = '';
  maxFileSizeInBytes = 3000000;
  file: File;

  constructor(public dialog: MatDialog) {}

  reset(): void {
    this.dragging = false;
    this.loaded = false;
    this.imageLoaded = false;
    this.imageSource = '';
    this.file = null;
    this.fileInput.nativeElement.value = '';
  }

  onDragEnter(): void {
    this.dragging = true;
  }

  onDragLeave(): void {
    this.dragging = false;
  }

  onDrop(event: any): void {
    event.preventDefault();
    this.dragging = false;
    this.onInputChange(event);
  }

  onImageLoad(): void {
    this.imageLoaded = true;
  }

  onInputChange(event: any): void {
    const currentFile = event.dataTransfer ? event.dataTransfer.files[0] : event.target.files[0];
    if (currentFile.size < this.maxFileSizeInBytes) {
      this.file = currentFile;
      const reader = new FileReader();
      this.loaded = false;
      reader.onload = this.onReaderLoaded.bind(this);
      reader.readAsDataURL(this.file);
    } else {
      this.dialog.open(BigSizeDialogComponent);
    }
  }

  onReaderLoaded(event: any): void {
    const reader = event.target;
    this.imageSource = reader.result;
    this.loaded = true;
    this.changed.emit(this.file);
    this.newImg.emit(this.imageSource);
  }

}
