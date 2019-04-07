if (!localStorage.jwt) {
  console.log('kosong')
  $('#keluar').hide()
} else {
  console.log('isi')
  // console.log(localStorage)
  $('#formulir-masuk').hide()
  $('#greetings').append(`${localStorage.username}`)
}

function onSignIn(googleUser) {
  let { id_token } = googleUser.getAuthResponse()
  $.post('http://localhost:3000/google-sign-in', { id_token })
    .then(jwt => {
      window.localStorage.setItem('jwt', jwt.token)
    })
    .catch(err => {
      console.log(err.message)
      swal(err.responseJSON.message)
    })
}

function getTasks() {
  $.ajax({
    method: 'get',
    url: 'http://localhost:3000/tasks',
    headers: (authorization = localStorage.jwt)
  })
    .done(data => {
      for ([index, item] of data.entries()) {
        $('#taskBody').append(`<tr><td>${index+1}</td>
        <td>${item.name}</td>
        <td>${item.description}</td>
        <td>${item.checkStatus}</td>
        <td>${item.dueDate}</td>
        <td><button class="btn btn-primary" onclick="checkTask('${item._id}')" value="${item._id}">Check</button>
        <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit</button>
        <button class="btn btn-primary" onclick="deleteTask('${item._id}')">Delete</button></td></tr>`)
        /* punya button edit -> onclick="editTask('${item._id}')" */
      }
    })
    .fail(err => {
      console.log(err)
      swal('Database Offline')
    })
}

function createTask() {
  event.preventDefault()
  let data = $(this).serializeArray().reduce((acc, cur) => {
    acc[cur.name] = cur.value
    return acc
  }, {})
  data.id = window.localStorage.id
  // console.log(data)
  $.ajax({
    url: 'http://localhost:3000/tasks',
    method: 'post',
    data: data
  })
  .done(task => {
    $('#taskBody').append(`<tr><td>${index+1}</td>
    <td>${item.name}</td>
    <td>${item.description}</td>
    <td>${item.checkStatus}</td>
    <td>${item.dueDate}</td>
    <td><button class="btn btn-primary" onclick="checkTask('${item._id}')" value="${item._id}">Check</button>
    <button class="btn btn-primary" onclick="editTask('${item._id}')" data-toggle="modal" data-target="#exampleModal">Edit</button>
    <button class="btn btn-primary" onclick="deleteTask('${item._id}')">Delete</button></td></tr>`)
  })
  .fail(err => {
    console.log(err)
    swal(err.responseJSON.message)
  })
}

function register(event) {
  // event.preventDefault()
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
      // window.localStorage.setItem('jwt', JWToken)
      window.location.assign('/')
    })
    .fail(err => {
      console.log(err)
      swal(err.responseJSON.message)
    })
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
      window.localStorage.setItem('jwt', jwt.token)
      window.localStorage.setItem('id', jwt.id)
      window.localStorage.setItem('name', jwt.name)
      window.localStorage.setItem('username', jwt.username)
      window.location.assign('/')
    })
    .fail(err => {
      console.log(err)
      swal(err.responseJSON.message)
    })
}

function signOut() {
  if(gapi.auth2) {
    var auth2 = gapi.auth2.getAuthInstance()
    auth2.signOut()
    .then(function () {
      window.localStorage.removeItem('jwt')
      window.localStorage.removeItem('id')
      window.localStorage.removeItem('name')
      window.localStorage.removeItem('username')
      swal('Signed Out')
      window.location.assign('/')
      console.log('User signed out.')
    })
    .catch(err => {
      swal(err.responseJSON.message)
    })
  } else {
    window.localStorage.removeItem('jwt')
    window.localStorage.removeItem('id')
    window.localStorage.removeItem('name')
    window.localStorage.removeItem('username')
    swal('Signed Out')
    window.location.assign('/')
    console.log('User signed out.')
  }
}

function checkTask(id) {
  // event.preventDefault()
  console.log('jalan function')
  console.log(id)
  $.ajax({
    url: `http://localhost:3000/tasks/${id}`,
    method: 'put',
    data: {
      checkStatus : true,
      _id: window.localStorage.id
    }
  })
  .done(data => {
    console.log(data)
    window.location.assign('/')
  })
  .fail(err => {
    console.log('err')
    console.log(err)
    console.log('err')
    swal(err.responseJSON.message)
  })
}
function editTask(id) {
  // event.preventDefault()
}
function deleteTask(id) {
  // event.preventDefault()
  console.log('id')
  console.log(id)
  swal({
    title: 'Delete confirmation',
    text: 'Are you sure you want to delete this task?',
    icon: 'warning',
    buttons: {
      cancel: true,
      confirm: "Yes"
    }
  })
  .then(yes => {
    if(yes) {
      $.ajax({
        url: `http://localhost:3000/tasks/${id}`,
        method: 'delete',
        data: {id: window.localStorage.id}
      })
      .done(data => {
        window.location.assign('/')
      })
      .fail(err => {
        console.log(err)
        swal(err.responseJSON.message)
      })
    } else {

    }
  })
}

$(document).ready(function () {
  $('a').click(function(event) {event.preventDefault()})
  getTasks()
  $('#form-signup').submit(register)
  $('#form-login-regular').submit(login)
  $('#form-add-task').submit(createTask)
})