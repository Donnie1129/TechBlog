const addComment = () => {
    document.getElementById('comment-form').style.display = "block";
};

const commentFormHandler = async (event) => {
    event.preventDefault();

    const commentInput = document.getElementById('comment');
    const comment = commentInput.value.trim();
    const postId = document.querySelector('.home-post-header').id;

    if (comment) {
        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({ comment, id: postId }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.ok) {
                throw new Error('Failed to add comment');
            }

            window.location.reload();
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add comment');
        }
    }
};

document.getElementById('add-comment').addEventListener('click', addComment);
document.getElementById('comment-submit').addEventListener('click', commentFormHandler);
