const express = require('express');
const router = express.Router()
const Sport = require('../models/sports.js')

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

// SEED
router.get('/seed', (req, res) => {
	Sport.create(
		[
			{
				name: "Baseball",
				description: "The ball with synthetic leather",
				img: "https://upload.wikimedia.org/wikipedia/en/thumb/1/1e/Baseball_%28crop%29.jpg/440px-Baseball_%28crop%29.jpg",
				price: 10,
				qty: 37
			},
		
		],
		(err, data) => {
			res.redirect('/sportpedias');
		}
	);
});

// NEW
router.get('/new', (req, res) => {
	res.render('new.ejs');
});

// SHOW -- changed id for sccoer to test it
router.get('/soccer', async (req, res) => {
	const sport = await Sport.findById(req.params.id);
	res.render('show.ejs', {
		sport: sport,
	});
});

// CREATE
router.post('/sports', (req, res) => {
	Sport.create(req.body, (error, createdSport) => {
		if (error) {
			console.log('error to create', error);
			res.send(error);
		} else {
			res.redirect('/sportpedias/sports');
		}
	});
});

// DESTROY
router.delete('/soccer', (req, res) => {
	Sport.findByIdAndRemove(req.params.id, (err, data)=> {
		if(err) 
		console.log("error to delete",err)
		res.redirect('/sportpedias/sports')
	})
})

// EDIT
router.get('/soccer/edit', (req, res) => {
	Sport.findById(req.params.id, (err, foundSport) => {
		res.render('edit.ejs', {sport: foundSport})
	})
})

// UPDATE
router.put('/soccer', (req, res) => {
	Sport.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
		res.redirect(`/sportpedias/soccer`)
	})
})


//CREATE CONTACT
router.get('/contact', async (req, res) => {
	const sport = await Sport.findById(req.params.id);
	res.render('contact.ejs', {
		sport: sport,
	});
});

//CREATE COMMENT
router.get('/soccer/comments', async (req, res) => {
	const sport = await Sport.findById(req.params.id);
	res.render('show.ejs', {
		sport: sport,
	});
});
//SHOW RULES
router.get('/soccer/rules', async (req, res) => {
	const sport = await Sport.findById(req.params.id);
	res.render('rules.ejs', {
		sport: sport,
	});
});
//CREATE FACT
router.get('/soccer/facts', async (req, res) => {
	const sport = await Sport.findById(req.params.id);
	res.render('fact.ejs', {
		sport: sport,
	});
});

// DELETE FACT
router.delete('/soccer/facts/comment', (req, res) => {
	Sport.findByIdAndRemove(req.params.id, (err, data)=> {
		if(err) 
		console.log("error to delete",err)
		res.redirect('/sportpedias/soccer/facts')
	})
})

// EDIT FACT
router.get('/soccer/facts/edit', (req, res) => {
	Sport.findById(req.params.id, (err, foundSport) => {
		res.render('edit.ejs', {sport: foundSport})
	})
})

// UPDATE FACT
router.put('/soccer/facts', (req, res) => {
	Sport.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedModel) => {
		res.redirect(`/sportpedias/soccer/facts`)
	})
})

module.exports = router
