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
    <h2>${movie.title}</h2>
    <h2>${movie.director}</h2>
    <h3>${movie.year}</h3>
    <p>${movie.description}</p>
    <button id='like'>Like</button> 
    <form id='comment-form'>
            <input id='comment' placeholder='comment'>
            <input type='submit' value='Leave Comment'>
    </form>
     `
    console.log(movie)
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

    let data = {content: e.target.comment.value, movie_id: movie.id, user_id: 5}

    console.log(data.id)
    fetch(`http://localhost:3000/comments`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
        },
        body: JSON.stringify(data),
    })
}

{/* <form id='new-movie-form'>
            <input id='title' placeholder='title'>
            <input id='description' placeholder='description'>
            <input id='img_url' placeholder='image'>
            <input type='submit' value='submit'>
        </form> */}

{/* <img src='${book.img_url}'>
            <h4>${book.title}</h4>
            <p>${book.description}</p>
            <button id='like'><3</button> */}
