export const   findCategoryAndRelated = (categories, categoryPath) => {
    let category = ""
    let related = ""
    if ( categoryPath && categories && categories.length>0){
      const cat = categories.find(cat => cat.path === categoryPath);
      const rel = categories.find(cat => cat.path !== categoryPath);
      category = cat ? cat.name : ""
      related = rel ? rel.name : ""
    }
    return {category, related}
  }
