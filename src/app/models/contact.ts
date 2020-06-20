export class Contact {
  id: string;
  date: number;

  constructor(
    public username: string,
    public email: string,
    public message: string,
    public productId: string,
    public cartId: string,
    public ip: string,
    public loc: string
  ) {
    this.date = Date.now();
  }
}
