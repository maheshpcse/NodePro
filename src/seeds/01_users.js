exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
          "user_id": "1",
          "email": "nigel@email.com",
          "password": "dorwssap",
          "created_at": "2019-12-16 10:19:46",
          "updated_at": "2019-12-16 10:19:46"
        },
        {
          "user_id": "2",
          "email": "nakaz@email.com",
          "password": "password1",
          "created_at": "2019-12-16 10:19:46",
          "updated_at": "2019-12-16 10:19:46"
        },
        {
          "user_id": "3",
          "email": "jaywon@email.com",
          "password": "password123",
          "created_at": "2019-12-16 10:19:46",
          "updated_at": "2019-12-16 10:19:46"
        },
        {
          "user_id": "8",
          "email": "smith123@email.com",
          "password": "password1234",
          "created_at": "2019-12-17 18:03:14",
          "updated_at": "2019-12-17 18:03:14"
        },
        {
          "user_id": "10",
          "email": "john123@email.com",
          "password": "password123456",
          "created_at": "2019-12-17 18:19:50",
          "updated_at": "2019-12-17 18:19:50"
        }
      ]);
    });
};