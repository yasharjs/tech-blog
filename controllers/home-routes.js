const {Post, User, Comment} = require('../models');
const sequelize = require('../config/connection');
const router = require('express').Router();

router.get('/',(req,res)=>{
    Post.findAll({
        attributes:[
            'id',
            'title',
            'post_text',
            'created_at'
        ],
        include:[
            {
                model:Comment,
                attributes:['id','comment_text','post_id','user_id','created_at'],
                include:{
                    model: User,
                    attributes:['username']
                }
            },
            {
                model: User,
                attributes:['username']
            } 
        ]
    })
    .then(dbPostData => {
        //map the data
        const posts = dbPostData.map(post => post.get({plain:true}))
        res.render('homepage',{posts})
    })
    .catch(err => {
        res.status(500).json(err);
    })
})

router.get('/login',(req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/');
        return;
    }
    res.render('login');
})


module.exports = router;