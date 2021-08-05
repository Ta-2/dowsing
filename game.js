const score = document.querySelector("#score");
var cvs = stage.getContext('2d');

var d_h_v, d_w_v;
var b_h_v, b_w_v;
var p_x_v, p_y_v;
var obj_x_v = (screen.availWidth-150)*Math.random();
var obj_y_v = (screen.availHeight-150)*Math.random();
var t = 0.0, count_t = 0.0, ani_t = 0.0, delta_t = 0.0;
var dist_v = 0.0;
var score_v = 0.0;
var dummy_num = 7;
var pos_x = new Array(dummy_num), pos_y = new Array(dummy_num);

function dummy_setting(){
	for(var i=0; i<dummy_num; i++){
 		pos_x[i] = obj_x_v+500*Math.random();
 		pos_y[i] = obj_y_v+500*Math.random();
 		console.log(pos_x[i]);
 		console.log(pos_y[i]);
	}
}
dummy_setting();

const canvas_size = screen.availWidth*0.2;

function check_size() {
	window.resizeTo(
		canvas_size+(window.outerWidth - window.innerWidth), 
		canvas_size+(window.outerHeight - window.innerHeight)
	);
	stage.width = canvas_size;
	stage.height = canvas_size;
}
window.requestAnimationFrame(check_size);
window.addEventListener('resize', check_size);

function check_motion(){
	p_x_v = window.screenX;
	p_y_v = window.screenY;
	window.requestAnimationFrame(check_motion);
}
window.requestAnimationFrame(check_motion);

function distance(x1, y1, x2, y2){
	var temp = Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
	if(temp != 0.0){
		return Math.sqrt(temp);
	} else {
		return 0.0;
	}
}

function draw(x, y, radius, a, color){
	cvs.beginPath();
	cvs.arc(
		canvas_size/2+x, canvas_size/2+y,
		canvas_size/4+radius,
		0, 360*Math.PI/180,
		false
	);
	cvs.fillStyle = `rgba(255, ${color}, 0, ${a})`;
	cvs.fill();
}

var flag = 0;
function animation(timestamp){
	dist_v = distance(p_x_v, p_y_v, obj_x_v, obj_y_v);
	delta_t = timestamp - count_t;
	count_t += delta_t;
	t += delta_t*(1/2 + Math.min(1/(0.01*dist_v), 1.5));
	cvs.clearRect(0, 0, canvas_size, canvas_size);
	draw(0.0, 0.0, 0.0, 0.5, 0)
	
	if(t > 1000){
		flag = 1;
		t = t - 1000*Math.floor(t/1000);
		ani_t = 0.0;
	}
	if(flag){
		ani_t += delta_t/10;
	}
	draw(0.0, 0.0, ani_t, (0.5 - Math.min(0.5, 0.5*ani_t/50)), 0);
	for(var i=0; i<dummy_num; i++){
		draw(
			pos_x[i]-p_x_v-canvas_size/2,
			pos_y[i]-p_y_v-canvas_size/2,
			ani_t-canvas_size/4,
			(0.5 - Math.min(0.5, 0.5*ani_t/50)),
			255
			);
	}
	
	if(ani_t > 50){
		flag = 0;
	}
	window.requestAnimationFrame(animation);
}
window.requestAnimationFrame(animation);

document.body.addEventListener('keydown',
	(e) => {
	score_v += Math.min(1/(0.01*dist_v), 2);
	score.innerText = score_v;
	
	obj_x_v = (screen.availWidth-150)*Math.random();
	obj_y_v = (screen.availHeight-150)*Math.random();
	dummy_setting();
});