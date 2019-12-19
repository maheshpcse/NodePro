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
          "phonenumber": "9876543210",
          "role": "user",
          "created_at": "2019-12-16 10:19:46",
          "updated_at": "2019-12-16 10:19:46"
        },
        {
          "user_id": "2",
          "username": "nakaz",
          "email": "nakaz@email.com",
          "password": "password1",
          "phonenumber": "1234567890",
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
          "phonenumber": "8332005225",
          "role": "manager",
          "created_at": "2019-12-17 18:03:14",
          "updated_at": "2019-12-17 18:03:14"
        },
        {
          "user_id": "10",
          "username": "john",
          "email": "john@email.com",
          "password": "password1234",
          "phonenumber": "7661876696",
          "role": "user",
          "created_at": "2019-12-17 18:19:50",
          "updated_at": "2019-12-17 18:19:50"
        },
        {
          "user_id": "11",
          "username": "admin",
          "email": "admin@email.com",
          "password": "1234",
          "phonenumber": "8886197968",
          "role": "admin",
          "created_at": "2019-12-19 10:27:00",
          "updated_at": "2019-12-19 10:27:00"
        },
        {
          "user_id": "12",
          "username": "user",
          "email": "user@email.com",
          "password": "1234",
          "phonenumber": "1234567890",
          "role": "user",
          "created_at": "2019-12-19 10:29:07",
          "updated_at": "2019-12-19 10:29:07"
        },
        {
          "user_id": "13",
          "username": "manager",
          "email": "manager@email.com",
          "password": "1234",
          "phonenumber": "9876543210",
          "role": "manager",
          "created_at": "2019-12-19 10:29:33",
          "updated_at": "2019-12-19 10:29:33"
        },
        {
          "user_id": "14",
          "username": "test",
          "email": "test@email.com",
          "password": "1234",
          "phonenumber": "9848022338",
          "role": "user",
          "created_at": "2019-12-19 11:48:09",
          "updated_at": "2019-12-19 11:48:09"
        },
        {
          "user_id": "15",
          "username": "sample",
          "email": "sample@email.com",
          "password": "1234",
          "phonenumber": "9704078341",
          "role": "user",
          "created_at": "2019-12-19 11:49:46",
          "updated_at": "2019-12-19 11:49:46"
        }
      ]);
    });
};