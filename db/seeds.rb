User.destroy_all
Movie.destroy_all
Comment.destroy_all 
user1 = User.create(name: 'user1')

movie1 = Movie.create(title: 'Terminator 2: Judgement Day', director: 'James Cameron', description: 'Another Terminator was sent back in time this time to kill John Conner', year: 1991)
movie2 = Movie.create(title: 'Tears of the Sun', director: 'Antoine Fuqua', description: 'Bruce Willis and his SEAL platoon leads refugees to sefety in Nigeria.', year: 2003)

comment1 = Comment.create(content: 'content1', user_id: user1.id, movie_id: movie2.id)