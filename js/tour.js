// This script (tinySlider) was derived from an original work by Michael Leigeber.
// see: http://www.leigeber.com/2009/12/slideshow-script/
function T$(i){return document.getElementById(i)}
function T$$(e,p){return p.getElementsByTagName(e)}
var mlStyle = T$("moveleft").style;
var mrStyle = T$("moveright").style;
var TINYslider=function(){
	function slide(n,p){this.n=n; this.init(p)}
	slide.prototype.init=function(p){
		var s=T$(p.id), u=this.u=T$$('ul',s)[0], c=T$$('li',u), l=c.length, i=this.l=this.c=0;
		this.a=0; this.p=p.resume||0; s.style.overflow='hidden';
		for(i;i<l;i++){if(c[i].parentNode==u){this.l++}}
		u.style.left=0; this.w=p.width||c[0].offsetWidth; u.style.width=(this.l*this.w)+'px'
		this.pos(p.position||0,this.a?1:0)
	},
	slide.prototype.move=function(d,a){
		var n=this.c+d, i=d==1?n==this.l?this.l-1:n:n<0?0:n; this.pos(i,a);
		if      (i ==  0)         { mlStyle.visibility='hidden'; }
		else if (i === this.l-1)  { mrStyle.visibility='hidden'; }
		else {
			mlStyle.visibility='visible';
			mrStyle.visibility='visible';
		}
	},
	slide.prototype.pos=function(p,a){
		clearInterval(this.u.ai); clearInterval(this.u.si);
		var o=parseInt(this.u.style.left),
		t=p*this.w, d=t>Math.abs(o)?1:-1; t=t*-1; this.c=p;
		if(this.g){for(var i=0;i<this.l;i++){this.g[i].className=i==p?this.s:''}}
		this.u.si=setInterval(new Function(this.n+'.slide('+t+','+d+','+a+')'),20)
	},
	slide.prototype.slide=function(t,d,a){
		var o=parseInt(this.u.style.left);
		if(o==t){
			clearInterval(this.u.si); 
		}else{
			var v=o-Math.ceil(Math.abs(t-o)*.15)*d+'px';
			this.u.style.left=v
		}
	};
	return{slide:slide}
}();
var slideshow=new TINYslider.slide('slideshow',{
	id:'slider',
	resume:true,
	vertical:false,
	activeclass:'current',
	position:0
});