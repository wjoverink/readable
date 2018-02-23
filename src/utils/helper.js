import {MAXTITLELENGTH, MAXBODYLENGTH,MAXAUTHORLENGTH, UPVOTE, DOWNVOTE} from '../utils/config'

export const findCategoryAndRelated = (categories, categoryPath) => {
  const empty = {name:"",path:""};
  if ( !categoryPath || !categories || !categories.length){
    return {category:empty, related:empty}
  }
    return {category:categories.find(cat => cat.path === categoryPath)||empty, related:categories.find(cat => cat.path !== categoryPath)||empty}
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

export const prepareVoteForAPI = (vote) =>{
  if (vote>0){
    return UPVOTE
  }
  return DOWNVOTE
}
