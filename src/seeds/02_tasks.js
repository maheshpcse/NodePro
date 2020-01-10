exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([{
          "task_id": "2",
          "title": "Clean the car",
          "description": "Wash, wax and vacuum the car",
          "is_complete": "0",
          "user_id": "1",
          "created_at": "2019-12-30 16:45:12",
          "updated_at": "2019-12-30 16:45:12"
        },
        {
          "task_id": "3",
          "title": "Buy groceries",
          "description": "Milk, bread, cheese, eggs, flour",
          "is_complete": "1",
          "user_id": "3",
          "created_at": "2019-12-30 16:45:12",
          "updated_at": "2019-12-30 16:45:12"
        },
        {
          "task_id": "5",
          "title": "test task",
          "description": "test description",
          "is_complete": "1",
          "user_id": "3",
          "created_at": "2019-12-30 17:49:21",
          "updated_at": "2019-12-30 17:49:21"
        },
        {
          "task_id": "6",
          "title": "sample task",
          "description": "sample description",
          "is_complete": "0",
          "user_id": "1",
          "created_at": "2019-12-30 17:49:21",
          "updated_at": "2019-12-30 17:49:21"
        },
        {
          "task_id": "11",
          "title": "sample title1",
          "description": "sample desc1",
          "is_complete": "0",
          "user_id": "2",
          "created_at": "2019-12-31 15:30:42",
          "updated_at": "2019-12-31 15:30:42"
        },
        {
          "task_id": "12",
          "title": "shopping",
          "description": "sample desc2",
          "is_complete": "1",
          "user_id": "1",
          "created_at": "2019-12-31 15:30:42",
          "updated_at": "2019-12-31 15:30:42"
        }
      ]);
    });
};