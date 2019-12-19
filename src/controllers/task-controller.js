const userquery = require('../library/userquery.js');

module.exports.getTasks = (req, res, next) => {

    (async () => {
        await userquery.simpleselect('tasks', '*').then(async resp => {

            console.log("response is:", resp);
    
            await userquery.simpleselect('users', '*').then(result => {

                let tasksArr = [];

                tasksArr.push(resp);

                let arr = [];

                for (let i = 0; i < resp.length; i++) {
                    if(resp[i].user_id == result[i].user_id) {
                        tasksArr.forEach((element, index)=>{
                            element.username = result[index].username;
                            arr.push(element);
                        });
                    }
                }
                tasksArr = arr;
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