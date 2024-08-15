//explode briefly switches gif
function explode(){
    document.getElementById('skel_img').src="skel_explode.gif";
    setTimeout(function() {
        document.getElementById('skel_img').src="skel_dance.gif";
      }, 400);
}



