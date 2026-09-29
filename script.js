// live timecode in topbar
  (function(){
    var el = document.getElementById('clockTC');
    var start = performance.now();
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    function pad(n){ return String(n).padStart(2,'0'); }
    function tick(){
      var elapsed = performance.now() - start;
      var totalFrames = Math.floor(elapsed / (1000/24));
      var frames = totalFrames % 24;
      var totalSec = Math.floor(totalFrames / 24);
      var s = totalSec % 60, m = Math.floor(totalSec/60) % 60, h = Math.floor(totalSec/3600);
      el.textContent = pad(h)+':'+pad(m)+':'+pad(s)+':'+pad(frames);
      if(!reduced) requestAnimationFrame(tick);
    }
    if(reduced){ el.textContent = '00:00:00:00'; } else { requestAnimationFrame(tick); }
  })();

  // hero reveal
  (function(){
    var hero = document.getElementById('heroInner');
    requestAnimationFrame(function(){
      setTimeout(function(){ hero.classList.add('revealed'); }, 120);
    });
  })();

  // skill faders on scroll into view
  (function(){
    var grid = document.getElementById('faderGrid');
    var fills = grid.querySelectorAll('.fader-fill');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){
          fills.forEach(function(f){ f.style.width = f.getAttribute('data-pct') + '%'; });
        } else {
          fills.forEach(function(f){ f.style.width = '0%'; });
        }
      });
    }, {threshold:0.35});
    io.observe(grid);
  })();

  // duplicate marquee content for seamless loop
  (function(){
    var track = document.getElementById('marqueeTrack');
    track.innerHTML += track.innerHTML;
  })();

  // scroll reveal for sections/cards
  (function(){
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if(reduced) return;
    var translated = [
      document.querySelectorAll('.sec-head'),
      document.querySelectorAll('.clip'),
      document.querySelectorAll('.fader-row'),
      document.querySelectorAll('.edu-list li')
    ];
    var faded = [
      document.querySelectorAll('.reel-item'),
      document.querySelectorAll('.tile')
    ];
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ e.target.classList.add('revealed'); }
        else{ e.target.classList.remove('revealed'); }
      });
    }, {threshold:0.15});
    translated.forEach(function(list){
      list.forEach(function(el, i){
        el.classList.add('reveal');
        el.style.transitionDelay = (Math.min(i,6)*0.06)+'s';
        io.observe(el);
      });
    });
    faded.forEach(function(list){
      list.forEach(function(el, i){
        el.classList.add('reveal-fade');
        el.style.transitionDelay = (Math.min(i,6)*0.06)+'s';
        io.observe(el);
      });
    });
  })();

  // hobbies staggered reveal
  (function(){
    var list = document.getElementById('hobbiesList');
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(e.isIntersecting){ list.classList.add('in-view'); }
        else{ list.classList.remove('in-view'); }
      });
    }, {threshold:0.4});
    io.observe(list);
  })();

  document.getElementById('yr').textContent = new Date().getFullYear();
