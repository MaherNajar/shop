export class User {
  uid: string = '';
  email: string = '';
  createdAt: string = '';
  type: 'user' | 'admin' = 'user';
  displayName?: string;
  photoURL?: string;
  phoneNumber?: string;

  constructor(init?: Partial<User>) {
    if (init) {
      Object.assign(this, init);
    }
  }

  get isAdmin(): boolean {
    return this.type === 'admin';
  }
}
