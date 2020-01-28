exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('notifications').del()
    .then(function () {
      // Inserts seed entries
      return knex('notifications').insert([{
          "notify_id": "1",
          "notification": "sample notification",
          "type_of_notify": "message",
          "module_name": "chat",
          "sender_name": "user1",
          "receiver_name": "user2",
          "status": "1",
          "user_id": "1",
          "notify_time": "",
          "created_at": "2019-12-30 18:31:39",
          "updated_at": "2019-12-30 18:31:39"
        },
        {
          "notify_id": "2",
          "notification": "test notify",
          "type_of_notify": "alert",
          "module_name": "tasks",
          "sender_name": "user1",
          "receiver_name": "user2",
          "status": "1",
          "user_id": "2",
          "notify_time": "",
          "created_at": "2020-01-24 14:44:32",
          "updated_at": "2020-01-24 14:44:32"
        },
        {
          "notify_id": "4",
          "notification": "holiday",
          "type_of_notify": "group_message",
          "module_name": "leaves",
          "sender_name": "user1",
          "receiver_name": "user2",
          "status": "1",
          "user_id": "3",          
          "notify_time": "",
          "created_at": "2020-01-24 14:46:21",
          "updated_at": "2020-01-24 14:46:21"
        },
        {
          "notify_id": "5",
          "notification": "birthday",
          "type_of_notify": "wishes",
          "module_name": "users",
          "sender_name": "user1",
          "receiver_name": "user2",
          "status": "1",
          "user_id": "4",
          "notify_time": "",
          "created_at": "2020-01-24 14:47:15",
          "updated_at": "2020-01-24 14:47:15"
        }
      ]);
    });
};