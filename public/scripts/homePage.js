
async function loadBlogs() {
    try{
        const res = await axios.get('/api/blog/getAllBlogs', {
            withCredentials: true
        });
        
        const blogs = res.data;
        const blogContainer = document.querySelector('.display-blogs');
        console.log(blogs);
        blogs.forEach(blog => {
            console.log(blog.title);
            const card = document.createElement('div');
            card.classList.add('blog-card');
            
            card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${blog.title}</h5>
                    <p class="card-text">${blog.body.substring(0, 1000)}...</p>
                </div>
            </div>`
            card.addEventListener('click', () => {
                window.location.href = `/blogs/${blog.id}`;
              });
            blogContainer.append(card);
        });
    }catch (err){
        console.log('error in displaying as cards: ', err);
    }
}

loadBlogs();
