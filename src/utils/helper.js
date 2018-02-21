import {MAXTITLELENGTH, MAXBODYLENGTH,MAXAUTHORLENGTH} from '../utils/config'

export const findCategoryAndRelated = (categories, categoryPath) => {
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

  export const reduceStringLength = (text, length) => {
    if (typeof text !== 'string'){
      return 0
    }
    return text.length > length ? text.substring(0, length)+"...":text
  }

  export const reduceTitleLength = (text) => {
    return reduceStringLength(text, MAXTITLELENGTH)
  }
  export const reduceBodyLength = (text) => {
    return reduceStringLength(text, MAXBODYLENGTH)
  }
  export const reduceAuthorLength = (text) => {
    return reduceStringLength(text, MAXAUTHORLENGTH)
  }
