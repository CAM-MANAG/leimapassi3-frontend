import React from 'react';
import PaperStampCard from './PaperStampCard'

const PaperStampCards = (props) => {
  let items=[];

  const stampCard = props.stampCard;
  console.log(stampCard)
  if (stampCard !== undefined && stampCard.length >0) {
    for (let i=0; i<stampCard.length;i++)
    {
      items.push(<h2 key = {'h2'+ i}>Stamps for kuppila {stampCard[i].stampProvID} </h2>)
      items.push(<PaperStampCard key = {'psc'+ i} stampCard = {stampCard[i]}/>)
    }
  }
 
  return(
    <div>
      {items}
    </div>
  )}
export default PaperStampCards;