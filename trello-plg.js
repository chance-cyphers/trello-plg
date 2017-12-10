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

function updateState() {
    let lists = document.querySelectorAll('.list');
    lists.forEach(list => {
        let sheetTotal = 0;
        let cards = list.querySelectorAll('.list-card');
        cards.forEach(card => {
            let cardTitle = card.querySelector('.list-card-title').innerText;
            let estimate = parseInt(cardTitle.substring(cardTitle.lastIndexOf("(") + 1, cardTitle.lastIndexOf(")")));
            if (!estimate) {
                // card.style.background = '#ffdddd';
                return;
            }
            sheetTotal += estimate;

            let baseSize = 18;
            let paddingAndMargins = 6;
            card.style.height = (estimate * baseSize - paddingAndMargins) + 'px';
        });
        updateTotal(list, sheetTotal);
    });
}

function updateTotal(list, total) {
    let totalsSpan = list.querySelector('.lane-total');
    totalsSpan.innerText = total;

    if (total < 32) {
        totalsSpan.style.color = '#daa520';
    } else if (total === 32) {
        totalsSpan.style.color = 'green';
    } else {
        totalsSpan.style.color = 'red';
    }
}

function addTotalsToSheets() {
    let listHeaders = document.querySelectorAll('.list-header');
    listHeaders.forEach(list => {
        let span = document.createElement('span');
        span.className = 'lane-total';
        list.insertBefore(span, list.childNodes[3]);
    });
}

addTotalsToSheets();
updateState();
observeElement(document.querySelector('body'), updateState);






