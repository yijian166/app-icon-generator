var appIconURL = '';
var icons = [];
var dragBox = document.getElementById('dragBox');
var siteUrl = window.location.href.slice( 0, window.location.href.indexOf('/#'));
var dl  = document.getElementById('dl');

// zip.workerScriptsPath = siteUrl + "/javascripts/lib/";


dragBox.addEventListener('dragenter',handleDragEnter,false);
dragBox.addEventListener('dragover',handleDragOver,false);
dragBox.addEventListener('drop',handleFileSelect,false);
dragBox.addEventListener('dragleave',handleDragLeave,false);


var radiusRange = document.getElementById('radiusRange'),
	radiusNum = document.getElementById('radiusNum'),
	radiusShow = document.getElementById('radiusShow'),
	radiusShowOriginURL = siteUrl + radiusShow.getAttribute('data-src');


radiusRange.addEventListener('change',changeRadius,false);
radiusNum.addEventListener('change',changeRadius,false);

//初始化
init();

function init(){
	radiusShow.src = radiusShowOriginURL;
	radiusShow.onload = function(){
		showRoundRectImg();
	}
}


function changeRadius(e){
	//同步range 和输入框的值
    if(this.id === 'radiusRange'){
    	radiusNum.value = this.value / 100;
    }else {
    	radiusRange.value = this.value  * 100;
    }
    showRoundRectImg(radiusRange.value);
    if(appIconURL ==='')return;
    mackAndroidIcon(appIconURL);
}
function showRoundRectImg(radius){
	var radius = radius ? radius : radiusRange.value;
	var url = radiusShowOriginURL;
	var showImgURL = getRoundRectImgDataURL(1000,radius,url);
	radiusShow.src = showImgURL;
}
// 处理插入拖出效果
function handleDragEnter(evt){ this.setAttribute('style', 'border-style:dashed;'); }
function handleDragLeave(evt){ this.setAttribute('style', ''); }

// 处理文件拖入事件，防止浏览器默认事件带来的重定向
function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
}

 function handleFileSelect(event){
    event.stopPropagation();
    event.preventDefault();

    var files = event.dataTransfer.files,
        errorMessage;


	function isPng(type){
		if(type == 'image/png'){
			return true;
		}else {
			return false;
		}
	}



    for(var i= 0,f;f=files[i];i++){

        var t = f.type ? f.type : 'n/a',
            reader = new FileReader(),
            typeIsPng = isPng(t);


        //处理得到的png图片
        if(typeIsPng){
            reader.onload = (function(theFile){
               return function(e){
                   // var img = new Image();

                   // img.src = e.target.result;
                   var img = '<img src="' + e.target.result + '">';

                   dragBox.innerHTML = img;
                   appIconURL = e.target.result;

                    //remove disable
                   dl.setAttribute('class','button-success pure-button');
                   
                   mackIosIcon(appIconURL);
                   mackAndroidIcon(appIconURL);





               };
            })(f);

            //显示读取文件错误信息
            reader.onerror  = function(e){
                // showMessage("File could not be read! Code "+ e.target.error.code,"alert alert-danger");
                console.log( e.target.error.code);
            };
            reader.readAsDataURL(f);
        }
    }
}

function mackIosIcon(imgUrl){
	var sizeList = [29,58,87,80,57,114,120,180,512,1024],
		htmlLi = '';
	for(var i = 0,len = sizeList.length;i<len;i++){
		var url = getImgDataURL(sizeList[i],imgUrl);

		htmlLi 	+= '<li>'
				 + '<img src="'
				 + url
				 + '" >'
				 + '</li>';

		icons.push({
			name:'iosICon' + sizeList[i] + '.png',
			imgData:url
		});
	};
	document.getElementById('iosIconList').innerHTML = htmlLi;

	var img = new Image();

        img.src = imgUrl;



	function getImgDataURL (size,url){
		var img = new Image();
        img.src = url;

		var iconCanvas = document.createElement('canvas'),
			iconCanvasCtx = iconCanvas.getContext('2d');

		iconCanvas.width = size;
		iconCanvas.height = size;
		iconCanvasCtx.drawImage(img,0,0,size,size);
		return iconCanvas.toDataURL();
	}

}

function mackAndroidIcon(imgUrl){
	var sizeList = [48,72,96,144],
		htmlLi = '';

	var originImgDAtaURL = getRoundRectImgDataURL(1000,radiusRange.value,imgUrl);
	for(var i = 0,len = sizeList.length;i<len;i++){
		var url = getImgDataURL(sizeList[i],originImgDAtaURL)

		htmlLi 	+= '<li>'
				 + '<img src="'
				 + url
				 + '" >'
				 + '</li>';

		icons.push({
			name:'androidICon' + sizeList[i] + '.png',
			imgData:url
		});

	};
	document.getElementById('androidIconList').innerHTML = htmlLi;


    function getImgDataURL (size,url){
		var img = new Image();
        img.src = url;

		var iconCanvas = document.createElement('canvas'),
			iconCanvasCtx = iconCanvas.getContext('2d');

		iconCanvas.width = size;
		iconCanvas.height = size;
		iconCanvasCtx.drawImage(img,0,0,size,size);
		return iconCanvas.toDataURL();
	}
}

function getRoundRectImgDataURL (size,radius,url){
	var img = new Image();
    img.src = url;

	var iconCanvas = document.createElement('canvas'),
		iconCanvasCtx = iconCanvas.getContext('2d');

	iconCanvas.width = size;
	iconCanvas.height = size;
	

	return (function roundRect(iconCanvas,x, y, w, h, radius , img) {
	  var r = x + w;
	  var b = y + h;
	  var context = iconCanvas.getContext('2d');

	  context.save();
	  context.beginPath();
	  // context.strokeStyle="green";
	  // context.lineWidth="4";
	  context.moveTo(x+radius, y);
	  context.lineTo(r-radius, y);
	  context.quadraticCurveTo(r, y, r, y+radius);
	  context.lineTo(r, y+h-radius);
	  context.quadraticCurveTo(r, b, r-radius, b);
	  context.lineTo(x+radius, b);
	  context.quadraticCurveTo(x, b, x, b-radius);
	  context.lineTo(x, y+radius);
	  context.quadraticCurveTo(x, y, x+radius, y);
	  // context.stroke();

	  context.closePath();
	    // Clip to the current path
	  context.clip();

	  context.drawImage(img, x, y,w,h);
	    
	    // Undo the clipping
	  context.restore();

	  return iconCanvas.toDataURL();

	})(iconCanvas,0,0,size,size,radius,img);
}

dl.addEventListener('click',function(){
	var zip = new JSZip();
	var ios = zip.folder("ios");
	var android = zip.folder("android");
	for(var i = 0,len = icons.length;i<len;i++){
		var imgBase64Data = getBase64Data(icons[i].imgData);
		var name = icons[i].name;
		if(name.match('ios')){
			ios.file(icons[i].name, imgBase64Data, {base64: true});
		}else {
			android.file(icons[i].name, imgBase64Data, {base64: true});
		}
	}
	var content = zip.generate({type:"blob"});
	// see FileSaver.js
	saveAs(content, "icons.zip");

},false);

function getBase64Data(imgData){
	return imgData.slice(22,-1);
}


function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}









