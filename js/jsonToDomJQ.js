jQuery.setElementJsonAttrs = function(node, attrs) {
	if(attrs.value) {
		node.val(attrs.value);
	}
	if(attrs.text) {
		node.text(attrs.text);
	}
	for(attr in attrs) {
		if(attr !== "value" || attr !== "text") {
			node.attr(attr, attrs[attr]);
		}
	}
};

jQuery.jsonToDom = function() {

	function isObject(A) {
	  return ( (typeof A == "object") && (A !== null) );
	}
	
	function setNodeBySel(sel, val) {
		var node = $(sel);
		try {
			var attrs = $.parseJSON(val);
			if(isObject(attrs)) {
				$.setElementJsonAttrs(node, attrs);
				return true;
			}
		}
		catch(err) {}
		
		if(node.value !== undefined) {
			node.val(val);
		} else {
			node.html(val);
		}
	}
	
	function expandArray(elemSel, json) {
		var newElem = $(elemSel).children(":first");
		var counter = 0;
		for(objKey in json) {
			if(counter > 0) {
				$(elemSel).append(newElem.clone());
			}
			var jsonToDom = new $.jsonToDom();
			jsonToDom.render(elemSel, json[objKey], counter);
			counter++;
		}
	}
	
	function parseJsonToDom() {
		
		var parser = {};
	
		parser.parse = function(elemSel, json) {
			if(isObject(json)) {
				if($.isArray(json)) {
					expandArray(elemSel, json);
				} else {
					for(innerKey in json) {
						var selec = elemSel + ">." + innerKey;
						if(isObject(json[innerKey])) {
							var innerJsonToDom = new $.jsonToDom();
							innerJsonToDom.render(selec, json[innerKey]);
						} else {
							setNodeBySel(selec, json[innerKey]);
						}
					}
				}
			} else {
				setNodeBySel(elemSel, json);
			}
		}
		return parser;
	}

	var parseDom = {};
	parseDom.render = function(rootSel, json, nthChild) {
		if(isObject(json)) {
			if($.isArray(json)) {
				expandArray(rootSel, json);
			} else {
				for(key in json) {
					var elemSel = rootSel + ">." + key;
					if(nthChild) {
						elemSel += ":eq(" + nthChild + ")";
					}
					var parser = parseJsonToDom();
					parser.parse(elemSel, json[key]);
				}
			}
		}
	}
	return parseDom;
};

