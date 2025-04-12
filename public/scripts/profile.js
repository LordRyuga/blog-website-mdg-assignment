let username = document.getElementById('username');
const newBlog = document.getElementById('NewBlog');
let postCount = document.getElementById('posts-count');

newBlog.addEventListener('click', ()=> {
    window.location.href = 'api/user/newBlog';
})

async function fetchProfile()
{
    try {
        const res = await axios.get('api/user/profile');
    
        username.innerText = res.data.username;
    }catch(err) {
        console.log(err);
        alert("error");
    }
}

document.querySelector('.scroll-left').onclick = () => {
    document.querySelector('.blog-scroll').scrollBy({ left: -300, behavior: 'smooth' });
};

document.querySelector('.scroll-right').onclick = () => {
    document.querySelector('.blog-scroll').scrollBy({ left: 300, behavior: 'smooth' });
};

document.getElementById('logout').onclick = async () => {
    try{
        await axios.post('api/auth/logout', {}, {withCredentials: true});
        window.location.href = '/';
    }catch(err){
        console.log("logout failed: ", err);
    }
}

async function loadBlogs() {
    try{
        const res = await axios.get('/api/blog/myBlogs', {
            withCredentials: true
        });
        
        const blogs = res.data;
        const blogContainer = document.querySelector('.blog-scroll');
        // console.log(blogs);
        // console.log(blogs.length);
        // console.log(postCount);
        postCount.innerText = blogs.length;
        blogs.forEach(blog => {
            console.log(blog.title);
            const card = document.createElement('div');
            card.classList.add('blog-card');
            
            card.innerHTML = `
            <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${blog.title}</h5>
                    <p class="card-text">${blog.body.substring(0, 100)}...</p>
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


fetchProfile();
window.onload = loadBlogs();