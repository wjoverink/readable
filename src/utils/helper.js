import {MAXTITLELENGTH, MAXBODYLENGTH,MAXAUTHORLENGTH, UPVOTE, DOWNVOTE} from '../utils/config'
import purple from 'material-ui/colors/pink';
import red from 'material-ui/colors/red';
import indigo from 'material-ui/colors/indigo';
import blue from 'material-ui/colors/blue';
import cyan from 'material-ui/colors/cyan';
import lightgreen from 'material-ui/colors/lightGreen';
import yellow from 'material-ui/colors/lime';
import orange from 'material-ui/colors/amber';

/**
* @description finds the category from a catergory-path
* also returns a fake related-category
* @param {array} categories - categories array
* @param {string} categoryPath - categories path
*/
export const findCategoryAndRelated = (categories, categoryPath) => {
  const empty = {name:"",path:""};
  if ( !categoryPath || !categories || !categories.length){
    return {category:empty, related:empty}
  }
    return {category:categories.find(cat => cat.path === categoryPath)||empty, related:categories.find(cat => cat.path !== categoryPath)||empty}
  }

/**
* @description cuts a text to a max-length
* @param {number} length - max length of text
* @param {string} text - the text to cut
*/
export const reduceStringLength = (text, length) => {
  if (typeof text !== 'string'){
    return 0
  }
  return text.length > length ? text.substring(0, length)+"...":text
}

/**
* @description cuts a article title to the max-length set in the config
* @param {string} text - the Title to cut
*/
export const reduceTitleLength = (text) => {
  return reduceStringLength(text, MAXTITLELENGTH)
}

/**
* @description cuts a article body to the max-length set in the config
* @param {string} text - the body to cut
*/
export const reduceBodyLength = (text) => {
  return reduceStringLength(text, MAXBODYLENGTH)
}

/**
* @description cuts a article author to the max-length set in the config
* @param {string} text - the author to cut
*/
export const reduceAuthorLength = (text) => {
  return reduceStringLength(text, MAXAUTHORLENGTH)
}

/**
* @description return the right string compared if it is a down-/upvote for the API
* @param {number} vote - the vote
*/
export const prepareVoteForAPI = (vote) =>{
  if (vote>0){
    return UPVOTE
  }
  return DOWNVOTE
}

const readableColorMap = new Map();
const possibleColors = [red, purple, indigo, blue, cyan, lightgreen, yellow,orange]
const possibleColorHue = [200,300,400, 500];

/**
* @description return a color for a name, caches the name
* @param {string} name - name
*/
export const getColorForName = (name) => {
    if (!readableColorMap.has(name)){
      readableColorMap.set(name, possibleColors[Math.floor(Math.random() * 8)][possibleColorHue[Math.floor(Math.random() * 4)]]);
    }
    return readableColorMap.get(name);
}
