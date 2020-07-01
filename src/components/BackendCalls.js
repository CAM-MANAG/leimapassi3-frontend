import {stampPath, stampsPath, stampCardPath, freeLunchPath,
  copyStampToData,
  copyDataToStamps,  copyDataToStampCard} from '../helpers'

const fetch = require('node-fetch');

export const getStampsPath = async() => {
  const resp = await fetch(stampsPath)
  const response = await resp.json();
  return response
}

export const getStampCardPath = async(userID) => {
  //query must have an id
  if (userID === 'undefined' || userID === '') {
    const message = 'userID is missing or invalid in getStampCards() ';
    console.log(message, userID)
    return message;
  }
  const URL = stampCardPath+userID;
  console.log(URL)
  const resp = await fetch(URL)
  const response = await resp.json();
  return response;
}