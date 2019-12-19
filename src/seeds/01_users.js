exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
          "user_id": "1",
          "username": "nigel",
          "email": "nigel@email.com",
          "password": "password",
          "phonenumber": "9876512340",
          "role": "user",
          "created_at": "2019-12-16 10:19:46",
          "updated_at": "2019-12-16 10:19:46"
        },
        {
          "user_id": "2",
          "username": "nakaz",
          "email": "nakaz@email.com",
          "password": "password1",
          "phonenumber": "7661876696",
          "role": "manager",
          "created_at": "2019-12-16 10:19:46",
          "updated_at": "2019-12-16 10:19:46"
        },
        {
          "user_id": "3",
          "username": "jaywon",
          "email": "jaywon@email.com",
          "password": "password12",
          "phonenumber": "9949393483",
          "role": "user",
          "created_at": "2019-12-16 10:19:46",
          "updated_at": "2019-12-16 10:19:46"
        },
        {
          "user_id": "8",
          "username": "smith",
          "email": "smith@email.com",
          "password": "password123",
          "phonenumber": "1234598760",
          "role": "manager",
          "created_at": "2019-12-17 18:03:14",
          "updated_at": "2019-12-17 18:03:14"
        },
        {
          "user_id": "10",
          "username": "john",
          "email": "john@email.com",
          "password": "password1234",
          "phonenumber": "8332005225",
          "role": "admin",
          "created_at": "2019-12-17 18:19:50",
          "updated_at": "2019-12-17 18:19:50"
        }
      ]);
    });
};