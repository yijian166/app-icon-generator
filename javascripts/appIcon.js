var dragBox = document.getElementById('dragBox');




dragBox.addEventListener('dragenter',handleDragEnter,false);
dragBox.addEventListener('dragover',handleDragOver,false);
dragBox.addEventListener('drop',handleFileSelect,false);
dragBox.addEventListener('dragleave',handleDragLeave,false);

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
                   console.log(e);

                   dragBox.innerHTML = img;
                   console.log(img);

                   mackIosIcon(e.target.result);
                   mackAndroidIcon(e.target.result);


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

		htmlLi 	+= '<li>'
				 + '<img src="'
				 + getImgDataURL(sizeList[i],imgUrl)
				 + '" >'
				 + '</li>';


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

	var originImgDAtaURL = getOriginImgDataURL(895,imgUrl);
	for(var i = 0,len = sizeList.length;i<len;i++){

		htmlLi 	+= '<li>'
				 + '<img src="'
				 + getImgDataURL(sizeList[i],originImgDAtaURL)
				 + '" >'
				 + '</li>';


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



	function getOriginImgDataURL (size,url){
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

		})(iconCanvas,0,0,size,size,120,img);
	}

}


// var testCtx = document.getElementById('test').getContext("2d");










