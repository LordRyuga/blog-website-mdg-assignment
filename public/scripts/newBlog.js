document.getElementById("submitBlog").addEventListener('click', async () => {
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const footer = document.getElementById("footer").value;
    console.log(title);


    try{
        const res = await axios.post('/api/blog/new', {
            title,
            body,
            footer
            }, 
            {withCredentials: true}
        );
        window.location.href = '/profile';
    }catch(err)
    {
        console.log(err);
    }
})

console.log(document.getElementById("submitBlog"));