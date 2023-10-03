document.addEventListener('DOMContentLoaded', () => {
    const commentsList = document.getElementById('commentsList');
    const commentText = document.getElementById('commentText');
    const commentForm = document.getElementById('commentForm');

    // Function to load and display comments
    const loadComments = () => {
        fetch('/loadComments')
            .then(response => response.json())
            .then(data => {
                commentsList.innerHTML = '';
                data.comments.forEach(comment => {
                    const listItem = document.createElement('li');
                    listItem.textContent = comment;
                    commentsList.appendChild(listItem);
                });
            });
    };

    // Load comments when the page loads
    loadComments();

    // Handle comment submission
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const newComment = commentText.value.trim();
        if (newComment !== '') {
            fetch('/addComment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ comment: newComment }),
            })
                .then(() => {
                    commentText.value = '';
                    loadComments();
                })
                .catch(error => console.error('Error:', error));
        }
    });
});
