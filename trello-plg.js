//I found this function somewhere on the internet!!
function observeElement(obj, callback) {
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    let eventListenerIsSupported = window.addEventListener;
    if (MutationObserver) {
        let observer = new MutationObserver(function (mutations, observer) {
            if (mutations[0].addedNodes.length || mutations[0].removedNodes.length)
                callback();
        });
        observer.observe(obj, {childList: true, subtree: true});
    }
    else if (eventListenerIsSupported) {
        obj.addEventListener('DOMNodeInserted', callback, false);
        obj.addEventListener('DOMNodeRemoved', callback, false);
    }
};

function updateCardSize() {
    let cards = document.querySelectorAll('.list-card');
    cards.forEach(card => {
        let title = card.querySelector('.list-card-title').innerText;
        let estimate = parseInt(title.substring(title.lastIndexOf("(") + 1, title.lastIndexOf(")")));
        if (!estimate) {
            // card.style.background = '#ffdddd';
            return;
        }

        let baseSize = 15;
        let paddingAndMargins = 6;
        card.style.height = (estimate * baseSize - paddingAndMargins) + 'px';
    });
}

updateCardSize();
observeElement(document.querySelector('body'), updateCardSize);






