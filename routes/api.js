const express = require('express');
const router = express.Router();
const { query } = require('../models/db');

router.get('/story/:id', async function (req, res, next) {
    console.log(req.params);

    try {
        const story = await query(
            'SELECT * FROM story WHERE id = ?',
            req.params.id
        );
        
        const links = await query(
            'SELECT * FROM links WHERE source_id = ?',
            req.params.id
        );

        let leftLink = "Slut", rightLink = "Slut";
        if(links.length > 0) {
            leftLink = links[0];
            rightLink = links[0];

            if(links.length === 2) {
                rightLink = links[1];
            }
        }
    
        res.json({
            id: req.params.id,
            story: story[0],
            links: {
                left: leftLink,
                right: rightLink
            },
        });
    }
    catch(e) {
        console.error(e);
    }
});

module.exports = router;
