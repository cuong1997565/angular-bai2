export class Todo{
  public id:number;
  public name: string;
  public price: number;
  public category_id: number;

  constructor( name: string, price: number,category_id: number)
  {
      this.name = name;
      this.price = price;
      this.category_id = category_id;
  }
}
