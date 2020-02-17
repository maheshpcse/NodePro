exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('configurations').del()
    .then(function () {
      // Inserts seed entries
      return knex('configurations').insert([{
          "configId": "1",
          "config_name": "Get Notifications",
          "userId": "user",
          "role": "user",
          "viewConfig": "1",
          "addConfig": "1",
          "updateConfig": "1",
          "deleteConfig": "1",
          "status": "Active",
          "created_at": "2020-01-23 00:00:00",
          "updated_at": "2020-01-23 00:00:00"
        },
        {
          "configId": "2",
          "config_name": "Send Notifications",
          "userId": "admin",
          "role": "admin,user",
          "viewConfig": "1",
          "addConfig": "0",
          "updateConfig": "1",
          "deleteConfig": "1",
          "status": "Active",
          "created_at": "2020-01-23 00:00:00",
          "updated_at": "2020-01-23 00:00:00"
        },
        {
          "configId": "3",
          "config_name": "Delete Notifications",
          "userId": "user",
          "role": "user",
          "viewConfig": "1",
          "addConfig": "1",
          "updateConfig": "1",
          "deleteConfig": "1",
          "status": "Active",
          "created_at": "2020-01-24 09:46:02",
          "updated_at": "2020-01-24 09:46:02"
        }
      ]);
    });
};