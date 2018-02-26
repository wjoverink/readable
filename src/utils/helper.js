import {MAXTITLELENGTH, MAXBODYLENGTH,MAXAUTHORLENGTH, UPVOTE, DOWNVOTE} from '../utils/config'
import purple from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import indigo from 'material-ui/colors/indigo';
import blue from 'material-ui/colors/blue';
import cyan from 'material-ui/colors/cyan';
import lightgreen from 'material-ui/colors/lightGreen';
import yellow from 'material-ui/colors/yellow';
import orange from 'material-ui/colors/amber';

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

const readableColorMap = new Map();
const possibleColors = [red, purple, indigo, blue, cyan, lightgreen, yellow,orange]
const possibleColorHue = [200,300,400, 500];

export const getColorForName = (name) => {
    if (!readableColorMap.has(name)){
      readableColorMap.set(name, possibleColors[Math.floor(Math.random() * 8)][possibleColorHue[Math.floor(Math.random() * 4)]]);
    }
    return readableColorMap.get(name);
}
