
const copyFrontToBack = (user) => {
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

const copyBackToFront = (data) =>{
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

export {
  copyBackToFront,
  copyFrontToBack
}
