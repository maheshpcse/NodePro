exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([{
          "user_id": "1",
          "firstname": "N",
          "lastname": "G",
          "username": "nigel",
          "email": "nigel@email.com",
          "password": "password",
          "phonenumber": "9876543210",
          "role": "user",
          "assigned_roles": "manager",
          "designation": "Graphics designer",
          "department": "IT\/Application Software",
          "profilePath": "file-1578542878025-a.png",
          "uploadProfiles": "",
          "status": "Inactive",
          "configure": "Blocked",
          "created_at": "2019-12-16 10:19:46",
          "updated_at": "2019-12-16 10:19:46"
        },
        {
          "user_id": "2",
          "firstname": "N",
          "lastname": "K",
          "username": "nakaz",
          "email": "nakaz@email.com",
          "password": "password1",
          "phonenumber": "1234567890",
          "role": "manager",
          "assigned_roles": "user",
          "designation": "UI\/UX developer",
          "department": "IT\/Software",
          "profilePath": "file-1578542992948-a.jpg",
          "uploadProfiles": "",
          "status": "Inactive",
          "configure": "Unblocked",
          "created_at": "2019-12-16 10:19:46",
          "updated_at": "2019-12-16 10:19:46"
        },
        {
          "user_id": "3",
          "firstname": "J",
          "lastname": "W",
          "username": "jaywon",
          "email": "jaywon@email.com",
          "password": "password12",
          "phonenumber": "9949393483",
          "role": "user",
          "assigned_roles": "manager",
          "designation": "Angular developer",
          "department": "IT\/Software",
          "profilePath": "file-1578542908581-a.png",
          "uploadProfiles": "",
          "status": "Inactive",
          "configure": "Blocked",
          "created_at": "2019-12-16 10:19:46",
          "updated_at": "2019-12-16 10:19:46"
        },
        {
          "user_id": "4",
          "firstname": "S",
          "lastname": "T",
          "username": "smith",
          "email": "smith@email.com",
          "password": "password123",
          "phonenumber": "8332005225",
          "role": "manager",
          "assigned_roles": "user",
          "designation": "Java developer",
          "department": "IT\/Software",
          "profilePath": "file-1578543012060-a.jpg",
          "uploadProfiles": "",
          "status": "Inactive",
          "configure": "Unblocked",
          "created_at": "2019-12-17 18:03:14",
          "updated_at": "2019-12-17 18:03:14"
        },
        {
          "user_id": "5",
          "firstname": "J",
          "lastname": "H",
          "username": "john",
          "email": "john@email.com",
          "password": "password1234",
          "phonenumber": "7661876696",
          "role": "user",
          "assigned_roles": "manager",
          "designation": "Android developer",
          "department": "IT\/Software",
          "profilePath": "file-1578542934771-a.png",
          "uploadProfiles": "",
          "status": "Inactive",
          "configure": "Blocked",
          "created_at": "2019-12-17 18:19:50",
          "updated_at": "2019-12-17 18:19:50"
        },
        {
          "user_id": "6",
          "firstname": "Pachapalam",
          "lastname": "Mahesh",
          "username": "admin",
          "email": "admin@email.com",
          "password": "1234",
          "phonenumber": "8886197968",
          "role": "admin",
          "assigned_roles": "user,manager",
          "designation": "Mean stack developer",
          "department": "IT\/Software",
          "profilePath": "file-1578313242691-a.png",
          "uploadProfiles": "files-1578474807331-a.png,files-1578474807334-a.jpg,files-1578474807334-a.png",
          "status": "Active",
          "configure": "Unblocked",
          "created_at": "2019-12-19 10:27:00",
          "updated_at": "2019-12-19 10:27:00"
        },
        {
          "user_id": "7",
          "firstname": "S",
          "lastname": "K",
          "username": "user",
          "email": "user@email.com",
          "password": "1234",
          "phonenumber": "1234567890",
          "role": "user",
          "assigned_roles": "manager,admin",
          "designation": "Graphics designer",
          "department": "IT\/Application Software",
          "profilePath": "file-1578483586945-a.png",
          "uploadProfiles": "",
          "status": "Inactive",
          "configure": "Unblocked",
          "created_at": "2019-12-19 10:29:07",
          "updated_at": "2019-12-19 10:29:07"
        },
        {
          "user_id": "8",
          "firstname": "M",
          "lastname": "A",
          "username": "manager",
          "email": "manager@email.com",
          "password": "1234",
          "phonenumber": "9876543210",
          "role": "manager",
          "assigned_roles": "user,admin",
          "designation": "Project manager",
          "department": "IT\/Application Programmer",
          "profilePath": "file-1578483628178-a.jpg",
          "uploadProfiles": "",
          "status": "Inactive",
          "configure": "Unblocked",
          "created_at": "2019-12-19 10:29:33",
          "updated_at": "2019-12-19 10:29:33"
        },
        {
          "user_id": "9",
          "firstname": "T",
          "lastname": "S",
          "username": "test",
          "email": "test@email.com",
          "password": "1234",
          "phonenumber": "9848022338",
          "role": "user",
          "assigned_roles": "manager",
          "designation": "Computer Hardware",
          "department": "IT\/Hardware",
          "profilePath": "file-1578542952519-a.png",
          "uploadProfiles": "",
          "status": "Inactive",
          "configure": "Blocked",
          "created_at": "2019-12-19 11:48:09",
          "updated_at": "2019-12-19 11:48:09"
        },
        {
          "user_id": "10",
          "firstname": "Vella",
          "lastname": "Venu kalyan",
          "username": "master",
          "email": "master@email.com",
          "password": "1234",
          "phonenumber": "9704078341",
          "role": "admin",
          "assigned_roles": "user,manager",
          "designation": "Node.js developer",
          "department": "IT\/Software",
          "profilePath": "file-1578548104083-a.png",
          "uploadProfiles": "",
          "status": "Inactive",
          "configure": "Unblocked",
          "created_at": "2020-01-09 09:50:02",
          "updated_at": "2020-01-09 09:50:02"
        }
      ]);
    });
};