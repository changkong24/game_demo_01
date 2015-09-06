window.onload = init();

/**
 * 初始化
 * @return {[type]}
 */
var game;
function init(){
	// var canvas = initFullScreenCanvas("mainCavnas");
	// var ctx = canvas.getContext("2d");
	// repaint(canvas,ctx);
	var canvas = initFullScreenCanvas("mainCavnas");
	game = new game(canvas);
	resizeCanvas(canvas);
	if(isTouchDevice()){
		canvas.addEventListener("touchstart",function(e){
			var touch = event.targetTouches[0];
			game.handleClick(touch.pageX,touch.pageY);
			e.stopPropagation();
			e.preventDefault();
		},false);
	}
	else{
		canvas.addEventListener("mouseup",function(e){
			game.handleClick(e.pageX,e.pageY);
			e.stopPropagation();
			e.preventDefault();
		})
	}
}
/**
 * 重绘
 * @return {[type]}
 */
function repaint(canvas,ctx){
	if(!ctx){
		return; 
	}
	//清除背景
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	ctx.fillStyle ="darkgreen";
	ctx.fillRect(10,10,250,30);
	ctx.fillRect(120,10,30,200);
	reorient(ctx);
}
function reorient(ctx){
	var angle = window.orientation;
	if(angle){
		var rot = -Math.PI*(angle/180);
		ctx.translate(angle==-90?canvas.width :0,
		angle == 90? canvas.height : 0);
		ctx.rotate(rot);
	}
}

/**
* 当窗口重新调整的时候，重新调整canvas
*/
function initFullScreenCanvas(canvasID){
	var canvas = document.getElementById(canvasID);
	window.addEventListener("resize",function(){
		resizeCanvas(canvas);
	})
	return canvas;
}

/**
* 调整大小
*/
function resizeCanvas(canvas){
	canvas.width = document.width || document.body.clientWidth;
	canvas.height = document.height || document.body.clientHeight;
	//repaint(canvas, canvas.getContext("2d"));
	game && game.handleResize();
}
function isTouchDevice(){
	return ('ontouchstart' in document.documentElement);
}
