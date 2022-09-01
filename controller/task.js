const task = require('../model/task');
class Controller {

    // get all task
    getAll(req, res, next) {
        task.find((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }

    getTasksByUser(req, res, next) {
        let { _id } = req.user
        task.find({ user_id: _id }, (err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
        // task.aggregate(
        //     [
        //         {
        //             '$match': {
        //                 "date": { $gte: getFirstDayOfMonth(), $lt: date }
        //             }
        //         // },
        //         // {
        //         //     '$lookup': {
        //         //         'from': 'price',
        //         //         'localField': 'price',
        //         //         'foreignField': '_id',
        //         //         'as': 'prices'
        //         //     }
        //         // },
        //         // {
        //         //     '$set': {
        //         //         'key': 1
        //         //     }
        //         // },
        //         // {
        //         //     '$unwind': {
        //         //         'path': '$prices'
        //         //     }
        //         // },
        //         // {
        //         //     '$group': {
        //         //         '_id': '$key',
        //         //         'totalAmount': {
        //         //             '$sum': '$prices.amount'
        //         //         }
        //         //     }
        //         }
        //     ],
        //     (err, response) => {
        //         if (err) return next(err);
        //         res.status(200).send({
        //             success: true,
        //             message: "Get Records Successfully",
        //             response,
        //         });
        //     }
        // );
    }

    //post
    add(req, res, next) {
        console.log(req.user);
        let body = req.body;
        let doc = new task({ ...body, user_id: req.user._id });
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }

    //update
    async update(req, res, next) {
        let { id } = req.params;
        const body = req.body;
        // const oldtask = await task.findById(id);
        // if (status) oldtask.status = status;


        task.updateOne(
            { _id: id },
            {
                $set: body,
            },
            (err, response) => {
                if (err) return next(err);
                res.status(200).send({ success: true, response });
            }
        );

        // await oldtask.save((err, response) => {
        //     if (err) return next(err);
        //     res.status(200).send({ success: true, response });
        // })
    };

}
const controller = new Controller();
module.exports = controller;