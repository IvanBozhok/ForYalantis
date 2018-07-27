import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { ImgListComponent } from './pages/img-list/img-list.component';
import { ImgPageComponent } from './pages/img-page/img-page.component';
import { RepositoryService} from './services/repository.service';
import {
  MatButtonToggleModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FileUploaderComponent } from './common/file-uploader/file-uploader.component';
import { BigSizeDialogComponent } from './common/file-uploader/big-size-dialog/big-size-dialog.component';
import { PreviewDialogComponent } from './pages/preview-dialog/preview-dialog.component';
import { AddImgComponent } from './pages/add-img/add-img.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ImgListComponent,
    ImgPageComponent,
    FileUploaderComponent,
    BigSizeDialogComponent,
    PreviewDialogComponent,
    AddImgComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    MatTableModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatTooltipModule
  ],
  providers: [
    RepositoryService
  ],
  entryComponents: [
    BigSizeDialogComponent,
    PreviewDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
