User.delete_all
Movie.delete_all
Comment.delete_all 
user1 = User.create(name: 'user1')

movie1 = Movie.create(title: 'Tears of the Sun', director: 'Antoine Fuqua', description: 'Bruce Willis and his SEAL platoon leads refugees to sefety in Nigeria.', year: 2003)

comment1 = Comment.create(content: 'content1', user_id: 1, movie_id: 1)