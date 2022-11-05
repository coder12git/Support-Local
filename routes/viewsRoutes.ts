import express, { Router } from 'express';

const router: Router = express.Router();

router.get('/', function (req, res) {
  res.render('home');
});

router.get('/charity', function (req, res) {
  res.render('charity');
});

router.get('/volunteer', function (req, res) {
  res.render('volunteer');
});

router.get('/fund', function (req, res) {
  res.render('fund');
});

router.get('/shop', function (req, res) {
  res.render('shop');
});

router.get('/charityPost', function (req, res) {
  res.render('charityPost');
});

router.get('/shopPost', function (req, res) {
  res.render('shopPost');
});

router.get('/fundPost', function (req, res) {
  res.render('fundPost');
});

router.get('/donate', function (req, res) {
  res.render('donate');
});


export default router;
