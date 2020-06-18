
const copyUserToData = async(user) => {
  let data = {};
  data.first_name = user.firstName;
  data.last_name = user.lastName;
  data.email = user.email;
  data.password = user.password;
  data.id = user.id;
  console.log('data:', data)
  console.log('user:', user)
  return(data)
}

const copyDataToUser = async(data) =>{
  let user ={}
  user.firstName = data.first_name;
  user.lastName = data.last_name;
  user.email = data.email;
  user.password = data.password;
  user.id = data.id;
  console.log('data:', data)
  console.log('user:', user)
  return(user)
}


const copyDataToStamps = async(data) =>{
  let stampItem ={}
  let tempStamps = []
  for (let i = 0; i<data.length; i++) {
    stampItem = {};
    stampItem.id = data[i].id;
    stampItem.userID = data[i].user_id;
    stampItem.stampProvID = data[i].stamp_pro_id;
    stampItem.stampGivenTime = data[i].qr_given_ts;
    stampItem.stampUseTime = data[i].qr_usage_ts;
    stampItem.stampDelTime = data[i].qr_del_ts;
    stampItem.stampType = data[i].qr_type;
    stampItem.stampStatus = data[i].qr_status;
    tempStamps.push(stampItem)
  }
  console.log('data:', data)
  console.log('stamps:', tempStamps)
  
  return(tempStamps)
}

const copyStampToData = async(stamp) =>{
  let data ={}
  data.user_id = stamp.userID;
  data.stamp_pro_id = stamp.stampProvID;
  data.qr_given_ts = stamp.stampGivenTime;
  data.qr_usage_ts = stamp.stampUseTime;
  data.qr_del_ts = stamp.stampDelTime;
  data.qr_type = stamp.stampType;
  data.qr_status = stamp.stampStatus;
  console.log('data:', data)
  console.log('stamp:', stamp)
  return(data)
}

export {
  copyDataToUser,
  copyUserToData,
  copyDataToStamps,
  copyStampToData
}
