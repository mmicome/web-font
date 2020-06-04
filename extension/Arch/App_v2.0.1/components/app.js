//create a class for the element
class app extends HTMLElement {
    constructor() {
        //always call super first in constructor
        super();

        //create a shadow root
        var shadow = this.attachShadow({
            mode: 'open'
        });

        //create app dom
        var app = document.createElement('app');
        var header = document.createElement('header');
        var article = document.createElement('article');

        // Create some CSS to apply to the shadow dom
        var style = document.createElement('style');
        style.textContent = `:host { 
                                position: relative; 
                                float: left; 
                                box-sizing: border-box; 
                                width: 150px; 
                                height: 60px; 
                                padding: 0 5px 5px 5px; 
                                margin-bottom: 10px; 
                                background: #fff; 
                                overflow: hidden; 
                                font-family: cursive; 
                            } 
                            
                            :host(:nth-of-type(odd)) { 
                                margin-right: 10px; 
                            } 
                            header { 
                                padding: 3px 3px 3px 0; 
                                color: #1abc9c; 
                                font-size: 13px; 
                                cursor: pointer; 
                            }`;
        //event
        header.onclick = function () {
            var action = this.getAttribute("data-action");
            var url = this.getAttribute("data-url");
            // var bg = chrome.extension.getBackgroundPage();
            // bg.tools[action](url);
            var tabs = getTabs();
            sendMessageToContentScript({
                action: action,
                data: url,
                tabs: tabs
            });
        };

        // attach the created elements to the shadow dom
        shadow.appendChild(style);
        shadow.appendChild(app);
        app.appendChild(header);
        app.appendChild(article);
    }

    //生命周期相关
    connectedCallback() {
        var shadow = this.shadowRoot;
        var app = shadow.querySelector('app');
        var header = shadow.querySelector('header');
        var article = shadow.querySelector('article');
        //set data
        header.textContent = this.getAttribute('title');
        header.setAttribute('data-action', this.getAttribute('action'));
        header.setAttribute('data-url', this.getAttribute('url'));
        article.textContent = this.getAttribute('content');
        if (this.getAttribute('sign') === "true") {
            var sign = document.createElement('sign-tmp');
            sign.setAttribute('data-action', this.getAttribute('action'));
            sign.setAttribute('data-url', this.getAttribute('url'));
            app.appendChild(sign);
        }
    }
}

//define the new element
window.customElements.define('app-tmp', app);
