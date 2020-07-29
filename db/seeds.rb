User.destroy_all
Movie.destroy_all
Comment.destroy_all 
user1 = User.create(name: 'user1')

movie1 = Movie.create(title: 'movie1', director: 'director1', description: 'description1', year: 2001)
movie2 = Movie.create(title: 'Tears of the Sun', director: 'Antoine Fuqua', description: 'Bruce Willis and his SEAL platoon leads refugees to sefety in Nigeria.', year: 2003)

comment1 = Comment.create(content: 'content1', user_id: user1.id, movie_id: movie2.id)