const users = [
  { id:'1', username: 'emanresu', password:'1234'},
  {id:'2', username: 'nameuser', password:'4321'},
  {id:'3', username: 'nameOFuser', password:'5678'}
]

function getUser(uId){
  const findUser = users.find(function(member){
    return userName === member.name
  })
  return findUser;
}

function getUserByUsername(uname){
  const foundUser = users.find(function(member){
    return uname === member.username
  })
  return foundUser;
}
module.exports = { getUserByUsername}
