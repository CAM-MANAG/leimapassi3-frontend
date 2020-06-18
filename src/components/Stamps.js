import React, { useEffect, useState } from 'react';
import {Button, Table} from 'semantic-ui-react';
import {copyDataToStamps, copyStampToData} from '../helpers/copy'
import {stampPath, stampsPath, freeLunchPath, stampCardPath} from '../helpers/path'
import moment from 'moment';

const fetch = require('node-fetch');

const enjoyFreeLunch = -10;

const Stamps = () => {
  const [stamps, setStamps] = useState([]);
  const [stampCard, setStampCard]= useState([]);

  useEffect(() => {
    console.log('in useEffect')
    fetchStamps()
    }, []);
    console.log(stamps)

  const createStamp = async(stampProvID, stampType) => {
    const stamp = {
      userID: 1,
      stampProvID: stampProvID,
      stampGivenTime: new Date(),
      stampUseTime: null,
      stampDelTime: null,
      stampType: stampType,
      stampStatus: 1
    }
    let data = await copyStampToData(stamp)
    console.log(data)
    const conf = { 
      method: 'POST', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    const response = await fetch(stampPath,conf)
    const jsonData = await response.json();
    // ToDo tarkista paluuarvo
    let stamps = []
    stamps = jsonData.data;
    console.log(stamps);
  }

  const fetchStamps = async() => {
    const response = await fetch(stampsPath)
    const jsonData = await response.json();
    const data = jsonData.data
    let stamps = await copyDataToStamps(data)
    console.log(stamps)
    setStamps(stamps)
  }

  

  const getStamp = async(id) => {
    const URL = stampPath+id;
    const response = await fetch(URL)
    const jsonData = await response.json();
    console.log(jsonData)
  
    let data = jsonData;
    let stamp = await copyDataToStamps(data)
    console.log(stamp);
    return jsonData;
  }

  /*const searchStamps = async(userID) => {
    const URL = stampPath +`?user_id=${userID}`;
    console.log(URL)
    const response = await fetch(URL)
    const jsonData = await response.json();
    console.log(jsonData)
  
    return jsonData.data;
  }
*/
  const deleteStamp = async(id) => {
    console.log(id)
      const conf = { 
      method: 'DELETE', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
    }
    const URL = stampPath+id;
    
    await fetch(URL, conf)
    .then(resp => resp.json())
    .then(function(resp) {
      if (resp.status !== 'success') {
        console.log(resp.error)
        alert(resp.error)
      }
    })
  }

  const updateStamp = async(id, stamp) => {
    console.log(id)
    console.log(stamp)
    const data = await copyStampToData(stamp)
    console.log(data)
    const conf = { 
      method: 'PUT', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    console.log(data)
    const URL = stampPath+id;
    console.log(URL)
    await fetch(URL, conf)
    .then(resp => resp.json())
    .then(function(resp) {
      if (resp.status !== 'success') {
        console.log(resp.error)
        alert(resp.error)
      }
    })
  }

  const click = (event) => {
    fetchStamps();
    console.log("stamps")
  }

  const create = (id, stampType) => {
    console.log("create")
    createStamp(id, stampType);
    fetchStamps();
  }

  const del = (id) => {
    deleteStamp(id);
    console.log("del")
    fetchStamps();
    console.log("stamps")
  }
  
  const update = async (id) => {
    console.log(id)
    let data = await getStamp(id)
    let stamp = await copyDataToStamps(data)
    console.log(stamp)
    //user = {...user, 'firstName':'TTTTT'}
    //console.log(stamp)
    updateStamp(id, stamp);
    console.log("update")
    fetchStamps();
  }

  const fetchStampsForStampCard = async(userID) => {
    const URL = stampCardPath+userID;
    console.log(URL)
    const response = await fetch(URL)
    console.log(response)
    const jsonData = await response.json();
    console.log(jsonData.data)
    let stamps = await copyDataToStamps(jsonData.data)
    console.log(stamps)
    return jsonData.data
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
  }

  const updateUsedStamps = async (userID, stampProvID) =>{
    const URL = freeLunchPath;
    await createStamp(stampProvID, enjoyFreeLunch);
    console.log(URL)

    const data = {user_id: userID, stamp_pro_id:stampProvID};
    const conf = { 
      method: 'PUT', 
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
    const response = await fetch(URL,conf)
    const jsonData = await response.json();
    console.log(jsonData)
    return jsonData.status;
  }


  const freeLunch = async (stampProvID) => {
    searchStampsForStampCard(1);
    console.log(stampCard)
    console.log(stampProvID)
    let index;
    for (let i = 0; i < stampCard.length; i++) {
      if (stampCard[i].stampProvID === stampProvID) {
        index = i;
        console.log('index = ', index)
      }
    }
    console.log(stampCard[index])
    // if more than 10 stamps collected for a restaurant, the free lunch is possible
    if (stampCard[index].count >= 10) {
      const response = await updateUsedStamps(1, stampProvID);
      if (response === 'success') {
        console.log('success', response)  //ToDO korjaa
        alert('Free Lunch')
      }
      else {
        alert('Sorry, you cant use free lunch today, technical problems')
        console.log('error', response)
      }
    }
    else
      alert('Sorry, not enough stamps')
  }

  return (
    <div>
      <h3>Stamp card</h3>
      <ul>
        {stampCard.map((item) => (
          <li style={{fontSize: '15px'}} key={item.stampProvID}>stampProvID = {item.stampProvID} count = {item.count}
          </li>
        ))}
      </ul>
      <Button name = "stamps" onClick = {click}>Get stamps</Button>
      <Button name = "createStamp" onClick = {()=>create(1,1)} positive>Create stamp, kuppila = 1</Button>
      <Button name = "createStamp" onClick = {()=>create(2,1)} positive>Create stamp, kuppila = 2</Button>    
      <Button name = "searchStamp" onClick = {()=>searchStampsForStampCard(1)} color='olive'>Update stamp card</Button>    
      <Button name = "freeLunch" onClick = {()=>freeLunch(1)} color='teal'>Free lunch, kuppila = 1</Button> 
      <Button name = "freeLunch" onClick = {()=>freeLunch(2)} color='teal'>Free lunch, kuppila = 2</Button> 
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
        <Table.Body>
        {stamps.map((item) => (
          <Table.Row key = {item.id}>
            <Table.Cell >{item.stampProvID}</Table.Cell>
            <Table.Cell>{moment(item.stampGivenTime).format('DD.MM.YY')}</Table.Cell>
            <Table.Cell>{moment(item.stampUseTime).format('DD.MM.YY')}</Table.Cell>
            <Table.Cell>{item.stampType}</Table.Cell>
            <Table.Cell><Button onClick = {()=>del(item.id)}>Delete</Button></Table.Cell>
            <Table.Cell><Button onClick = {()=>update(item.id)}>Update</Button></Table.Cell>
          </Table.Row>
        ))} 
        </Table.Body>
      </Table>
    </div>
  );
};

export default Stamps;

