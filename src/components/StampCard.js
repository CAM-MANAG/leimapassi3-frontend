import React, { useEffect, useState } from 'react';
import {Button, Table} from 'semantic-ui-react';
import {stampPath, /*stampsPath, stampCardPath,*/ freeLunchPath,
        copyStampToData,
        copyDataToStamps,  copyDataToStampCard} from '../helpers'
import moment from 'moment';
import PaperStampCards from './paperStampCards';
import {getStampsPath, getStampCardPath} from './BackendCalls';

const fetch = require('node-fetch');

const enjoyFreeLunch = -10;

const StampCard = (props) => {
  const [stamps, setStamps] = useState([]);
  const [stampCard, setStampCard]= useState([]);

  useEffect(() => {
  /*  const getStampCards = async(userID) => {
      if (!props.loginData.isLogged || userID ==='') {
        console.log('returned from getStampcard')
        console.log(props.loginData)
        return;
      }
    
      const response = await getStampCardPath(userID)
      console.log(response)
      if (response.status === 'success') {
        let data = response.data;
        if (data !== undefined) {
          let stampCards = await copyDataToStampCard(data)
          console.log(stampCards);
          setStampCard(stampCards)
          return true;
        }
      }
      else {
        alert('error in getStampCards()')
        return false
      }
    }*/
    console.log('in StampCard useEffect');
    console.log(props.loginData);
    if (props.loginData.isLogged) {
      fetchStamps();
      getStampCards(props.userData.id);
    }}, [props]);
    

  const fetchStamps = async() => {
    const response = await getStampsPath();
    if (response.status === 'success') {
      const data = response.data
      if (data !== undefined) {
        let stamps = await copyDataToStamps(data)
        setStamps(stamps)
      }
      else {
        console.log("fetchStamps() didn't return any stamps")
      }
    }
    else {
      alert('error in fetchStamps()')
      return false
    }
  }

  const getStampCards = async(userID) => {
    if (!props.loginData.isLogged || userID ==='') {
      console.log('returned from getStampcard')
      console.log(props.loginData)
      return;
    }
  
    const response = await getStampCardPath(userID)
    console.log(response)
    if (response.status === 'success') {
      let data = response.data;
      if (data !== undefined) {
        let stampCards = await copyDataToStampCard(data)
        console.log(stampCards);
        setStampCard(stampCards)
        return true;
      }
    }
    else {
      alert('error in getStampCards()')
      return false
    }
  }

  const freeLunch = async (stampProvID) => {
    //query must have an stampProvID
    if (stampProvID === 'undefined' || stampProvID === '') {
      console.log('stampProvID is missing or invalid in freeLunch(), stampProvID = ', stampProvID)
      return;
    }

    let index;
    index = stampCard.findIndex(item => item.stampProvID === stampProvID.toString())
    console.log('index = ',index)
    console.log(stampCard[index])

    // if more than 10 stamps collected for a restaurant, the free lunch is possible
    if (stampCard[index].stampCount >= 10) {
      const response = await updateUsedStamps(props.userData.id, stampProvID);
      if (response.status === 'success') {
        console.log('success')
        console.log(response)  //ToDO korjaa
        getStampCards(props.userData.id)
        alert('Free Lunch')
      }
      else {
        alert('Sorry, you cant use free lunch today, technical problems')
        console.log('error')
        console.log(response)
      }
    }
    else
      alert('Sorry, not enough stamps')
  }
  
  const getStamp = async(id) => {
    //query must have a valid id
    if (id === 'undefined' || id === '') {
      console.log('stamp id is missing or invalid in getStamp(), id = ', id)
      return;
    }

    const URL = stampPath+id;
    const resp = await fetch(URL)
    const response = await resp.json();
    
    let data = response.data;
    if (data.status === 'success') {
      if (data !== undefined) {
        let stamp = await copyDataToStamps(data)
        console.log(stamp);
        return stamp;
      }
    }
  }

  const updateStamp = async(id, stamp) => {
  //query must have a valid id
    if (id === 'undefined' || id === '') {
      console.log('stamp id is missing or invalid in updateStamp(), id= ', id)
      return;
    }

    //query must have a stamp
    if (stamp === 'undefined' || stamp === '') {
      console.log('stamp is missing or invalid in updateStamp()') 
      console.log(stamp)
      return;
    }
    const data = await copyStampToData(stamp)
    console.log(data)

    // something how to change the data ???? Now the same data is stored again
    const conf = { 
      method: 'PUT', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    console.log(data)
    const URL = stampPath+id;
    console.log(URL)
    const resp = await fetch(URL, conf)
    const response = await resp.json()
    if (response.status !== 'success') {
      console.log('error is updateStamp() ', response.error)
      alert(response.error)
    }
  }

  const click = (userId) => {
    getStampCards(userId);
    console.log("getStampCards")
    console.log(userId)
  }

  const create = async (stampProvID, stampType) => {
    console.log("create")
    await createStamp(stampProvID, stampType);
    await fetchStamps();
    await getStampCards(props.userData.id)
  }

  const createStamp = async(stampProvID, stampType) => {
    //query must have a stampProvID
    if (stampProvID === 'undefined' || stampProvID === '') {
      console.log('stampProvID is missing or invalid in createStamp(), stampProvID  = ', stampProvID)
      return false;
    }
    //query must have a stampType
    if (stampType === 'undefined' || stampType === '') {
      console.log('stampType is missing or invalid in createStamp(), stampType = ', stampType)
      return false;
    }

    //query must have an userID
    if (props.userData.id === 'undefined' || props.userData.id === '') {
      console.log('userID is missing or invalid in createStamp(), userID = ', props.userData.id)
      return false;
    }
    const stamp = {
      userID: props.userData.id,
      stampProvID: stampProvID,
      stampGivenTime: new Date(),
      stampUseTime: null,
      stampDelTime: null,
      stampType: stampType,
      stampStatus: 1
    }

    let data = await copyStampToData(stamp)
    //console.log(data)
    const conf = { 
      method: 'POST', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    const resp = await fetch(stampPath,conf)
    const response = await resp.json();
    
    if (response.status === 'success') {
      console.log('createStamp returned success')
      console.log(response)
      return response
    }
    else {
      alert('Error in creating a new stamp ')
      console.log('error')
      console.log(response)
      return response
    }
  }

  const deleteStamp = async(id) => {
    //query must have an id
    if (id === 'undefined' || id === '') {
      console.log('id is missing or invalid in deleteStamp(), id = ', id)
      return false;
    }

    const conf = { 
      method: 'DELETE', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    }
    const URL = stampPath+id;
    
    const resp = await fetch(URL, conf)
    const response = await resp.json()

    if (response.status === 'success') {
      console.log('deleteStamp() returned success')
      console.log(response)
        }
    else {
      alert('Error in deleteStamp() ')
      console.log('error')
      console.log(response)
      return false
    }
    fetchStamps();
  }

  const update = async (id) => {
    console.log(id)
    let response = await getStamp(id)
    const jsonData = await response.json();
    console.log(jsonData)
  
    let data = jsonData.data;
    console.log("3")
    console.log(data)
    
    if (data !== undefined) {
      let stamp = await copyDataToStamps(data)
      console.log(stamp)
      //user = {...user, 'firstName':'TTTTT'}
      //console.log(stamp)
      updateStamp(id, stamp);
      console.log("update")
      fetchStamps();
    }
  } 
/*
  const fetchStampsForStampCard = async(userID) => {
    const URL = stampCardPath+userID;
    console.log(URL)
    const response = await fetch(URL)
    const jsonData = await response.json();
    console.log(jsonData.data)
    console.log("3")
    console.log(jsonData.data)
    if (jsonData.data !== undefined) {
      let stamps = await copyDataToStamps(jsonData.data)
      console.log(stamps)
      return jsonData.data
    }
  }

  const searchStampsForStampCard = async (userID) => {
    const data = await fetchStampsForStampCard(userID)
    console.log(data)
    let stampCard = updateStampCard(stamps)
    console.log(stampCard)
  }
  
  const updateStampCard = (stamps) => {
    let stampProvIDArr = []
    for (let i=0; i<stamps.length;i++) {
      stampProvIDArr[i] = parseInt(stamps[i].stampProvID, 10);
    }
    console.log(stampProvIDArr)
    let stampProvIDs = new Set(stampProvIDArr)
    console.log(stampProvIDs)
    stampProvIDArr = Array.from(stampProvIDs)
    console.log(stampProvIDArr)
    let count, stampCard=[];
    console.log(stamps)
    for (let j=0; j < stampProvIDArr.length;j++){
      count = 0
      for (let i=0; i<stamps.length;i++) {
        if (parseInt(stamps[i].stampProvID,10) === stampProvIDArr[j]) {
          if (stamps[i].stampType === 1 && stamps[i].stampUseTime === null)
            count++
          else if (stamps[i].stampType < 0 && stamps[i].stampUseTime === null)
            count = count + stamps[i].stampType
        }
      }
      console.log(count)
      let cardItem = {"stampProvID": stampProvIDArr[j], "count": count}
      console.log(cardItem)
      stampCard.push(cardItem)
    }
    console.log(stampCard);
    setStampCard(stampCard)
    return stampCard;
  } */

  const updateUsedStamps = async (userID, stampProvID) =>{
    //query must have a stampProvID
    if (stampProvID === 'undefined' || stampProvID === '') {
      console.log('missing or invalid stampProvID in updateUsedStamps(), stampProvID  = ', stampProvID)
      return;
    }
    //query must have an userID
    if (userID === 'undefined' || userID === '') {
      console.log('missing or invalid userID  in updateUsedStamps(), userID = ', userID)
      return;
    }

    const response1 = await createStamp(stampProvID, enjoyFreeLunch);

    const data = {user_id: userID, stamp_pro_id:stampProvID};
    const conf = { 
      method: 'PUT', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    const resp = await fetch(freeLunchPath,conf)
    const response = await resp.json();
    console.log(response)
    return response;
  }
 

  return (
    <div>
      {props.loginData.isLogged && 
      <h4>Current User = {props.userData.email} id = {props.userData.id}</h4> }
      <br></br>
      <h3>Stamp card</h3>
      {props.loginData.isLogged &&
      <Button name = "stampcards" onClick = {()=>click(props.userData.id)} positive>Update stampcards</Button> }
      {props.loginData.isLogged && <PaperStampCards stampCard = {stampCard} />}
      <ul>
        {stampCard.map((item) => (
          <li style={{fontSize: '15px'}} key={item.stampProvID}>stampProvID = {item.stampProvID} count = {item.stampCount}
          </li>
        ))}
      </ul>
      
      {props.loginData.isLogged &&<Button name = "stamps" onClick = {fetchStamps}>Get stamps</Button>}
      {props.loginData.isLogged &&<Button name = "createStamp" onClick = {()=>create(1,1)} positive>Create stamp, kuppila = 1</Button>}
      {props.loginData.isLogged &&<Button name = "createStamp" onClick = {()=>create(2,1)} positive>Create stamp, kuppila = 2</Button>}   
      {props.loginData.isLogged &&<Button name = "freeLunch" onClick = {()=>freeLunch(1)} color='teal'>Free lunch, kuppila = 1</Button>} 
      {props.loginData.isLogged &&<Button name = "freeLunch" onClick = {()=>freeLunch(2)} color='teal'>Free lunch, kuppila = 2</Button>} 
   
      <h3>List of stamps</h3>
      <Table size='small' style={{fontSize: '15px'}} >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={6}>Restaurant</Table.HeaderCell>
            <Table.HeaderCell width={6}>Date</Table.HeaderCell>
            <Table.HeaderCell width={6}>Used Date</Table.HeaderCell>
            <Table.HeaderCell width={6}>Type</Table.HeaderCell>
            <Table.HeaderCell width={6}>Delete</Table.HeaderCell>
            <Table.HeaderCell width={6}>Update</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {props.loginData.isLogged &&<Table.Body>
         {stamps.map((item) => (
          <Table.Row key = {item.id}>
            <Table.Cell >{item.stampProvID}</Table.Cell>
            <Table.Cell>{moment(item.stampGivenTime).format('DD.MM.YY')}</Table.Cell>
            <Table.Cell>{moment(item.stampUseTime).format('DD.MM.YY')}</Table.Cell>
            <Table.Cell>{item.stampType}</Table.Cell>
            <Table.Cell><Button onClick = {()=>deleteStamp(item.id)}>Delete</Button></Table.Cell>
            <Table.Cell><Button onClick = {()=>update(item.id)}>Update</Button></Table.Cell>
          </Table.Row>
        ))} 
        </Table.Body>}
        </Table>
    </div>
  );
};

export default StampCard;

