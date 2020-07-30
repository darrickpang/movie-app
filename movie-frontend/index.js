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
    for(let i = 0; i < movies.data.length; i++) {
        // console.log(movies.data[i].attributes.title)

        let li = document.createElement('li')
        li.innerHTML = `
            <h3>${movies.data[i].attributes.title}</h3> 
        `
        
        li.addEventListener('click', (e) => {
             showMovie(e, movies.data[i])
        })
        // console.log(movie[0].title)
        
        ul.appendChild(li)
    }
    // console.log(movies)
    // let ul = document.getElementById('list')
    // movies.data.forEach(movie => {
    //     // console.log(movie)
    //     let li = document.createElement('li')
    //     li.innerHTML = `
    //         <h3>${movies.data[0].attributes.title}</h3> 
    //     `
        
    //     li.addEventListener('click', (e) => {
    //          showMovie(e, movie)
    //     })
    //     // console.log(movie[0].title)
        
    //     ul.appendChild(li)
    // })
    

}

const showMovie = (e, movie) => {
    let div = document.getElementById('show-panel')
    // let i = movie.data[0].attributes.id
    // console.log(e)
    // console.log(movie)
    div.innerHTML = `
    <h2>${movie.attributes.title}</h2>
    <h2>${movie.attributes.director}</h2>
    <h3>${movie.attributes.year}</h3>
    <p>${movie.attributes.description}</p>
    <button id='like'>Like</button> 
    <form id='comment-form'>
            <input id='comment' placeholder='comment'>
            <input type='submit' value='Leave Comment'>
    </form>
    <div id='comment-section'><ul id='movie-comments'></ul>
    </div>
    `
    // console.log(movie)
    let ul = document.getElementById('movie-comments')
    movie.attributes.comments.forEach(comment => {
        let li = document.createElement('li')
        li.innerText = comment.content
        ul.appendChild(li)
    })
    
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

    let ul = document.getElementById('movie-comments')
    let comment = document.createElement('li')
    comment.textContent = e.target.comment.value
    ul.appendChild(comment)

    let data = {content: e.target.comment.value, movie_id: movie.id, user_id: 7}

    
    fetch(`http://localhost:3000/comments`, {
        method: 'POST', // or 'PUT'
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