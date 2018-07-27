export class UserModel {
  constructor() {}
  public name = '';
  public password = '';
  static createObjectFrom(item: any): UserModel {
    const user = new UserModel();
    if (item) {
      user.name = item.firstName;
      user.password = item.lastName;
    }
    return user;
  }
}
