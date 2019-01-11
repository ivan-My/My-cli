(function(){
    var docEl = document.documentElement;

    function setRemUint(){
        var rem = docEl.clientWidth / 10;
        docEl.style.fontSize = rem + 'px';
    }

    setRemUint();

    window.addEventListener('resize', setRemUint);
})();