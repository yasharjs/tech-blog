const router = require('express').Router();
const {Comment} = require('../../models');

// GET /api/comments/
router.get('/',(req,res)=>{
    Comment.findAll({
        attributes:['id','comment_text','user_id','post_id','created_at']
    })
    .then(dbData => res.json(dbData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

// POST /api/comments
router.post('/',(req,res)=>{   //ADD withAuth
    // if(req.session){
    //     Comment.create({
    //         comment_text: req.body.comment_text,
    //         user_id: req.session.user_id,
    //         post_id: req.body.post_id
    //     })
    //     .then(dbCommentData => res.json(dbCommentData))
    //     .catch(err => {
    //         console.log(err);
    //         res.status(400).json(err);
    //     })
    // }
    Comment.create({
        comment_text: req.body.comment_text,
        user_id: req.body.user_id,
        post_id: req.body.post_id
    })
    .then(dbCommentData => res.json(dbCommentData))
})

// DELETE /api/comments/1
router.delete('/:id',(req,res)=>{   //ADD withAuth
    Comment.destroy({
        where:{
            id:req.params.id
        }
    })
    .then(dbCommentData => {
        if(!dbCommentData){
            res.status(404).json({message:'No comment found with this id'})
            return;
        }
        res.json(dbCommentData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

module.exports = router;