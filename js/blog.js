document.addEventListener('DOMContentLoaded', function() {
    loadBlogPosts();
});

function loadBlogPosts() {
    fetch('blog-posts.json')
        .then(response => response.json())
        .then(posts => {
            const blogItems = document.querySelector('.blog-items');
            const urlParams = new URLSearchParams(window.location.search);
            const categoryFilter = urlParams.get('category');

            posts.forEach(post => {
                if (!categoryFilter || post.category === categoryFilter) {
                    const postElement = document.createElement('div');
                    postElement.className = 'blog-item';
                    postElement.innerHTML = `
                        <div class="date">${post.date}</div>
                        <div class="name">${post.title}</div>
                        <div class="category">${post.category}</div>
                        <div class="text">${post.excerpt}</div>
                        <a href="blog-post.html?id=${post.id}" class="btn">Read More</a>
                    `;
                    blogItems.appendChild(postElement);
                }
            });
        })
        .catch(error => console.error('Error loading blog posts:', error));
}