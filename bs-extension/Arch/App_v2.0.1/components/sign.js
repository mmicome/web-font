//create a class for the element
class sign extends HTMLElement {
    constructor() {
        //always call super first in constructor
        super();

        //create a shadow root
        var shadow = this.attachShadow({
            mode: 'open'
        });

        //create  app section
        var span = document.createElement('span');
        span.setAttribute('class', 'open');

        // Create some CSS to apply to the shadow dom
        var style = document.createElement('style');
        style.textContent = `span { 
                                position: absolute; 
                                right: 5px; 
                                bottom: 5px; 
                                width: 20px; 
                                height: 10px; 
                                border-radius: 10px; 
                                background: #74d8f1; 
                            } 

                            .open::before, 
                            .close::before { 
                                position: absolute; 
                                right: 0; 
                                width: 10px; 
                                height: 10px; 
                                border-radius: 10px; 
                                background: #fff; 
                                content: ""; 
                            } 
                            
                            .close::before { 
                                left: 0; 
                            }`;

        //set data
        span.onclick = function () {
            if (this.classList.contains("close")) {
                this.classList.remove("close");
                this.style.background = "#74d8f1";
            } else {
                this.classList.add("close");
                this.style.background = "#ccc";
            }
        };

        shadow.appendChild(style);
        shadow.appendChild(span);
    }

        //生命周期相关
        connectedCallback() {
            var shadow = this.shadowRoot,
                span = shadow.querySelector('span');

            if (!span.classList.contains("close")) {
                var action = this.getAttribute("data-action");
                var url = this.getAttribute("data-url");
                sendMessageToContentScript({
                    action: "debug",
                    // action: action,
                    data: url
                });
            }
        }
}

//define the new element
window.customElements.define('sign-tmp', sign);
