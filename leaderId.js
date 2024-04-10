var regex = new RegExp('^https://leader-id\\.ru/events/49\\d{4}$');

var links = document.querySelectorAll('.app-editor-paragraph a[href]');
let index = 0;
let intervalId;

function openNextLink() {
    if (index < links.length) {
        let link = links[index];
        if (link.href) {
            var newTab = window.open(link.href);

            newTab.onload = function() {
                var applyButton = newTab.document.querySelector('button[data-qa="eventRequestBtn"]');
                if (applyButton) {
                    applyButton.click();

                    setTimeout(function() {
                        var confirmButton = Array.from(newTab.document.querySelectorAll('button')).find(function(btn) {
                            return btn.innerText.trim() === 'Подтвердить корректность введенных данных';
                        });

                        if (confirmButton) {
                            confirmButton.click();

                            setTimeout(function() {
                                var nextButton = Array.from(newTab.document.querySelectorAll('button')).find(function(btn) {
                                    return btn.innerText.trim() === 'Далее';
                                });

                                if (nextButton) {
                                    nextButton.click();

                                    setTimeout(function() {
                                        var finalButton = Array.from(newTab.document.querySelectorAll('button')).find(function(btn) {
                                            return btn.innerText.trim() === 'Завершить регистрацию';
                                        });
                                        if (finalButton) {
                                            finalButton.click();
                                            setTimeout(function() {
                                                newTab.close();
                                            }, 1000);
                                        }
                                    }, 1000);
                                }
                            }, 1000);
                        }
                    }, 1000);
                }
            };
        }
        index++;
    } else {
        clearInterval(intervalId);
    }
}

intervalId = setInterval(openNextLink, 8000);
