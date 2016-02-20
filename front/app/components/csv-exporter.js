import Ember from 'ember';

export default Ember.Component.extend({
	town: null,
	electoral: false,
	joined: false,

	_ajax_download: function (url, data, input_name) {
	    var $iframe,
	        iframe_doc,
	        iframe_html;

	    if (($iframe = $('#download_iframe')).length === 0) {
	        $iframe = $("<iframe id='download_iframe'" +
	                    " style='display: none' src='about:blank'></iframe>"
	                   ).appendTo("body");
	    }

	    iframe_doc = $iframe[0].contentWindow || $iframe[0].contentDocument;
	    if (iframe_doc.document) {
	        iframe_doc = iframe_doc.document;
	    }

	    iframe_html = "<html><head></head><body><form method='GET' action='" + url +"'>";

	    input_name.forEach(function (key) {
	    	iframe_html += "<input type=hidden name='" + key + "' value='" +
	                  JSON.stringify(data[key]) +"'/>";
	    });

	    iframe_html += "</form></body></html>";
	    iframe_doc.open();
	    iframe_doc.write(iframe_html);
	    $(iframe_doc).find('form').submit();
	},

	actions: {
		export: function () {
			var params = {joined: this.get('joined'), electoral: this.get('electoral')};
			this._ajax_download('http://localhost:1337/exportCSV/' + this.get('town').get('seccion'), params, ['electoral', 'joined']);
		}
	}
});
