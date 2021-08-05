const disp_h = document.querySelector("#d_height");
const disp_w = document.querySelector("#d_width");
const brow_h = document.querySelector("#b_height");
const brow_w = document.querySelector("#b_width");
const point_x = document.querySelector("#p_x");
const point_y = document.querySelector("#p_y");

var d_h_v, d_w_v;
var b_h_v, b_w_v;
var p_x_v, p_y_v;

function check_size() {
	d_w_v = disp_w.innerText = screen.availWidth;
	d_h_v = disp_h.innerText = screen.availHeight;
	b_w_v = brow_w.innerText = window.outerWidth;
	b_h_v = brow_h.innerText = window.outerHeight;
}

window.requestAnimationFrame(check_size);
window.addEventListener('resize', check_size);

function check_motion(){
	p_x_v = point_x.innerText = window.screenX;
	p_y_v = point_y.innerText = window.screenY;
	window.requestAnimationFrame(check_motion);
	
}

window.requestAnimationFrame(check_motion);
window.open('game.html','game','width=300,height=300,left=32,top=32');