function onSignIn(googleUser) {
  let {id_token} = googleUser.getAuthResponse()
  // $.post()
}

function getUsers() {
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/tasks',
  })
  .done(data => {
    for(item of data) {
      $('#userList').append(`${item.name}<br>`)
    }
  })
  .fail(err => {
    console.log(err)
  })
}

function register(event) {
  event.preventDefault()
  let data = $(this).serializeArray().reduce((acc, cur) => {
    acc[cur.name] = cur.value
    return acc
  }, {})
  $.ajax({
    url: 'http://localhost:3000/users',
    method: 'post',
    data: data
  })
  .done(JWToken => {
    // console.log('created')
    // window.localStorage.setItem('jwt', JWToken)
    window.location.assign('/')
  })
  .fail(err => console.log(err))
}
function login(event) {
  event.preventDefault()
  let data = $(this).serializeArray().reduce((acc, cur) => {
    acc[cur.name] = cur.value
    return acc
  }, {})
  console.log('data')
  console.log(data)
  $.ajax({
    url: `http://localhost:3000/login`,
    method: 'post',
    data: data
  })
    .done(jwt => {
      console.log('jwt')
      console.log(jwt)
      window.localStorage.setItem('jwt', jwt)
      window.location.assign('/')
    })
    .fail(err => console.log(err))
}

$(document).ready(function() {
  getUsers()
  $('#form-signup').submit(register)
  $('#form-login-regular').submit(login)
})