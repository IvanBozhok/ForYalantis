import { Component, OnInit } from '@angular/core';
import { RepositoryService } from '../../services/repository.service';
import { ImgModel } from './img-model';
import { MatDialog } from '@angular/material';
import { PreviewDialogComponent } from '../preview-dialog/preview-dialog.component';
interface ImageInfo {
  _id?: string;
  name?: string;
  url?: string;
  tooltips?: any;
}
@Component({
  selector: 'app-img-page',
  templateUrl: './img-page.component.html',
  styleUrls: ['./img-page.component.scss']
})
export class ImgPageComponent implements OnInit {
  public image = new ImgModel;
  imageFileForUpload: File;
  tooltips = [];
  minRandom = 10000000000;
  maxRandom = 19999999999;
  dialogRef: any;
  newImg = '';
  constructor(private repository: RepositoryService,
              public dialog: MatDialog) { }
  ngOnInit() {
    this.repository.getImgInfo(JSON.parse(localStorage.getItem('imageId')))
      .subscribe((response: ImageInfo) => {
        this.image.tooltips = response.tooltips;
        this.image._id = response._id;
        this.image.name = response.name;
        this.image.url = response.url;
        this.image.tooltips.map(tooltip => {
          const tip = {
            id: Math.floor(Math.random() * (this.maxRandom - this.minRandom) + this.minRandom),
            name: tooltip.name,
            description: tooltip.description
          };
          this.tooltips.push(tip);
        });
      });
  }
  addTooltip(name, description): void {
    const newTooltip = {
      id: Math.floor(Math.random() * (this.maxRandom - this.minRandom) + this.minRandom),
      name: name.value,
      description: description.value
    };
    this.tooltips.push(newTooltip);
  }
  deleteTooltip(id: number): void {
    this.tooltips.splice(this.tooltips.indexOf(id), 1);
  }
  installBackground(): any {
    return { 'background-image': this.image.url ? 'url("' + this.image.url + '")'
        : 'url("")'};
  }
  onChangedImage(imageFile: File): void {
    this.imageFileForUpload = imageFile;
  }
  isNewImg(event): void {
    this.newImg = event;
  }
  updateImgInfo(): void {
    const updateIngInfo = new ImgModel;
    updateIngInfo._id = this.image._id;
    updateIngInfo.name = this.image.name;
    updateIngInfo.url = this.image.url;
    this.tooltips.map(tooltip => {
      const tip = {
        name: tooltip.name,
        description: tooltip.description
      };
      updateIngInfo.tooltips.push(tip);
    });
    console.log(updateIngInfo);
    this.repository.updateImgInfo(updateIngInfo)
      .subscribe(resp => {
        console.log(resp);
      });
  }
  openPreview(): void {
    this.dialogRef = this.dialog.open(PreviewDialogComponent, {
      data: {
        imgUrl: this.image.url,
        tooltips: this.tooltips,
        newImg: this.newImg,
      }
    });
  }
}
