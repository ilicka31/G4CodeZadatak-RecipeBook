export class NewIngredient {
    name: string;
    quantity: number;
    mUnit: number;
    constructor( name: string, quan: number, unit: number) {
      this.name = name;
      this.quantity = quan;
      this.mUnit= unit;
    }
}