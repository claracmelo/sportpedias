const express = require('express');
const router = express.Router()
const Sport = require('../models/sports.js')
const Fact = require('../models/facts.js')
const Comment = require('../models/comments.js')

//HOME
router.get('/', async (req, res) => {
	let sports = await Sport.find({});
	res.render('home.ejs', { sports });
});

// INDEX
// ASYNC & AWAIT
router.get('/sports', async (req, res) => {
	let sports = await Sport.find({});
	res.render('index.ejs', { sports });
});

// SEED sports
router.get('/seed', (req, res) => {
	Sport.create(
		[
			{
				sport: 'SOCCER',
				author: 'Clara Lima', 
				about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
				rules: "oi", 
				facts: "Brazil is the only 5 times champion of the world cup"},],
		(err, data) => {
			res.redirect('/sportpedias/sports');
		}
	);
});

//SEED fact
router.get('/seedf', (req, res) => {
	Fact.create(
		[
			{
				name: "Clara Lima",
				fact: "Brazil won 5 times World Cup",
				img: "https://pbs.twimg.com/media/FEXBr0rXIA48Wy3.jpg"
			},
		],
		(err, data) => {
			res.redirect('/sportpedias/sports');
		}
	);
});

// // NEW
// router.get('/new', (req, res) => {
// 	res.render('new.ejs');
// });

// // SHOW -- 
router.get('/sports/:id', async (req, res) => {
	const sport = await Sport.findById(req.params.id);
	res.render('show.ejs', {
		sport: sport,
	});
});

// // CREATE
// router.post('/sports', (req, res) => {
// 	Sport.create(req.body, (error, createdSport) => {
// 		if (error) {
// 			console.log('error to create', error);
// 			res.send(error);
// 		} else {
// 			res.redirect('/sportpedias');
// 		}
// 	});
// });

// DESTROY
router.delete('/sports/:id', (req, res) => {
	Sport.findByIdAndRemove(req.params.id, (err, data)=> {
		if(err) 
		console.log("error to delete",err)
		res.redirect('/sportpedias/sports')
	})
})

// // EDIT
// router.get('/:id/edit', (req, res) => {
// 	Sport.findById(req.params.id, (err, foundSport) => {
// 		res.render('edit.ejs', {sport: foundSport})
// 	})
// })

// // UPDATE
// router.put('/:id', (req, res) => {
// 	Sport.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
// 		res.redirect(`/sportpedias/${req.params.id}`)
// 	})
// })

// //CREATE CONTACT
router.get('/contact', async (req, res) => {
	const sport = await Sport.findById(req.params.id);
	res.render('contact.ejs', {
		sport: sport,
	});
});

// //CREATE COMMENT
// router.get('/:id/comments', async (req, res) => {
// 	const sport = await Sport.findById(req.params.id);
// 	res.render('show.ejs', {
// 		sport: sport,
// 	});
// });
// //SHOW RULES
router.get('/sports/:id/rules', async (req, res) => {
	const sport = await Sport.findById(req.params.id);
	res.render('rules.ejs', {
		sport: sport,
	});
});
// //SHOW FACT

router.get('/sports/:id/facts', async (req, res) => {
	const facts = await Fact.find({});
	let sports = await Sport.find({});
	res.render('fact.ejs', { 		
		facts: facts,
		sport:sports
	});
});


// // DELETE FACT
// router.delete('/soccer/:id/comment', (req, res) => {
// 	Sport.findByIdAndRemove(req.params.id, (err, data)=> {
// 		if(err) 
// 		console.log("error to delete",err)
// 		res.redirect('/sportpedias/soccer/facts')
// 	})
// })

// // EDIT FACT
// router.get('/:id/facts/edit', (req, res) => {
// 	Sport.findById(req.params.id, (err, foundSport) => {
// 		res.render('edit.ejs', {sport: foundSport})
// 	})
// })

// // UPDATE FACT
// router.put('/:id/facts', (req, res) => {
// 	Sport.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
// 		res.redirect(`/sportpedias/soccer/facts`)
// 	})
// })


module.exports = router
