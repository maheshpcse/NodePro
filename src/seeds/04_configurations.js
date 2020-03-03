exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('configurations').del()
    .then(function () {
      // Inserts seed entries
      return knex('configurations').insert([
        {"configId":"1","config_name":"Get Notifications","userId":"user","role":"user,admin","viewConfig":"1","addConfig":"1","updateConfig":"1","deleteConfig":"1","status":"Active","created_at":"2020-01-22 18:30:00","updated_at":"2020-01-22 18:30:00"},
        {"configId":"2","config_name":"Send Notifications","userId":"admin","role":"admin,user","viewConfig":"0","addConfig":"0","updateConfig":"1","deleteConfig":"1","status":"Active","created_at":"2020-01-22 07:30:00","updated_at":"2020-01-22 07:30:00"},
        {"configId":"3","config_name":"Delete Notifications","userId":"user","role":"user,admin","viewConfig":"1","addConfig":"1","updateConfig":"1","deleteConfig":"1","status":"Active","created_at":"2020-01-24 04:16:02","updated_at":"2020-01-24 04:16:02"},
        {"configId":"4","config_name":"Task Info","userId":"user","role":"user","viewConfig":"0","addConfig":"1","updateConfig":"1","deleteConfig":"1","status":"Active","created_at":"2020-02-28 10:33:42","updated_at":"2020-02-28 10:33:42"},
        {"configId":"5","config_name":"Forms","userId":"user","role":"user","viewConfig":"1","addConfig":"1","updateConfig":"1","deleteConfig":"1","status":"Active","created_at":"2020-02-28 05:03:42","updated_at":"2020-02-28 05:03:42"},
        {"configId":"6","config_name":"Test case","userId":"user","role":"user","viewConfig":"1","addConfig":"0","updateConfig":"0","deleteConfig":"1","status":"Active","created_at":"2020-02-27 18:03:42","updated_at":"2020-02-27 18:03:42"},
        {"configId":"7","config_name":"Sample one","userId":"user","role":"user","viewConfig":"1","addConfig":"1","updateConfig":"1","deleteConfig":"0","status":"Active","created_at":"2020-02-28 10:33:42","updated_at":"2020-02-28 10:33:42"}
        ]);
    });
};