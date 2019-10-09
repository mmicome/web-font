//初始化函数，在窗口加载完后立即执行函数
function initiate() {
  maxin = 600;

  //初始化为全局变量
  media = document.getElementById('media');
  play = document.getElementById('play');
  bar = document.getElementById('bar');
  progress = document.getElementById('progress');

  //播放事件
  play.addEventListener('click', push, false);
  //快进事件
  bar.addEventListener('click', move, false);
}

//定义播放暂停函数
function push() {
  if(!media.paused && !media.ended) {
    media.pause();
    play.innerHTML = 'Play';
    window.clearInterval(loop);
  }else {
    media.play();
    play.innerHTML = 'Pause';
    //循环调用进度条更新函数,需要隐式申明为全局变量loop
    loop = setInterval(status, 1000);
  }
}

//定义进度条更新函数
function status() {
  if(!media.ended) {
    var size = parseInt(media.currentTime * maxin / media.duration);
    progress.style.width = size + 'px';
  } else {
    progress.style.width = 0;
    play.innerHtML('play');
    window.clearInterval(loop);
  }
}

//定义快进函数
function move(e) {
  if(!media.paused && !media.ended) {
    var mouseX = e.pageX - bar.offsetLeft;
    var newTime = mouseX * media.duration / maxin;
    media.currentTime = newTime;
    progress.style.width = mouseX + 'px';
  }
}

window.addEventListener('load', initiate, false);
