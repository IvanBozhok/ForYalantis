import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../pages/login/user-model';
import { HttpClient, HttpResponseBase } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private url = '/api/images/';
  constructor(private http: HttpClient) { }

  loginUser(user: UserModel): Observable<boolean> {
    const singInResult = new BehaviorSubject(false);
    if ((user.name === 'admin') && (user.password === 'admin')) {
      singInResult.next(true);
    } else {
      singInResult.next(false);
      console.error();
    }
    return singInResult;
  }
  getImages(): Observable<any> {
    return this.http.get(this.url);
  }
  getImgInfo(id: string) {
    return this.http.get(this.url + id);
  }
  addNewImage(newImg, file) {
    return this.http.post(this.url, newImg);
  }
  updateImgInfo(img) {
    return this.http.put(this.url + img._id, img);
  }
}
