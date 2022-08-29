const express = require('express');
const router = express.Router()
const Sport = require('../models/sports.js')
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
				sport: 'BASKETBALL',
				author: 'Clara Lima', 
				about: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap",
				rules: [{
					rule:"oi"
				}], 
				facts: 		[
					{
						idFact:0,
						name: "KEV",
						fact: "6 World Cup",
						img: "https://pbs.twimg.com/media/FEXBr0rXIA48Wy3.jpg"
					},					
					{
						idFact:1,
						name: "KEV",
						fact: "6 World Cup",
						img: "https://pbs.twimg.com/media/FEXBr0rXIA48Wy3.jpg"
					},
				],
					comments:
					[
							{
								name: "clara",
								anonymous: true,
								comment: "primeiro comentario"
							},
							{
								name: "kevin",
								anonymous: true,
								comment: "second comentario"
							}
					]
			}],
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


// // NEW FACT -- WORKS
router.get('/sports/:id/comments/new', (req, res) => {
	const sport = Sport.findById(req.params.id);
	res.render('newComment.ejs', { 	
		sport: sport,
	});
});

//CREATE COMMENT - WORKS
router.put('/sports/:id/comments', (req, res) => {

	if (req.body.anonymous === 'on') {
		req.body.anonymous = true;
		req.body.name = "Anonymous"
	} else {
		req.body.anonymous = false;
	}
	let newComment = {name:req.body.name,anonymous:req.body.anonymous,comment:req.body.comment};
	console.log("comment",newComment);
	Sport.findByIdAndUpdate({_id:req.params.id},{$push:{"comments":[newComment]}},
		function(err, result) {

			console.log("array",result)
	res.redirect(`/sportpedias/sports/${req.params.id}`)
	});
});

	
//----------------------------------------------------------
//						RULES
//----------------------------------------------------------
// //INDEX RULES
router.get('/sports/:id/rules', async (req, res) => {
	const sport = await Sport.findById(req.params.id);
	res.render('rules.ejs', {
		sport: sport,
	});
});

// NEW RULES
router.get('/sports/:id/rules/new', (req, res) => {
	const sport = Sport.findById(req.params.id);
	res.render('newRules.ejs', { 	
		sport: sport,
	});
});

// CREATE RULES 
router.put('/sports/:id/rules', (req, res) => {
	let newRule= {rule:req.body.rule};
	Sport.findByIdAndUpdate({_id:req.params.id},{$push:{rules:[newRule]}},
		function(err, result) {
			console.log("array",result)
	res.redirect(`/sportpedias/sports/${req.params.id}/rules`)
	});
});
//SHOW RULES - WORKS
router.get('/sports/:id/rules/:idr', async (req, res) => {
	const sport = await Sport.findById(req.params.idr);
	res.render('rules.ejs', {
		sport: sport
	});
});

// // UPDATE FACT -- WORKS
router.put('/sports/:id/rules/:idr', (req, res) => {
	Sport.findByIdAndUpdate({_id:req.params.id},{$set:{["rules.$[el]"]:req.body}},{
		  arrayFilters: [{ "el._id": req.params.idr}],
		  new: true}, (err, updatedModel) => {
	res.redirect(`/sportpedias/sports/${req.params.id}/rules`)
	})
})
//----------------------------------------------------------
//						FACT
//----------------------------------------------------------

// //INDEX FACT - WORKS
router.get('/sports/:id/facts', async (req, res) => {
	const sports = Sport.find({});
	const sport = await Sport.findById(req.params.id);
	res.render('fact.ejs', { 	
		sport: sport,sports:sports
	});
});

// // NEW FACT -- WORKS
router.get('/sports/:id/facts/new', (req, res) => {
	const sport = Sport.findById(req.params.id);
	res.render('newFact.ejs', { 	
		sport: sport,
	});
});

// CREATE FACT - WORKS
router.put('/sports/:id/facts', (req, res) => {
	let newFact = {name:req.body.name,fact:req.body.fact,img:req.body.img};
	console.log("fact",newFact);
	Sport.findByIdAndUpdate({_id:req.params.id},{$push:{"facts":[newFact]}},
		function(err, result) {
			console.log("array",result)
	res.redirect(`/sportpedias/sports/${req.params.id}/facts`)
	});
});

//SHOW FACT - WORKS
router.get('/sports/:id/facts/:idf', async (req, res) => {
	const sport = await Sport.findById(req.params.idf);
	res.render('fact.ejs', {
		sport: sport
	});
});

// DELETE FACT -- WORKS
router.delete('/sports/:id/facts/:idf', (req, res) => {
		Sport.findByIdAndUpdate({_id:req.params.id},{$pull:{facts:{_id:req.params.idf}}},{
			  new: true}, (err, updatedModel) => {
		res.redirect(`/sportpedias/sports/${req.params.id}/facts`)
		})
	})

// // EDIT FACT -- WORKS
router.get('/sports/:id/facts/:idf/edit', (req, res) => {
	Sport.findById(req.params.id, (err,factFound) => {
		res.render('editF.ejs', {fact:factFound,index:req.params.idf})
	})
})

// // UPDATE FACT -- WORKS
router.put('/sports/:id/facts/:idf', (req, res) => {
	Sport.findByIdAndUpdate({_id:req.params.id},{$set:{["facts.$[el]"]:req.body}},{
		  arrayFilters: [{ "el._id": req.params.idf}],
		  new: true}, (err, updatedModel) => {
	res.redirect(`/sportpedias/sports/${req.params.id}/facts`)
	})
})

module.exports = router






