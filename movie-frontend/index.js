fetch('http://localhost:3000/movies')
.then(resp => resp.json())
.then(json => movies(json))

function movies(json){
    console.log(json)
}