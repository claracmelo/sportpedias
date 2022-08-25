const express = require('express');
const router = express.Router()
const Sport = require('../models/sports.js')
const Fact = require('../models/facts.js')
const Contact = require('../models/contact.js')
const Comment = require('../models/comments.js')

//----------------------------------------------------------
//					SEEDS
//----------------------------------------------------------

// SEED sports http://localhost:3001/sportpedias/seed or https://sportpedias.herokuapp.com/sportpedias/seed

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

//SEED fact http://localhost:3001/sportpedias/seedf or https://sportpedias.herokuapp.com/sportpedias/seedf

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

router.get('/seedc', (req, res) => {
	Contact.create(
		[
			{
				name: "Clara Lima",
				email: "claracmelo@hotmail.com",
				message: "oi"
			},
		],
		(err, data) => {
			res.redirect('/sportpedias/sports');
		}
	);
});

//SEED fact http://localhost:3001/sportpedias/seedc or https://sportpedias.herokuapp.com/sportpedias/seedc

//----------------------------------------------------------
//					MAIN - SPORTPEDIAS
//----------------------------------------------------------
//HOME - WORKING
router.get('/', async (req, res) => {
	let sports = await Sport.find({});
	res.render('home.ejs', { sports });
});

//----------------------------------------------------------
//					SPORTS
//----------------------------------------------------------

// INDEX - WORKING
// ASYNC & AWAIT
router.get('/sports', async (req, res) => {
	let sports = await Sport.find({});
	res.render('index.ejs', { sports });
});

// // SHOW -- WORKING
router.get('/sports/:id', async (req, res) => {
	const sport = await Sport.findById(req.params.id);
	res.render('show.ejs', {
		sport: sport,
	});
});

// // NEW
// router.get('/new', (req, res) => {
// 	res.render('new.ejs');
// });

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

// DESTROY - WORKING
router.delete('/sports/:id', (req, res) => {
	Sport.findByIdAndRemove(req.params.id, (err, data)=> {
		if(err) 
		console.log("error to delete",err)
		res.redirect('/sportpedias/sports')
	})
})


//----------------------------------------------------------
//					CONTACT
//----------------------------------------------------------

//SHOW CONTACT -- WORKS
router.get('/contact', (req, res) => {
	res.render('contact.ejs');
});

// //CREATE CONTACT - WORKS
router.post('/', (req, res) => {
	Contact.create(req.body, (error, createContact) => {
		if (error) {
			console.log('error to create', error);
			res.send(error);
		} else {
			res.redirect('/sportpedias');
		}
	});
});

//----------------------------------------------------------
//					COMMENT
//----------------------------------------------------------

// //CREATE COMMENT
// router.get('/:id/comments', async (req, res) => {
// 	const sport = await Sport.findById(req.params.id);
// 	res.render('show.ejs', {
// 		sport: sport,
// 	});
// });

//----------------------------------------------------------
//						RULES
//----------------------------------------------------------
// //SHOW RULES
router.get('/sports/:id/rules', async (req, res) => {
	const sport = await Sport.findById(req.params.id);
	res.render('rules.ejs', {
		sport: sport,
	});
});

//----------------------------------------------------------
//						FACT
//----------------------------------------------------------

// //INDEX FACT - WORKS
router.get('/sports/:id/facts', async (req, res) => {
	const sports = await Sport.findById(req.params.id);
	// const fact = await Fact.findById(req.params.idf);
	const facts = await Fact.find({});
	res.render('fact.ejs', { 	
		// fact: fact,	
		facts: facts,
		sports: sports
	});
});

//SHOW FACT - WORKS
router.get('/sports/:id/facts/:idf', async (req, res) => {
	const fact = await Fact.findById(req.params.idf);
	const sport = await Sport.findById(req.params.id);
	res.render('fact.ejs', {
		fact: fact,
		sport: sport
	});
});

// DELETE FACT -- WORKS
router.delete('/sports/:id/facts/:idf', (req, res) => {
	Fact.findByIdAndRemove(req.params.idf, (err, data)=> {
		if(err) 
		console.log("error to delete",err)
		res.redirect(`/sportpedias/sports/${req.params.id}/facts`)
	})
})

// // EDIT FACT -- WORKS
router.get('/sports/:id/facts/:idf/edit', (req, res) => {
	const sport = Sport.findById(req.params.id);
	Fact.findById(req.params.idf, (err, factFound) => {
		res.render('editF.ejs', {fact: factFound, sport:sport})
	})
})

// // UPDATE FACT -- WORKS
router.put('/sports/:id/facts/:idf', (req, res) => {
	const sport = Sport.findById(req.params.id);
	Fact.findByIdAndUpdate(req.params.idf, req.body, {new:true}, (err, updatedModel) => {
		
		sport:sport
		res.redirect(`/sportpedias/sports/${req.params.id}/facts`)
	})
})


module.exports = router
