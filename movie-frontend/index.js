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

const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

const showMovie = (e, movie) => {
    let div = document.getElementById('show-panel')
    
    div.innerHTML = `
    <h2>${movie.attributes.title}</h2>
    <h2>${movie.attributes.director}</h2>
    <h3>${movie.attributes.year}</h3>
    <p>${movie.attributes.description}</p>
    <button id='like'>${EMPTY_HEART}</button> 
    <form id='comment-form'>
            <input id='comment' placeholder='comment'>
            <input type='submit' value='Leave Comment'>
    </form>
    <div id='comment-section'><ul id='movie-comments'></ul>
    </div>
    `

    // return (status ? addLike() : removeLike());
    // let likeStatus = funcion()



    let ul = document.getElementById('movie-comments')
    movie.attributes.comments.forEach(comment => {
        let li = document.createElement('li')
        li.innerText = comment.content
        ul.appendChild(li)
    })
    
    let likeButton = document.querySelector('button')
    likeButton.addEventListener('click', (e) => {
        //likeStatus(e, movie)
        handleLike(e, movie);
    })

    //likeStatus(movie)

    let commentForm = document.getElementById('comment-form')
    commentForm.addEventListener('submit', (e) => {
        addComment(e, movie)
    })
}

const likeStatus = (e, movie) =>{
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
        likeButton.innerText = '♡'
        movie.status = false
    }
    else{
        likeButton.innerText = '♥'
        movie.status = true   
    }
}

const handleLike = (e, movie) => {
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