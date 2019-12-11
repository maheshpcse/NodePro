exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
          user_id: 1,
          email: 'nigel@email.com',
          password: 'dorwssap'
        },
        {
          user_id: 2,
          email: 'nakaz@email.com',
          password: 'password1'
        },
        {
          user_id: 3,
          email: 'jaywon@email.com',
          password: 'password123'
        }
      ]);
    });
};