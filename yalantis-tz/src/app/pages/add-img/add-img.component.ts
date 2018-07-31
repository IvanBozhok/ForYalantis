import { Component, OnInit } from '@angular/core';
import { PreviewDialogComponent} from '../preview-dialog/preview-dialog.component';
import { MatDialog} from '@angular/material';
import { ImgModel} from '../img-page/img-model';
import { RepositoryService } from '../../services/repository.service';
import { Router } from '@angular/router';
import { RouteUrls } from '../../common/route-urls';

@Component({
  selector: 'app-add-img',
  templateUrl: './add-img.component.html',
  styleUrls: ['./add-img.component.scss']
})
export class AddImgComponent implements OnInit {
  public image = new ImgModel;
  imageFileForUpload: File;
  tooltips = [];
  minRandom = 10000000000;
  maxRandom = 19999999999;
  dialogRef: any;
  newImg = '';
  constructor(private repository: RepositoryService,
              public dialog: MatDialog,
              private router: Router) { }
  ngOnInit() {}
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
  isNewName(newName): void {
    this.image.name = newName.value;
  }
  installBackground(): any {
    return { 'background-image': this.image.url ? 'url("' + this.image.url + '")'
        : 'url("/assets/addImg.png")'};
  }
  onChangedImage(imageFile: File): void {
    this.imageFileForUpload = imageFile;
  }
  isNewImg(event): void {
    this.newImg = event;
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
  addNewImage(): void {
    this.tooltips.map(tooltip => {
      const tip = {
        name: tooltip.name,
        description: tooltip.description
      };
      this.image.tooltips.push(tip);
    });
    this.repository.addNewImage(this.image)
      .subscribe(res => {
        if (res) {
          this.router.navigateByUrl(RouteUrls.ImagesList);
        }
      });
  }
}
