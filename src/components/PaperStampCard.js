import React from 'react';
import {Table} from 'semantic-ui-react';
import Paid from './paid_small.jpg'
import Unpaid from './unpaid_small.jpg'
import 'semantic-ui-css/semantic.min.css'

const PaperStampCard = (props) => {
  let items=[];
  for (let i=0;i<props.stampCard.stampCount;i++) {
    items.push(<img src={Paid} alt ='paid logo' width = '80'/>)
  }

  for (let i=props.stampCard.stampCount;i<10;i++) {
    items.push(<img src={Unpaid} alt ='unpaid logo' width = '80'/>)
  }
  

  return(
  <Table size='small' >
    <Table.Body>
      <Table.Row key = '1'>
        <Table.Cell width={1}>{items[0]}</Table.Cell>
        <Table.Cell width={1}>{items[1]}</Table.Cell>
        <Table.Cell width={1}>{items[2]}</Table.Cell>
        <Table.Cell width={1}>{items[3]}</Table.Cell>
        <Table.Cell width={1}>{items[4]}</Table.Cell>
      </Table.Row>
      <Table.Row key = '2'>
        <Table.Cell width={1}>{items[5]}</Table.Cell>
        <Table.Cell width={1}>{items[6]}</Table.Cell>
        <Table.Cell width={1}>{items[7]}</Table.Cell>
        <Table.Cell width={1}>{items[8]}</Table.Cell>
        <Table.Cell width={1}>{items[9]}</Table.Cell>
      </Table.Row>
    </Table.Body>
  </Table> 
)}
export default PaperStampCard;