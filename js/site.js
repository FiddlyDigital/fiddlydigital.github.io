/* global window,$ */
var $posts = null;
var $links = null;

function filterPosts(filter) {
    $links.children().removeClass('active');
    
    if(filter == "all"){
        $posts.children().removeClass('hidden');
        
    }
    else{
        $posts.children().addClass('hidden');
        $posts.find('[data-category="' + filter +'"]').removeClass('hidden');
    }
    
    $links.find('[data-type="' + filter + '"]').addClass('active');
};

function checkHash() {
    var hash = window.location.hash;
    
    if(!hash){
        hash = '#all'
    }
    
    filterPosts(hash.substring(1, hash.length));
};

$( document ).ready(function() {
    $posts = $('#posts');
    $links = $('.categories');
    
    window.addEventListener("hashchange", checkHash, false);
    
    checkHash();
});

