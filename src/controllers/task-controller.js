const userquery = require('../library/userquery.js');

module.exports.getTasks = (req, res, next) => {

    (async () => {
        await userquery.simpleselect('tasks', '*').then(async resp => {

            console.log("response is:", resp);

            await userquery.simpleselect('users', '*').then(result => {

                let tasksArr = [];
                let arr = [];
                for (let i = 0; i < result.length; i++) {
                    arr.push(result[i].user_id);
                }
                for (let i = 0; i < resp.length; i++) {
                    if (arr.includes(resp[i].user_id) == true) {
                        var pos = arr.indexOf(resp[i].user_id);
                        console.log("position is:", pos);
                        console.log("username is:", result[pos].username);
                        let obj = {
                            title: resp[i].title,
                            description: resp[i].description,
                            is_complete: resp[i].is_complete,
                            user_id: resp[i].user_id,
                            username: result[pos].username,
                            created_at: resp[i].created_at,
                            updated_at: resp[i].updated_at
                        }
                        tasksArr.push(obj);
                    }
                }
                console.log("tasks data is:", tasksArr);
                res.status(200).json({
                    success: true,
                    statusCode: 200,
                    message: 'Date read successfully',
                    data: tasksArr
                });
            }).catch(err => {
                console.log("Error while getting users", err);
                res.status(200).send(err);
            })
        }).catch(err => {
            console.log("Error while getting tasks", err);
            res.status(200).send(err);
        })
    })();
}