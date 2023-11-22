export class Helper {
  public static formatCategories(categories, subcategories) {
    console.log(categories, ' categories');
    console.log(Object.keys(categories), ' kyes');
    categories.forEach((category) => {
      if (!category.subcategories) {
        return;
      }
      category.subcategories.forEach((categoryID) => {
        category.subcategories.push(subcategories[categoryID]);
        category.subcategories = category.subcategories.filter(
          (subcategory) => subcategory != categoryID,
        );
      });
    });
    return categories;
  }
}
