async function newPostHandler(event){
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const post_text = document.querySelector('#post-text').value.trim()
    

    if(title && post_text){
        const response = await fetch('/api/posts',{
            method:'POST',
            body: JSON.stringify({
                title,
                post_text
            }),
            headers:{'Content-Type':'application/json'}
        })

        if(response.ok){
            document.querySelector('#post-title').value = '';
            document.querySelector('#post-text').value = '';
            document.location.reload()
        } else{
            alert(response.statusText)
        }
    }
}

document.querySelector('.new-post-form').addEventListener('submit',newPostHandler);