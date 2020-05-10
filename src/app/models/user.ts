export class User {
  uid: string;
  email: string;
  createdAt: string;
  type: string;
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;

  constructor(init: Partial<User>) {
    Object.assign(this, init);
  }

  get isAdmin() {
    return this.type === 'admin';
  }
}
