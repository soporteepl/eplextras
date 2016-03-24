function EPL_METRICS_EXTRA_HELPERS() {

	var 
		_eplDoc  	= window.parent.eplDoc,
		_th		 	= _eplDoc.eplTH,
		getHandler	= 	function (metric) {
				var m = metric;
				return function() {_eplDoc.th4.registrarAccion(_eplDoc.epl.getAd(bannerId), m)}
		};

	this.completo       = gethandler(1);
	this.encendido      = gethandler(2);
	this.start_button   = gethandler(3);
	this.stop_button    = gethandler(4);
	this.restart_button = gethandler(5);
	this.sound_off      = gethandler(6);
	this.sound_on       = gethandler(7);
	this.close_button   = gethandler(8);
	this.desplegar      = gethandler(9);
	this.replegar       = gethandler(10);
	this.demorado       = gethandler(11);
	this.not_found      = gethandler(12);
	this.compartir      = gethandler(13);
	this.descargar      = gethandler(14);
	this.ver_fotos      = gethandler(15);

	this.startTimer = function(){
        _th.timerStart(bannerId);
	}

	this.stopTimer = function(){
        _th.timerStop(bannerId);
	}

	this.customAction = function (id){//id entre 0-9
        _th.customAction(bannerId, id);
	}	
} 

function EPL_IFRAME_EXTRA_HELPERS() {

	var
		private_this = new (function (public_this) {


			this.getEplIframe = function () {

				return window.parent.document.getElementById(window.name)
			}

			this.resizeIframe =function(new_width, new_height) {

				this.iwidth(new_width);
				this.iHeight(new_height);
				if(window.parent.rp_resize) {
					window.parent.rp_resize(this.onlyN(new_width) + "x" + this.onlyN(new_height));
				}
			}

			this.onlyN = function(aString) {
				return aString.replace(/\D/g,"");
			}

			this.iwidth = function (new_width) {
		
				if (new_width) this.getEplIframe().style.width = new_width;
		
			return this.getEplIframe().style.width;
			}

			this.iHeight = function (new_height) {

				if (new_height) this.getEplIframe().style.height = new_height;
		
			return this.getEplIframe().style.height;
			}

			this.persistently = function (data) {

				var local_persistent_var = (data || {})['default_value'];

				return function (new_value) {

					local_persistent_var = new_value || local_persistent_var;

					return local_persistent_var;
				}
			}

			this.setStyle = function (objectToSetStyle, objectStyle) {

				for (var style_property in objectStyle) {
					objectToSetStyle.style[style_property] = objectStyle[style_property]
				}
			}

			this.getCloseButtonImageWE = function () {

				var 
					cb_img        = document.createElement("img"),
					autoreference = this;

				cb_img.alt = public_this.closeButtonAlt();
				if (public_this.closeButtonImgSrc()) cb_img.src = public_this.closeButtonImgSrc();

				return cb_img
			}

			this.getCloseButtonWE = function () {

				var	
					private_autoreference = this,
					cb_div                       = document.createElement("div"),
					close_button_container_style = {
						"background" : "black",
						"color"      : "white",
						"z-index"	 : "999999",
						"top"        : "0%",
						"padding"    : "2px",
						"border"     : "1px solid white",
						"right"      : "0%",
						"position"   : "absolute",
					};

				cb_div.appendChild(private_autoreference.getCloseButtonImageWE());
				cb_div.onclick = function () { public_this.hide() };
				private_this.setStyle(cb_div, close_button_container_style);
				private_this.setStyle(cb_div, public_this.extrasCloseButtonDivStyle());

				return cb_div;
			}


		})(this);


	this.closeButtonImgSrc = function (new_image_src) {

		this.closeButtonImgSrc = private_this.persistently();

		return this.closeButtonImgSrc(new_image_src);
	}

	this.closeButtonAlt = function (new_alt) {

		this.closeButtonAlt = private_this.persistently({ "default_value" : "Close [X]" });

		return this.closeButtonAlt(new_alt);
	}

	this.collapsedWidth = function (new_collapsed_width) {
	
		this.collapsedWidth = private_this.persistently({ "default_value" : private_this.iwidth() });
		this.expandedWidth(); 

		return this.collapsedWidth(new_collapsed_width);
	}

	this.collapsedHeight = function (new_collapsed_height) {

		this.collapsedHeight = private_this.persistently({ "default_value" : private_this.iHeight() });
		this.expandedHeight();

		return this.collapsedHeight(new_collapsed_height);
	}


	this.expandedHeight = function (new_expanded_height) {
		
		this.expandedHeight = private_this.persistently({ "default_value" : private_this.iHeight() });
		this.collapsedHeight();

		return this.expandedHeight(new_expanded_height);
	}


	this.expandedWidth = function (new_expanded_width) {
	
		this.expandedWidth = private_this.persistently({ "default_value" : private_this.iwidth() });
		this.collapsedWidth();

		return this.expandedWidth(new_expanded_width);
	}

// available methods

	this.expand = function () {

		private_this.resizeIframe(this.expandedWidth(), this.expandedHeight());
	}

	this.collapse = function () {

		private_this.resizeIframe(this.collapsedWidth(), this.collapsedHeight());
	}

	this.hide = function () {

		private_this.getEplIframe().style.display = "none";
	}

	this.autoHideTimeOut = function (timeInSeconds) {

		var persistent_self_reference = this;

		setTimeout(function () {persistent_self_reference.hide()}, (timeInSeconds * 1000));
	}

	this.setEspandableOnMouseover = function () {

		var persistent_self_reference = this;

		this.getEplIframe().onmouseover = function(){persistent_self_reference.expand()};
	};
	this.setCollapsibleOnMouseout = function () {

		var persistent_self_reference = this;

		this.getEplIframe().onmouseout = function(){persistent_self_reference.collapse()};
	}

	this.resizeAccordingToMousePosition = function () {

		this.setEspandableOnMouseover();
		this.setCollapsibleOnMouseout();
	}

	this.insertCloseButton = function() {

		document.body.insertBefore(private_this.getCloseButtonWE(), document.body.firstElementChild);
	}

	this.extrasCloseButtonDivStyle = function(data) {

		this.extrasCloseButtonDivStyle = private_this.persistently({ "default_value" : {} });

		return this.extrasCloseButtonDivStyle(data);
	}

};

var
	eplCIf    = new EPL_IFRAME_EXTRA_HELPERS(),
	eplMetric = new EPL_METRICS_EXTRA_HELPERS();
