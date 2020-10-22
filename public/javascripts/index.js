(() => {
    let storyId = 1;
    const body = document.querySelector('.body');
    const overlay = document.querySelector('.overlay');
    const leftLink = document.querySelector('.link.left');
    const rightLink = document.querySelector('.link.right');

    window.addEventListener("mousemove", event => {
        const uv = {
            x: event.x / window.innerWidth,
            y: event.y / window.innerHeight,
        }

        leftLink.classList.toggle("selected", uv.x < 1/3);
        rightLink.classList.toggle("selected", uv.x > 2/3);
    })

    leftLink.addEventListener('click', () => {
        next(parseInt(leftLink.getAttribute('data-link')));
    })

    rightLink.addEventListener('click', () => {
        next(parseInt(rightLink.getAttribute('data-link')));
    })

    const next = async (id) => {
        storyId = id;
        overlay.classList.add('transitioning');
        await wait(500);
        reload();
        overlay.classList.remove('transitioning');
    }
    
    const reload = async () => {
        const data = await fetch(location.origin + '/api/story/' + storyId).then(res => res.json());

        body.textContent = data.story.body;
        leftLink.textContent = data.links.left.description;
        leftLink.setAttribute('data-link', data.links.left.target_id);
        rightLink.textContent = data.links.right.description;
        rightLink.setAttribute('data-link', data.links.right.target_id);

        console.log(data);
    }

    const wait = async (millis) => {
        return new Promise(res => setTimeout(res, millis));
    }

    reload();

})();