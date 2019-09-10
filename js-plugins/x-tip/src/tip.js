(() => {
    var tmp = `
    <template id="app-tip">
        <style>
            :host {
                display: inline-block;
                position: relative;
                vertical-align: middle;
            }
            .tip_sign {
                width: 15px;
                height: 15px;
                padding: 0 0;    
                margin:0 0;      
                color: white;
                background: url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PGRlZnM+PHN0eWxlLz48L2RlZnM+PHBhdGggZD0iTTUxMi4wMDMgNjUuMjljLTI0Ni43IDAtNDQ2LjcxMiAyMDAuMDQ1LTQ0Ni43MTIgNDQ2LjcxMiAwIDI0Ni43MTQgMjAwLjAxMyA0NDYuNzA3IDQ0Ni43MTIgNDQ2LjcwNyAyNDYuNjg3IDAgNDQ2LjcwNS0xOTkuOTkzIDQ0Ni43MDUtNDQ2LjcwNyAwLTI0Ni42NjctMjAwLjAxOC00NDYuNzEyLTQ0Ni43MDUtNDQ2LjcxMnptMTAuOTM0IDE1Ny44NTFjNDAuMTMgMCA3Mi41OTcgMzIuNTM1IDcyLjU5NyA3Mi41NzcgMCA0MC4xMzUtMzIuNDY3IDcyLjYyNy03Mi41OTcgNzIuNjI3LTQwLjA0MSAwLTcyLjYtMzIuNDkyLTcyLjYtNzIuNjI3LS4wMDUtNDAuMDQyIDMyLjU1OS03Mi41NzcgNzIuNi03Mi41Nzd6TTY1MS45OTggNzcxLjI4SDQwOC44OTR2LTMxLjg1M2wzMC40NDMtMTEuMjQ3YzE3LjA0LTYuMjYyIDI4LjM4NC0yMi41NTcgMjguMzg0LTQwLjY2M1Y1MTUuNzkzYzAtMTguMTM3LTExLjM0LTM0LjQtMjguMzg0LTQwLjYzNGwtMzAuNDQzLTExLjI3M3YtMzIuNTM5aDE4NC4yNVY2ODcuNTJjMCAxOC4xIDExLjM0MiAzNC40IDI4LjQxNyA0MC42NThsMzAuNDM4IDExLjI1djMxLjg1MWgtLjAwMXptMCAwIi8+PC9zdmc+);
                background-size: 15px 15px;
                cursor: pointer;
            }
            .tip_info {
                position: absolute;
                left: 30px;
                height:auto;
                padding: 5px 10px;
                color: #000;
                background: #fff;
                box-shadow: 1px 1px 2px 1px #ccc;
                z-index: 100;
            }
            .tip_info::before {
                position: absolute;
                left: -4px;
                width: 8px;
                height: 8px;
                content: "";
                background: #fff;
                box-shadow:-1px 2px 2px 0px #ccc;
                transform: rotate(45deg);
            }
            .tip_content {
                margin: 0;
                padding: 2px;
            }
            .tip_content_has {
                min-width: 150px;
            }
            .tip_close {
                display: none;
            }
            .tip_open {
                display: block;
            }
            /*兼容性， 避免无法识别:host 浏览器*/
            x-tip {
                display: inline-block;
                position: relative;
                vertical-align: middle;
            }
        </style>
        <div tip class="tip_sign">
            <div class="tip_info tip_close">
                <slot name="my-tip"></slot>
                <p class="tip_content"></p>
            </div>
        </div>
    </template>
    `;

    const HTMLTemplate = new DOMParser().parseFromString(tmp, 'text/html')
        .querySelector('template');

    class tip extends HTMLElement {
        constructor() {
            super();
            const host = this;
            const shadowRoot = this.attachShadow({
                mode: 'open'
            });
            const instance = HTMLTemplate.content.cloneNode(true);
            const info = instance.querySelector('.tip_info');
            instance.querySelector('.tip_sign').onmouseover = function () {
                // if(document.documentElement.clientHeight - host.offsetTop < 100) {
                //     console.log(info.offsetWidth);
                //     info.style.bottom = 0;
                // }
                // if(document.documentElement.clientWidth - host.offsetLeft < 200) {
                //     info.style.left = "-200px";
                // }
                info.classList.remove('tip_close');
            };
            instance.querySelector('.tip_sign').onmouseout = function () {
                info.classList.add('tip_close');
            };
            shadowRoot.appendChild(instance);
        }

        static get observedAttributes() {
            return ['content'];
        }

        attributeChangedCallback(attr, oldValue, newValue) {
            const attribute = attr.toLowerCase();
            if (attribute === 'content') {
                this.shadowRoot.querySelector('.tip_content').textContent = newValue;
                this.shadowRoot.querySelector('.tip_content').classList.add('tip_content_has');
            }
        }

        connectedCallback() {
            if (this.getAttribute("content")) {
                this.shadowRoot.querySelector('.tip_content').textContent = this.getAttribute("content");
                this.shadowRoot.querySelector('.tip_content').classList.add('tip_content_has');
            }
        }
    }

    window.customElements.define('x-tip', tip);
})();