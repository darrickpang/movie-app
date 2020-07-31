document.addEventListener('DOMContentLoaded', () => {
    initializeUserForm()
    initializeLoginForm()
})

const initializeUserForm = () =>{
    let body = document.querySelector('body')
    let span = document.createElement('span')
    span.setAttribute('id', 'userSpan')
    span.innerHTML = `
    <form id='user-form'>
            <input id='username' placeholder='username'>
            <input type='submit' value='Create User'>
    </form>
    `
    body.appendChild(span)
    
    let userForm = document.getElementById('user-form')
    userForm.addEventListener('submit', (e) => {
        addUser(e)
    })
}

const initializeLoginForm = () =>{
    let body = document.querySelector('body')
    let span = document.createElement('span')
    span.setAttribute('id', 'loginSpan')
    span.innerHTML = `
    <form id='login-form'>
            <input id='username' placeholder='username'>
            <input type='submit' value='Login'>
    </form>
    `
    body.appendChild(span)
    
    let loginForm = document.getElementById('login-form')
    loginForm.addEventListener('submit', (e) => {

        fetchUser(e)

    })
}

const fetchUser = (e) => {
    e.preventDefault()
    let data = ({name: e.target["0"].value})

    fetch(`http://localhost:3000/users`) 
    .then(res => res.json())
    .then(json => checkUser(data.name, json))
}

const checkUser = (username, userArray) => {

    let foundUser = userArray.find(function(post , index) {
        if (post.name == username)
        return true;
    })

    if (foundUser) {
        fetchMovies();
        
    } else {
        alert('Username Not Found! Please Create User!')
    }
    found_user_id = foundUser.id
}

const addUser = (e) => {
    e.preventDefault()
    let data = ({name: e.target["0"].value})

    fetch(`http://localhost:3000/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data),
    }) 
}

const fetchMovies = () => {
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(json => listMovies(json))
}

const listMovies = (movies) => {
    let ul = document.getElementById('list')
    for(let i = 0; i < movies.data.length; i++) {
        let li = document.createElement('li')
        li.innerHTML = `
            <h3>${movies.data[i].attributes.title}</h3> `
        
        li.addEventListener('click', (e) => {
             showMovie(e, movies.data[i])
        })        
        ul.appendChild(li)
    }
}

const showMovie = (e, movie) => {
    let div = document.getElementById('show-panel')
    
    div.innerHTML = `
    <h2>${movie.attributes.title}</h2>
    <h2>${movie.attributes.director}</h2>
    <h3>${movie.attributes.year}</h3>
    <p>${movie.attributes.description}</p>
    <button id='like'>♡</button> 
    <form id='comment-form'>
            <input id='comment' placeholder='comment'>
            <input type='submit' value='Leave Comment'>
    </form>
    <button id='update'>Update Comment</button>
    <div id='comment-section'><ul id='movie-comments'></ul>
    </div>
    `

    let ul = document.getElementById('movie-comments')
    movie.attributes.comments.forEach(comment => {
        let li = document.createElement('li')
        li.id = 'liElement'
        li.innerHTML = `<button id="edit" data-id=${comment.id}>Edit</button>
                        <button id="delete" data-id=${comment.id}>Delete</button>`
        li.innerText = comment.content
        ul.appendChild(li)

        let editButton = document.createElement('button')
        editButton.innerText = 'Edit'
        editButton.addEventListener('click', (e) => {
            editComment(e, comment)
        })
        li.append(editButton)

        let updateComments = document.getElementById('update')
        updateComments.addEventListener('click', (e) => {
            updateComment(e, movie, comment)
        })

        let deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click', (e) => {
            deleteComment(comment)
        })
        li.append(deleteButton)
    })
    
    let likeButton = document.querySelector('button')
    likeButton.addEventListener('click', (e) => {
        likeStatus(e, movie),
        handleLike(e, movie)
    })

    //likeStatus(movie)

    let commentForm = document.getElementById('comment-form')
    commentForm.addEventListener('submit', (e) => {
        addComment(e, movie)
    })
}


const editComment = (e, comment) => {
    fetch(`http://localhost:3000/comments/${comment.id}`)
        .then(function(response){
            return response.json()
        })
        .then(comment => {
            let form = document.getElementById('comment-form')
            console.log(form[0].value)
            commentForm = form[0]
            commentForm.value = comment.content
            commentForm.dataset.id = comment.id
        })
    
}

const updateComment = (e, movie, comment) =>{
    e.preventDefault()

    
    console.log(document.getElementById('liElement'))
    let ul = document.getElementById('movie-comments')
    let editComment = document.getElementById('liElement')
    
    let form = document.getElementById('comment-form')
    console.log(form[0].value)
    editComment.textContent = form[0].value
    // ul.appendChild(editComment)
    
    // let edit = ul.querySelector(li)
    // let editButton = document.createElement('button')
    // edit.append(editButton)

    let data = {content: form[0].value, movie_id: movie.id, user_id: found_user_id}
    
    fetch(`http://localhost:3000/comments/${comment.id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data),
    }) 
}

const deleteComment = (comment) =>{
    console.log(comment.id)
    let clear = event.target.parentElement
    clear.remove()    
    console.log(event.target.parentElement)
    fetch(`http://localhost:3000/comments/${comment.id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    }) 
}

const likeStatus = (e, movie) =>{                       // NEEDS TO BE FIXED!!!
    e.preventDefault()
    let likeButton = document.getElementById('like')
    //console.log(likeButton.innerText)
    console.log(movie.attributes.likes)

    fetch(`http://localhost:3000/movies/${movie.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            status: movie.status
      })
    })
    if(movie.status == true){
        likeButton.innerText = '♡' //this works, try it
        movie.status = false
    }
    else{
        likeButton.innerText = '♥'
        movie.status = true   
    }
}

// let foundUser = userArray.find(function(post , index) {
//     if (post.name == username)
//     return true;
// })

// if (foundUser) {
//     fetchMovies();
    
// } else {
//     alert('Username Not Found! Please Create User!')
// }

const handleLike = (e, movie) => {
    e.preventDefault()
    // console.log(e)
    console.log(movie.attributes.likes)
    let likeButton = document.getElementById('like')
    let data = {movie_id: movie.id, user_id: found_user_id, status: movie.status}
    fetch(`http://localhost:3000/likes`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data),
    })
    // debugger 
    if(movie.status == true){
        likeButton.innerText = '♡'
        movie.status = false
    }
    else{
        likeButton.innerText = '♥'
        movie.status = true   
    }
}


const addComment = (e, movie) => {
    e.preventDefault()

    let ul = document.getElementById('movie-comments')
    let comment = document.createElement('li')
    comment.textContent = e.target.comment.value
    ul.appendChild(comment)
    
    let edit = ul.querySelector('li')
    let editButton = document.createElement('button')
    edit.append(editButton)

    let data = {content: e.target.comment.value, movie_id: movie.id, user_id: found_user_id}
    
    fetch(`http://localhost:3000/comments`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data),
    }) 
}