export enum Category {
    FOOD ,
    ELECTRICITY ,
    RESTAURANT ,
    VACATION ,
    CINEMA 
}

export function getAllCategories(): Category[] {
    return [
      Category.FOOD,
      Category.ELECTRICITY,
      Category.RESTAURANT,
      Category.VACATION,
      Category.CINEMA,
    ];
  }