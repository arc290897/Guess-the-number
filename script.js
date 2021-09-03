const images=[
	{
		image_name:"cats.jpg",
		number_of_items:4,
		title:"cats"
	},
	{
		image_name:"cookies.jpg",
		number_of_items:8,
		title:"cookies"
	},
	{
		image_name:"crayons.jpg",
		number_of_items:5,
		title:"crayons"
	},
	
	{
		image_name:"horses.jpg",
		number_of_items:4,
		title:"horses"
	},
	{
		image_name:"laptops.jpg",
		number_of_items:5,
		title:"laptops"
	},
	{
		image_name:"pasteries.jpg",
		number_of_items:6,
		title:"pasteries"
	},
	{
		image_name:"people.jpg",
		number_of_items:8,
		title:"people"
	},
	{
		image_name:"pizza.jpg",
		number_of_items:5,
		title:"pizza"
	}
]

let timerSetting;

let currentImageValue=0, displayNumber=0, score=0,chosen=false;

let totalAvailable=images.length;

const endOfGame=()=>{
	document.getElementById("startScreen").style.display="none";
	document.getElementById("statsContent").style.display="none";
	document.getElementById("imageContainer").style.display="none";
	document.getElementById("message").style.display="block";
	document.getElementById("message").innerHTML=`game over! your score is ${score} / ${totalAvailable}`;
	setTimeout(()=> location.reload(),5000);
}


const setImageSource=(randomImageName)=>{
	const imageContainer=document.getElementById("imageContainer");
	const image=`<img src="images/${randomImageName}">`;
	imageContainer.innerHTML=image;
}


const setImageName=(randomImagetitle)=>{
	document.getElementById("item-name").innerHTML=randomImagetitle;
}


const generatePlusOrMinus=()=>{
	const number0or1=Math.floor(Math.random()*2);
	return number0or1 === 0? -1 : 1;
}


const generateDisplayNumber=(plusOrMinus,numberOfItems)=>{
	const split=Math.floor(Math.random()*2);
	if(split === 0){
		document.getElementById("number").innerHTML=numberOfItems;
		displayNumber=numberOfItems;
	}else{
		document.getElementById("number").innerHTML=`${numberOfItems + plusOrMinus}`;
		displayNumber=numberOfItems + plusOrMinus;
	}

	currentImageValue=numberOfItems;
}


const generate=()=>{
	if(images.length === 0){
		stopTimer();
		endOfGame();
	}
	chosen=false;
	const randomNumber=Math.floor(Math.random() * images.length);
	const randomImageName=images[randomNumber].image_name;
	setImageSource(randomImageName);

	const randomImagetitle=images[randomNumber].title;
	setImageName(randomImagetitle);

	const plusOrMinus=generatePlusOrMinus();
	const numberOfItems=images[randomNumber].number_of_items;
	generateDisplayNumber(plusOrMinus,numberOfItems);
	
	images.splice(randomNumber,1);
}

const timer=()=>{
	timerSetting=setInterval(generate,1000);
}

const play=()=>{
	document.getElementById("statsContent").style.display="block";
	document.getElementById("startScreen").style.display="none";
	generate();
	timer();
}

const stopTimer=()=>{
	clearInterval(timerSetting);
}

const match=()=>{
	if(!chosen){
		currentImageValue === displayNumber ? score ++ : score --;
		chosen=true;
		document.getElementById("currentScore").innerHTML=score;
	}
}

const noMatch=()=>{
	if(!chosen){
		currentImageValue !== displayNumber ? score ++ : score --;
		chosen=true;
		document.getElementById("currentScore").innerHTML=score;
	}
}