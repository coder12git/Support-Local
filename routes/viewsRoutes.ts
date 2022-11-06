import express, { Router } from 'express';
import * as viewsController from '../controllers/views/viewsController';

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

router.get('/charity/:charityId', viewsController.getOneCharity);

router.get('/shopPost', function (req, res) {
  res.render('shopPost');
});

router.get('/fundPost', function (req, res) {
  res.render('fundPost');
});

router.get('/donate', function (req, res) {
  res.render('donate');
});

router.get('/addCharity', function (req, res) {
  res.render('addCharity');
});

router.get('/addShop', function (req, res) {
  res.render('addShop');
});

router.get('/needFund', function (req, res) {
  res.render('needFund');
});



export default router;
