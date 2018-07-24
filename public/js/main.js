// application user 

const user = {};

// auth modal handler

;(() => {

    const authModal = document.querySelector('.modal.auth');
    const okBtn = authModal.querySelector('button');

    okBtn.addEventListener('click', evt => {
        const labels = authModal.querySelectorAll('label');

        labels.forEach(label => {
            const input = label.querySelector('input');
            if (input.value === '') {
                label.classList.add('invalid');
            } else {
                label.classList.remove('invalid');
            }
        });

        const isModalDataInvalid = Array.prototype.some.call(labels, label => label.querySelector('input').value === '');
        if (isModalDataInvalid) return;

        user.name = authModal.querySelector('input[name="name"]').value;
        user.nick = authModal.querySelector('input[name="nick"]').value;

        document.body.classList.remove('overflow-hidden');

        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(user)
        };

        fetch('/api/users', options)
            .then(response => response.json())
            .then(data => {

                user._id = data._id;
            });

        getData();

        setInterval(() => {
            getData();
        }, 1000);

    });

})();


// message input handler

;
(() => {

    const messageInputBlock = document.querySelector('.message-wrp');
    const sendBtn = messageInputBlock.querySelector('button');
    const input = messageInputBlock.querySelector('input');

    sendBtn.addEventListener('click', evt => {

        if (input.value === '') {
            messageInputBlock.classList.add('invalid');
            return;
        }

        messageInputBlock.classList.remove('invalid');

        const body = input.value;

        const message = {
            _user: user._id,
            body,
            createdAt: Date.now()
        }

        input.value = '';

        const options = {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(message)
        };

        fetch('/api/messages', options);

    });

})();

function getData() {

    const options = {
        headers: {
            "Content-type": "application/json"
        }
    }

    fetch('/api/users', options)
        .then(response => response.json())
        .then(data => {

            publicUsers(data);
        });

    fetch('/api/messages', options)
        .then(response => response.json())
        .then(data => {

            publicPosts(data);
        });
}


const usersList = document.getElementById('users-list');

function publicUsers(users) {

    clearNode(usersList);

    users.forEach(user => {

        const li = document.createElement('li');

        li.innerHTML = `
            <span class="name">${user.name}</span>
            <span class="nick">@${user.nick}</span>
        `;

        usersList.appendChild(li);
    });
}



postsEl = document.getElementsByClassName('posts')[0];


function publicPosts(posts) {

    clearNode();

    [...posts].reverse().forEach(post => {
        
        const postElWrp = document.createElement('li');
        postElWrp.classList.add('col');

        const postEl = document.createElement('div');
        postEl.classList.add('post');

        const bodyWords = post.body.split(' ');
        if(bodyWords.includes('@' + user.nick)) {
            postEl.classList.add('active');
        }

        postEl.innerHTML = `
            <div class="post-header">
                <div class="name-wrp">
                    <span class="name">${post._user.name}</span>
                    <span class="nick">@${post._user.nick}</span>
                </div>
                <span class="time">${moment(post.createdAt).format("MMM Do YY, h:mm:ss")}</span>
            </div>
            <div class="post-body">${post.body}</div>
        `;

        postElWrp.appendChild(postEl);
        postsEl.appendChild(postElWrp);

    });
}

function clearNode(node = postsEl, from = 0) {

    while (node.children.length > from) {
        node.removeChild(node.lastChild);
    }
}