const sendFetchRequest = async (url, method, body) => {
    try {
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' }
        });
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        return response;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

const updatePostFormHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#post-title').value.trim();
    const post = document.querySelector('#post-content').value.trim();
    const id = event.target.id;
    if (title && post) {
        const response = await sendFetchRequest('/api/posts', 'PUT', { title, post, id });
        if (response) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to update post');
        }
    } else {
        alert('Please provide both title and content');
    }
};

const deletePost = async (event) => {
    event.preventDefault();
    const id = event.target.id;
    const response = await sendFetchRequest('/api/posts', 'DELETE', { id });
    if (response) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
};

document.querySelector('.update').addEventListener('click', updatePostFormHandler);
document.querySelector('.delete').addEventListener('click', deletePost);
