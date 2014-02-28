/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', { title: 'Express' });
};

exports.record = function (req, res) {
    console.log(req.params.record);
    res.render('record', {record: (req.params.record/1000).toFixed(1)});

};