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

        body.innerHTML = applyTextEffect(data.story.body, data.story.text_effect);
        leftLink.innerHTML = applyTextEffect(data.links.left.description, data.links.left.text_effect);
        leftLink.setAttribute('data-link', data.links.left.target_id);
        rightLink.innerHTML = applyTextEffect(data.links.right.description, data.links.right.text_effect);
        rightLink.setAttribute('data-link', data.links.right.target_id);

        console.log(data);
    }

    const wait = async (millis) => {
        return new Promise(res => setTimeout(res, millis));
    }

    const applyTextEffect = (text, effectId) => {
        const ITALIC = 1;
        const WIGGLY = 2;

        switch(effectId) {
            case ITALIC:
                return applyItalicText(text);
            case WIGGLY:
                return applyWigglyText(text);
        }
        return text;
    }

    const applyItalicText = (text) => {
        return `<i>${text}</i>`;
    } 

    const applyWigglyText = (text) => {
        let out = '<div class="wiggly-word">';
        text.split('').forEach((char, i) => {
            if(char == " ") {
                out += `</div><div class="wiggly-word">`;
                return;
            }
            out += `<span class="wiggly" style="animation-delay: -${i/10}s">${char}</span>`;
        })
        out += '</div>';
        return out;
    } 

    reload();

})();