# require 'rest-client'

# response = RestClient.get("https://devru-bigflix-movies-download-v1.p.rapidapi.com/movieList.php?pageIndex=1&resultsperpage=20",
#   headers = {
#     "X-RapidAPI-Host" => "devru-bigflix-movies-download-v1.p.rapidapi.com",
#     "X-RapidAPI-Key" => "85738c6f15msh4d8de352b317a53p13b061jsnde4b359cbfa8"
#   })



# parsedRes.each do |movie|
#     Movie.create(
#         title: movie["movieName"],
#         director: movie["director"],
#         year: parseInt(movie["releaseyear"]),
#         description: movie["description"]
#     )
# end

# byebug


User.destroy_all
Movie.destroy_all
Comment.destroy_all 

# byebug
# rm_array = JSON.parse(rm)[“results”]

user1 = User.create(name: 'user1')


movie1 = Movie.create(title: "Terminator 2: Judgement Day", director: "James Cameron", description: "Another Terminator was sent back in time this time to kill John Conner", year: 1991)
movie2 = Movie.create(title: "Tears of the Sun", director: "Antoine Fuqua", description: "Bruce Willis and his SEAL platoon leads refugees to sefety in Nigeria.", year: 2003)
movie3 = Movie.create(title: "The Dark Knight", director: "Christopher Nolan", description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.", year: 2008)
movie4 = Movie.create(title: "Inception", director: "Christopher Nolan", description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.", year: 2010)
movie5 = Movie.create(title: "Pulp Fiction", director: "Quentin Tarantino", description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.", year: 1994)
movie6 = Movie.create(title: "The Lord of the Rings: The Fellowship of the Ring", director: "Peter Jackson", description: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.", year: 2001)
movie7 = Movie.create(title: "The Godfather", director: "Francis Ford Coppola", description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.", year:1972 )
movie8 = Movie.create(title: "Interstellar", director: "Christopher Nolan", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", year: 2014)
movie9 = Movie.create(title: "Schindler's List", director: "Steven Spielberg", description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.", year: 1993)


# movie = Movie.create(title: "", director: "", description: "", year: )

# comment1 = Comment.create(content: 'content1', user_id: user1.id, movie_id: movie2.id)

# user1 = User.create(name: "test1")
# user2 = User.create(name: "test2")
# user3 = User.create(name: "test3")

# movie1 = Movie.create(title: "movie1", description: "description1", director: "director1", year: 2001)
# movie2 = Movie.create(title: "movie2", description: "description2", director: "director2", year: 2002)
# movie3 = Movie.create(title: "movie3", description: "description3", director: "director3", year: 2003)
# movie4 = Movie.create(title: 'Tears of the Sun', director: 'Antoine Fuqua', description: 'Bruce Willis and his SEAL platoon leads refugees to sefety in Nigeria.', year: 2003)

# comment1 = Comment.create(content: 'content1', user_id: user1.id, movie_id: movie1.id)
# comment2 = Comment.create(content: 'content2', user_id: user2.id, movie_id: movie2.id)
# comment3 = Comment.create(content: 'content3', user_id: user3.id, movie_id: movie4.id)

# like1 = Like.create(user_id: 1, movie_id: 1)
# like2 = Like.create(user_id: 2, movie_id: 2)
# like3 = Like.create(user_id: 3, movie_id: 3)