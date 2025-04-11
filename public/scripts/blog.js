const [ , blog, id ] = window.location.pathname.split('/');

async function loadBlog() {
    let head = document.getElementById('title')
    let author = document.getElementById('author')
    let body = document.getElementById('body')
    let footer = document.getElementById('footer')


    try{
        const res = await axios.get(`/api/blog/getById/${id}`, {
            withCredentials: true
        });
        
        const blogs = res.data;
        
        head.innerText = blogs.title;
        author.innerText = 'Written by ' + blogs.username;
        body.innerText = blogs.body;
        footer.innerText = blogs.footer;
    }catch (err){
        console.log('error in displaying as cards: ', err);
    }
}

loadBlog();