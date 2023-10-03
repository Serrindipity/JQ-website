const express = require('express');
const port = 3000;
const app = express();
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/html', express.static('project/html'));
app.use(express.static('project'))


// app.get('/', (req, res) => {
//     // Read the comments as before
//     fs.readFile('project/comments.txt', 'utf8', (err, commentsData) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error reading comments.');
//         }

//         const comments = commentsData.split('\n').filter(comment => comment.trim() !== '');

//         // Render the EJS template with comments only (without dynamic content)
//         res.render('index', { comments });
//     });
// });
app.get('/loadComments', (req, res) => {
    // Read and parse comments from the comments.txt file
    fs.readFile('project/comments.txt', 'utf8', (err, commentsData) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error reading comments.');
        }

        const comments = commentsData.split('\n').filter(comment => comment.trim() !== '');
        res.json({ comments });
    });
});

// app.post('/addComment', (req, res) => {
//     // Handle comment submissions as before
//     const newComment = req.body.comment;

//     if (!newComment || newComment.trim() === '') {
//         return res.redirect('/');
//     }
//     // Append the new comment to the comments.txt file
//     fs.appendFile('project/comments.txt', `${newComment}\n`, 'utf8', (err) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error adding comment.');
//         }

//         // Redirect back to the home page to display the updated comments
//         res.redirect('/');
//     });
// });
app.post('/addComment', bodyParser.json(), (req, res) => {
    const newComment = req.body.comment;

    if (!newComment || newComment.trim() === '') {
        return res.status(400).json({ error: 'Comment cannot be empty.' });
    }

    // Append the new comment to the comments.txt file
    fs.appendFile('project/comments.txt', `${newComment}\n`, 'utf8', (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error adding comment.' });
        }

        res.json({ success: true });
    });
});



app.listen(port, () => {
    console.log(`Website listening at http://localhost:${port}`)
});