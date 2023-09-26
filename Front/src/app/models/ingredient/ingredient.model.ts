export class Ingredient {
    ingredientId: number;
    name: string;
    quantity: number;
    mUnit: number;
    constructor(id: number, name: string, quan: number, unit: number) {
        this.ingredientId = id;
        this.name = name;
      this.quantity = quan;
      this.mUnit= unit;
    }
}