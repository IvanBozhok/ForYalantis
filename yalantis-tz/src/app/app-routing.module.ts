import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouteUrls } from './common/route-urls';
import { LoginComponent } from './pages/login/login.component';
import { ImgListComponent } from './pages/img-list/img-list.component';
import { ImgPageComponent } from './pages/img-page/img-page.component';
import { AddImgComponent } from './pages/add-img/add-img.component';

const routes: Routes = [
  { path: RouteUrls.Login,  component: LoginComponent},
  { path: RouteUrls.ImagesList,
    children: [
      { path: RouteUrls.Default, component: ImgListComponent },
      { path: RouteUrls.Image, component: ImgPageComponent },
      { path: RouteUrls.AddNewImage, component: AddImgComponent },
    ]
  },
  { path: '**', redirectTo: RouteUrls.Login }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
