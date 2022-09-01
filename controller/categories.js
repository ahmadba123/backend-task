const category = require('../model/category');
class Controller {

    // get all patients
    getAll(req, res, next) {
        category.find((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    }
    //post
    add(req, res, next) {
        let body = req.body;
        let doc = new category(body);
        doc.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        });
    }
  
    //update
    async update(req, res, next) {
        let { id } = req.params;
        const { name} = req.body;
        const oldCategories = await category.findById(id);
        if (name) oldCategories.name = name;
        await oldCategories.save((err, response) => {
            if (err) return next(err);
            res.status(200).send({ success: true, response });
        })
    };
    
}
const controller = new Controller();
module.exports = controller;