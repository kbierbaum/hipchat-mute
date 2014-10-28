var $BLOCK_LIST = [];

function markMessageUnconfirmed(messageId) {
    var messageNode = document.getElementById(messageId);
    if (!messageNode || typeof messageNode == 'undefined') {
        return;
    }
    messageNode.addEventListener('mouseover', function () {
        showUnconfirmedTooltip(this, this.id);
    });
    messageNode.className = 'msgTextError messageWrapper';
}

function addChatBlock(body, insertOnTop) {
    var newDiv = document.createElement('div');
    newDiv.innerHTML = body;
    newDiv = newDiv.firstChild;
    var nameBlock = newDiv.getElementsByClassName('nameBlock')[0];
    var name = nameBlock.getElementsByTagName('a').length > 0 ? nameBlock.getElementsByTagName('a')[0].innerHTML : null;
    if($BLOCK_LIST.indexOf(name) < 0) {
        if(newDiv.className.indexOf('me') == -1 && name != null) {
            showMuteButton(nameBlock, name);
        }

        var chatText = document.getElementById('chat_text');

        addLinkHandlers(newDiv);
        if (insertOnTop && chatText.firstChild) {
            newDiv.className += ' previousHistory';
            newDiv.style.display = 'none';
            chatText.insertBefore(newDiv, chatText.firstChild);
        } else {
            chatText.appendChild(newDiv);
        }
        replaceImageWithRetina(newDiv);
        return newDiv; 
    }
    return null;
    
}

function showMuteButton(nameBlock, name) {

    var muteButton = document.createElement('a');
    muteButton.setAttribute('class', 'atTag'); 
    muteButton.setAttribute('href', 'javascript:void(0)');
    
    muteButton.setAttribute('onclick', 'mute("' + name + '");');
    muteButton.innerHTML = 'Mute';

    nameBlock.appendChild(muteButton);

}

function mute(displayName) {
    if($BLOCK_LIST.indexof(displayName) == -1)
        $BLOCK_LIST.push(displayName);
}

function showUnconfirmedTooltip(obj, messageId) {
    if (obj.className != 'msgTextError messageWrapper') {
        return;
    }
    var html = "<a href='action:resend:"+messageId+"'>This message may not have been sent successfully. Click here to attempt resend.</a>";
	showTooltip(obj, html);
}
