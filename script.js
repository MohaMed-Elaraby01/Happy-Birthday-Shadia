const flames =
document.querySelectorAll(".flame");

const finalScreen =
document.getElementById("finalScreen");

const birthdayVoice =
document.getElementById("birthdayVoice");

const giftButton =
document.getElementById("giftButton");

const giftMessage =
document.getElementById("giftMessage");

let remaining = flames.length;

let finished = false;

/* إطفاء الشموع */

function extinguish(flame){

if(!flame) return;

if(flame.dataset.out === "true")
return;

flame.dataset.out = "true";

const smoke =
document.createElement("div");

smoke.className = "smoke";

smoke.innerHTML = "☁";

flame.parentElement.appendChild(smoke);

flame.remove();

setTimeout(()=>{
smoke.remove();
},1800);

remaining--;

if(remaining <= 0){

setTimeout(()=>{
celebrate();
},500);

}

}

/* دعم الضغط والسحب */

flames.forEach(flame=>{

flame.addEventListener(
"pointerenter",
()=>{
extinguish(flame);
}
);

flame.addEventListener(
"touchstart",
()=>{
extinguish(flame);
}
);

flame.addEventListener(
"click",
()=>{
extinguish(flame);
}
);

});

/* شاشة التهنئة */

function celebrate(){

if(finished) return;

finished = true;

finalScreen.classList.remove(
"hidden"
);

birthdayVoice.play()
.catch(()=>{});

launchConfetti();

launchHearts();

}

/* الكونفيتي */

function launchConfetti(){

const icons = [
"🎉",
"🎊",
"✨",
"🎈",
"💖"
];

for(
let i=0;
i<150;
i++
){

setTimeout(()=>{

const confetti =
document.createElement("div");

confetti.className =
"confetti";

confetti.innerHTML =
icons[
Math.floor(
Math.random() *
icons.length
)
];

confetti.style.left =
Math.random()*100 + "vw";

confetti.style.animationDuration =
(3 + Math.random()*3)
+ "s";

document.body.appendChild(
confetti
);

setTimeout(()=>{
confetti.remove();
},7000);

},i*20);

}

}

/* القلوب */

function launchHearts(){

const hearts = [
"❤️",
"💖",
"💕",
"💗"
];

setInterval(()=>{

const heart =
document.createElement("div");

heart.className = "heart";

heart.innerHTML =
hearts[
Math.floor(
Math.random() *
hearts.length
)
];

heart.style.left =
Math.random()*100 + "vw";

heart.style.bottom = "-30px";

document.body.appendChild(
heart
);

setTimeout(()=>{
heart.remove();
},4000);

},300);

}

/* زر المفاجأة */

giftButton.addEventListener(
"click",
()=>{

giftMessage.classList.toggle(
"hidden"
);

}
);

/* السحب على الشموع */

document.addEventListener(
"pointermove",
(e)=>{

const element =
document.elementFromPoint(
e.clientX,
e.clientY
);

if(
element &&
element.classList &&
element.classList.contains(
"flame"
)
){
extinguish(element);
}

}
);

document.addEventListener(
"touchmove",
(e)=>{

const touch =
e.touches[0];

if(!touch) return;

const element =
document.elementFromPoint(
touch.clientX,
touch.clientY
);

if(
element &&
element.classList &&
element.classList.contains(
"flame"
)
){
extinguish(element);
}

},
{
passive:true
}
);

/* حركة بسيطة للتورتة */

const cake =
document.querySelector(
".cake"
);

if(cake){

setInterval(()=>{

cake.animate(
[
{
transform:
"translateY(0px)"
},
{
transform:
"translateY(-3px)"
},
{
transform:
"translateY(0px)"
}
],
{
duration:2200
}
);

},2200);

}