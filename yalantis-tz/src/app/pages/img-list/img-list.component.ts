import { Component, OnInit } from '@angular/core';
import { ImgListModel } from './img-list-model';
import { Router } from '@angular/router';
import { RepositoryService } from '../../services/repository.service';
import { BehaviorSubject } from 'rxjs';
import { Utility } from '../../common/utility';
import { RouteUrls } from '../../common/route-urls';

@Component({
  selector: 'app-img-list',
  templateUrl: './img-list.component.html',
  styleUrls: ['./img-list.component.scss']
})
export class ImgListComponent implements OnInit {
  displayedColumns: string[] = ['image', 'name'];
  images = new BehaviorSubject([ImgListModel]);
  constructor(private router: Router,
              private repository: RepositoryService) { }

  ngOnInit() {
    this.repository.getImages().subscribe(response => {
      console.log(response);
      this.images.next(response);
    });
  }
  navigateToAddNewImage(): void {
    this.router.navigateByUrl( Utility.path(RouteUrls.ImagesList, RouteUrls.AddNewImage) );
  }
  navigateToImgInfo(imageId: string): void {
    localStorage.setItem('imageId', JSON.stringify(imageId));
    this.router.navigateByUrl( Utility.path(RouteUrls.ImagesList, RouteUrls.Image) );
  }
}
