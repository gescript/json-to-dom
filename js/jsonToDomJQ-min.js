jQuery.setElementJsonAttrs=function(b,a){if(a.value){b.val(a.value)}if(a.text){b.text(a.text)}for(attr in a){if(attr!=="value"||attr!=="text"){b.attr(attr,a[attr])}}};jQuery.jsonToDom=function(){function a(f){return((typeof f=="object")&&(f!==null))}function b(i,j){var h=$(i);try{var f=$.parseJSON(j);if(a(f)){$.setElementJsonAttrs(h,f);return true}}catch(g){}if(h.value!==undefined){h.val(j)}else{h.html(j)}}function e(f,j){var i=$(f).children(":first");var g=0;for(objKey in j){if(g>0){$(f).append(i.clone())}var h=new $.jsonToDom();h.render(f,j[objKey],g);g++}}function d(){var f={};f.parse=function(g,j){if(a(j)){if($.isArray(j)){e(g,j)}else{for(innerKey in j){var i=g+">."+innerKey;if(a(j[innerKey])){var h=new $.jsonToDom();h.render(i,j[innerKey])}else{b(i,j[innerKey])}}}}else{b(g,j)}};return f}var c={};c.render=function(i,h,g){if(a(h)){if($.isArray(h)){e(i,h)}else{for(key in h){var f=i+">."+key;if(g){f+=":eq("+g+")"}var j=d();j.parse(f,h[key])}}}};return c};