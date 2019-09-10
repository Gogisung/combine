const express = require('express');
const multer = require('multer');
const path = require('path');

const db = require('../models');
const { isLoggedIn } = require('./middleware');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      const basename = path.basename(file.originalname, ext); // gogo.png, ext===.png, basename===gogo
      done(null, basename + new Date().valueOf() + ext);
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 },
});

//이미지 업로드 기능
router.post('/images', isLoggedIn, upload.array('image'), (req, res) => {
  console.log(req.files);
  res.json(req.files.map(v => v.filename));
});

//게시글 등록하기
router.post('/:id', isLoggedIn, upload.none(), async (req, res, next) => { // POST /api/post
  try {
    const newPost = await db.Post.create({
      title: req.body.title,
      content: req.body.content, // ex) '파이팅 고고'
      UserId: req.user.id,
      SubsidiaryId: req.params.id,
      ContentId: req.query.common,
    });
    if (req.body.image) { // 이미지 주소를 여러개 올리면 image: [주소1, 주소2]
      if (Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map((image) => {
          return db.Image.create({ src: image });
        }));
        await newPost.addImages(images);
      } else { // 이미지를 하나만 올리면 image: 주소1
        const image = await db.Image.create({ src: req.body.image });
        await newPost.addImage(image);
      }
    }
    // const User = await newPost.getUser();
    // newPost.User = User;
    // res.json(newPost);
    const fullPost = await db.Post.findOne({
      where: { id: newPost.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Image,
      }],
    });
    res.json(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});


//게시글 전체 불러오기
router.get('/:id', async (req, res, next) => {
  try {
    //  /post/3 홀딩스
    //  /post/2 아이넷캅
    //  /post/1 시큐리온

    //subsidiary=1: 시큐리온 
    //subsidiary=2: 아이넷캅 
    //subsidiary=3: 홀딩스 

    //common=1 : 보안상식 - 보안용어 
    //common=2 : 보안상식 - 보안Tip
    //common=3 : 보도자료
    //common=4 : 분석리포트
    const post = await db.Post.findAll({
      where: { 
        SubsidiaryId: req.params.id,
        ContentId: req.query.common,
      },
      order: [['createdAt', 'DESC']], // DESC는 내림차순, ASC는 오름차순
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Image,
      }],
    });
    res.json(post);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//게시글 수정
router.patch('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const editPost = await db.Post.update({
      title: req.body.title,
      content: req.body.content,
    }, {
      where: {
        SubsidiaryId: req.params.id,
        ContentId: req.query.common,
        id: req.query.postId,
        // id: req.params.id
      },
    });

    if(req.body.image) { //이미지 주소를 여러개 수정정 할때 image: [url1, url2]
      if(Array.isArray(req.body.image)) {
        const images = await Promise.all(req.body.image.map((image) => {
          return db.Image.update({ src: image });
        }));
        await editPost.addImages(images);
      } else { //이미지 주소 하나만 수정 할 때 image: url1
        const image = await db.Image.update({ src: req.body.image });
        await editPost.addImage(image);

      }
    }
    const fullPost = await db.Post.findOne({
      where: { id: req.params.id },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }, {
        model: db.Image,
      }],
    });
    res.send(fullPost);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//게시글 삭제
router.delete('/:id', isLoggedIn, async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    await db.Post.destroy({ where: { id: req.params.id } });
    res.send(req.params.id);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const comments = await db.Comment.findAll({
      where: {
        PostId: req.params.id,
      },
      order: [['createdAt', 'ASC']],
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }],
    });
    res.json(comments);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.post('/:id/comment', isLoggedIn, async (req, res, next) => { // POST /api/post/1000000/comment
  try {
    const post = await db.Post.findOne({ where: { id: req.params.id } });
    if (!post) {
      return res.status(404).send('포스트가 존재하지 않습니다.');
    }
    const newComment = await db.Comment.create({
      PostId: post.id,
      UserId: req.user.id,
      content: req.body.content,
    });
    await post.addComment(newComment.id);
    const comment = await db.Comment.findOne({
      where: {
        id: newComment.id,
      },
      include: [{
        model: db.User,
        attributes: ['id', 'nickname'],
      }],
    });
    return res.json(comment);
  } catch (e) {
    console.error(e);
    return next(e);
  }
});

module.exports = router;
