function attachEvents() {
    const submitBtn = document.getElementById('submit');
    const refreshBtn = document.getElementById('refresh');

    submitBtn.addEventListener('click', onSubmit);
    refreshBtn.addEventListener('click', onRefresh);
}

const url = 'http://localhost:3030/jsonstore/messenger';

function onSubmit() {
    const author = document.querySelector('[name="author"]');
    const messageText = document.querySelector('[name="content"]');

    if (!author.value || !messageText.value) {
        return;
    }

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            author: author.value.trim(),
            content: messageText.value.trim(), 
        })
    }).then(res => {
        if (!res.ok) throw new Error('Error');
        return res.json()
    }).catch(e => alert(e.message))
}

function onRefresh() {
    fetch(url)
    .then(res => {
        if (!res.ok) throw new Error('Error');
        return res.json();
    }).then(addComment).catch(e => alert(e.message));
}

function addComment(data) {
    const textArea = document.querySelector('#messages');
    const allComments = [];
    Object.values(data).forEach(c => allComments.push(`${c.author}: ${c.content}`))
    textArea.value = allComments.join('\n');
}

attachEvents();