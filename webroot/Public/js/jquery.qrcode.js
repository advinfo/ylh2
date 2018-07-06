(function( $ ){
	$.fn.qrcode = function(options) {
		// if options is string, 
		if( typeof options === 'string' ){
			options	= { text: options };
		}

		// set default values
		// typeNumber < 1 for automatic calculation
		options	= $.extend( {}, {
			render		: "canvas",
			width		: 256,
			height		: 256,
			border		: 5,
			logoid		: "",
			logoW		: 64,
			logoH		: 64,
			typeNumber	: -1,
			correctLevel	: QRErrorCorrectLevel.H,
			background      : "#ffffff",
			foreground      : "#000000"
		}, options);
		var op = options;

		var createCanvas	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();

			// create canvas element
			var canvas	= document.createElement('canvas');
			canvas.width	= options.width + options.border * 2;
			canvas.height	= options.height + options.border * 2;
			var ctx		= canvas.getContext('2d');

			//paint background
			var panelW = options.width + options.border * 2;
			var panelH = options.height + options.border * 2;
			ctx.fillStyle = options.background;
			ctx.fillRect(0, 0, panelW, panelH);
			//console.log("panelW " + panelW + " panelH " + panelH);

			// compute tileW/tileH based on options.width/options.height
			var tileW	= options.width  / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();
			//console.log('titleW ' + tileW + ' tileH ' + tileH);

			// draw in the canvas
			for( var row = 0; row < qrcode.getModuleCount(); row++ ){
				for( var col = 0; col < qrcode.getModuleCount(); col++ ){
					ctx.fillStyle = qrcode.isDark(row, col) ? options.foreground : options.background;
					var w = (Math.ceil((col+1)*tileW) - Math.floor(col*tileW));
					var h = (Math.ceil((row+1)*tileW) - Math.floor(row*tileW));
					var x = Math.round(col*tileW) + options.border;
					var y = Math.round(row*tileH) + options.border;
					//console.log('x ' + x + ' y ' + y + ' w ' + w + ' h ' + h);
					ctx.fillRect(x, y, w, h);
				}	
			}

			// add logo
			if('' != op.logoid)
			{
				var img = document.getElementById(op.logoid);
				ctx.drawImage(img, (canvas.width - op.logoW)/2, (canvas.height - op.logoH)/2, op.logoW, op.logoH);
				//console.log('img x ' + x + ' y ' + y + ' w ' + w + ' h ' + h);
			}

			// return just built canvas
			return canvas;
		}

		// from Jon-Carlos Rivera (https://github.com/imbcmdth)
		var createTable	= function(){
			// create the qrcode itself
			var qrcode	= new QRCode(options.typeNumber, options.correctLevel);
			qrcode.addData(options.text);
			qrcode.make();
			
			// create table element
			var $table	= $('<table></table>')
				.css("width", options.width+"px")
				.css("height", options.height+"px")
				.css("border", "0px")
				.css("border-collapse", "collapse")
				.css('background-color', options.background);
		  
			// compute tileS percentage
			var tileW	= options.width / qrcode.getModuleCount();
			var tileH	= options.height / qrcode.getModuleCount();

			// draw in the table
			for(var row = 0; row < qrcode.getModuleCount(); row++ ){
				var $row = $('<tr></tr>').css('height', tileH+"px").appendTo($table);
				
				for(var col = 0; col < qrcode.getModuleCount(); col++ ){
					$('<td></td>')
						.css('width', tileW+"px")
						.css('background-color', qrcode.isDark(row, col) ? options.foreground : options.background)
						.appendTo($row);
				}	
			}
			// return just built canvas
			return $table;
		}
  

		return this.each(function(){
			var element	= options.render == "canvas" ? createCanvas() : createTable();
			jQuery(element).appendTo(this);
		});
	};
})( jQuery );
