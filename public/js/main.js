
/**
 *
 * @param {string} id
 * @param {function} cb
 * @returns {*}
 */
var getVars = (id, cb) => {
     document.getElementById(id).style.display = 'none';
     var d = document.getElementById(id).innerText;
     var doc = JSON.parse(d);
     return cb(doc);
}

/**
 *
 * @param {string} id
 * @param {function} cb
 * @returns {*}
 */
var getSingle = (id, cb) => {
     document.getElementById(id).style.display = 'none';
     var d = document.getElementById(id).innerText;
     if (d==="true"){
          return true;
     }
     if (d==="false"){
          return false;
     }
     return cb(d);
}

/**
 *
 * @param {string} str
 * @returns {string}
 */
var MaysPrimera = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 *
 * @param {Object} obj1
 * @param {Object} obj2
 * @returns {Object}
 */
var jsonpush = (obj1, obj2) => {
     for (var index in obj2) {
          if (obj2.hasOwnProperty(index)) {
               obj1[index] = obj2[index];
          }
     }
     return obj1;
}

/**
 *
 * @param {string} str
 * @returns {string}
 */
var mayPalabras = (str) => {
     var s = str.split(' ');
     for (var i = 0; i < s.length; i++) {
          s[i] = MaysPrimera(s[i]);
     }
     var ret = "";
     for (var i = 0; i < s.length-1; i++) {
          ret += s[i] +" ";
     }
     ret += s[s.length-1];
     return ret;
}

/**
 * 
 * @param {Array<Object>} data
 * @param {string} par
 * @returns {Array<string>}
 */
var getOneDate = (data, par) => {
     var ret = [];
     for (let i = 0; i < data.length; i++) {
          ret.push(data[i][par]);
     }
     return ret;
}

/**
 * 
 * @param {Array<string>} dat 
 * @returns {string}
 */
var petFn = (dat) => {
     var ret = "";
     for (let i = 0; i < dat.length - 1; i++) {
          ret += dat[i] + "|";
     }
     ret += dat[dat.length - 1];
     return ret;
}

/**
 * 
 * @param {string} name 
 */
var getParameterByName = (name) => {
     name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
     var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
     results = regex.exec(location.search);
     return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
 }
