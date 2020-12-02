var inpBox=document.querySelector('#inp-box')
var overlay=document.querySelector('.overlay');
var underlay=document.querySelector('.underlay'); 
const uploadBtn=document.querySelector('#upload-btn');
const uploadBtn2=document.querySelector('#upload-btn2');
const dropZone=document.querySelector('#drop-zone');
const linker=document.querySelector('.get-link');
const modalCloseTrigger = document.querySelector('.popup-modal__close');
const bodyBlackout = document.querySelector('.body-blackout');
const popupModal=document.querySelector('.popup-modal');
const conta=document.querySelector('.conta');
const croppped=document.querySelector('.cropped');
const cropppedU=document.querySelector('.cropped-upper');

const heler=document.querySelector('.heler');
uploadBtn.addEventListener("click",function() {
    console.log("Hello")
    inpBox.click();
})   
inpBox.addEventListener('change',fileEvent);
 
modalCloseTrigger.addEventListener("click",function() { 
    popupModal.classList.remove('is--visible')
    bodyBlackout.classList.remove('is-blacked-out');
})


 
function fileEvent(e) { 
    conta.classList.add('shower');
    let file;
    if(e.type==="change") {
        file = e.currentTarget.files[0]; 
    }else {
        file=e.dataTransfer.files[0];
    }
    
    const formData=new FormData();
    formData.append("image",file); 
    fetch('https://api.imgur.com/3/image/',{
        method:"POST",
        headers:{
            Authorization:"CLIENT-ID b865730ae641337"
        },
        body:formData
    }).then(data=>data.json())
    .then(data=> {
        conta.classList.remove('shower');
        popupModal.classList.add('is--visible');
        bodyBlackout.classList.add('is-blacked-out');
        linker.href=data.data.link;
        // console.log("Your Image is successfull uploaded to "+data.data.link);
    })
    paster(file); 
   
}
  
function paster(file) {
    var reader=new FileReader();
    reader.onload=function() { 
        underlay.style.display="none";
        croppped.src=reader.result;
        croppped.classList.add('cropped-show');
        //overlay.style.backgroundImage='url('+reader.result+')';
        var resize = new Croppie(croppped, {
            viewport: { 
              width: 200, 
              height: 200,
              type: 'square'
            },
            boundary: { 
              width: 350, 
              height: 300 
            },
            // showZoomer: false,
            // enableResize: true,
            enableOrientation: true
          });

          uploadBtn2.addEventListener("click",function() {
            console.log(resize);
            resize.result('base64').then(function(dataImg) {
                console.log(dataImg);
            //var data = [{ image: dataImg }, { name: 'myimage.jpg' }];
                cropppedU.src=dataImg;
                cropppedU.classList.add('cropped-show');
            })
        })
    } 
    reader.readAsDataURL(file); 
}
 


var dragdrop = {
	init : function( elem ){
		elem.setAttribute('ondrop', 'dragdrop.drop(event)');
        elem.setAttribute('ondragover', 'dragdrop.drag(event)' );
        elem.setAttribute('ondragleave', 'dragdrop.leave(event)' );
        elem.setAttribute('onmouseover', 'dragdrop.hoverin(event)' );
        elem.setAttribute('onmouseleave', 'dragdrop.hoverout(event)' );
	},
	drop : function(e){ 
		e.preventDefault();
		var file = e.dataTransfer.files[0];
		fileEvent(e);
	},
	drag : function(e){ 
        e.path[0].style.backgroundColor="#ecf0f5";
        e.path[0].style.transform="scale(1.01)"
		e.preventDefault();
    },
    leave:function(e) { 
        e.path[0].style.backgroundColor="#fff";
        e.path[0].style.transform="scale(1)"
        e.preventDefault();
    },
    hoverin:function(e) { 
        if(e.path[0]===overlay) {
            e.path[0].style.transform="scale(1.01)";
            e.path[0].style.backgroundColor="#ecf0f5";
            e.path[0].style.cursor="pointer";
        }
    },
    hoverout:function(e) {
        e.path[0].style.transform="scale(1)";
        e.path[0].style.backgroundColor="transparent";
    }
    
};


dragdrop.init(overlay); 
