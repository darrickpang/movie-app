document.addEventListener('DOMContentLoaded', () => {
    fetchMovies()
})

const fetchMovies = () => {
    fetch('http://localhost:3000/movies')
    .then(resp => resp.json())
    .then(json => listMovies(json))
}

const listMovies = (movies) => {
    let ul = document.getElementById('list')
    movies.forEach(movie => {
        let li = document.createElement('li')
        li.innerHTML = `
            <h3>${movie.title}</h3> 
        `
        
        li.addEventListener('click', (e) => {
             showMovie(e, movie)
        })
        // console.log(movie[0].title)
        
        ul.appendChild(li)
    })
}

const showMovie = (e, movie) => {
    let div = document.getElementById('show-panel')
    div.innerHTML = `
    <h1>${movie.title}</h1>
    <h2>${movie.director}</h2>
    <h3>${movie.year}</h3>
    <p>${movie.description}</p>
    <button class='like'>Like</button> 
    <form id='comment-form'>
            <input id='comment' placeholder='comment'>
            <input type='submit' value='Leave Comment'>
    </form>`

    let likeButton = document.querySelector('button')
    likeButton.addEventListener('click', () => {
        handleLike();
    })

    let commentForm = document.getElementById('comment-form')
    commentForm.addEventListener('submit', (e) => {
        addComment(e, movie)
    })
}

const addComment = (e, movie) => {
    e.preventDefault()
    
    let commentForm = document.getElementById('comment-form')
    let comment = document.createElement('li')
    comment.textContent = e.target.comment.value
    commentForm.appendChild(comment)

    let data = {comments: e.target.comment.value}
    fetch(`http://localhost:3000/comments/1`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
}