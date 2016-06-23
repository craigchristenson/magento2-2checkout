function p(e){return function(){return e}}
(function(){function e(a){try{if(navigator.plugins&&navigator.plugins.length)for(var b=0;b<navigator.plugins.length;b++){var c=navigator.plugins[b];if(c.name.indexOf(a)>=0)return c.name+(c.description?"|"+c.description:"")}}catch(i){}return""}function v(a){var b=new Date,c=new Date,i=[p("TF1"),p("015"),function(){return ScriptEngineMajorVersion()},function(){return ScriptEngineMinorVersion()},function(){return ScriptEngineBuildVersion()},function(){return f("{7790769C-0471-11D2-AF11-00C04FA35D02}")},function(){return f("{89820200-ECBD-11CF-8B85-00AA005B4340}")},
function(){return f("{283807B5-2C60-11D0-A31D-00AA00B92C03}")},function(){return f("{4F216970-C90C-11D1-B5C7-0000F8051515}")},function(){return f("{44BBA848-CC51-11CF-AAFA-00AA00B6015C}")},function(){return f("{9381D8F2-0288-11D0-9501-00AA00B911A5}")},function(){return f("{4F216970-C90C-11D1-B5C7-0000F8051515}")},function(){return f("{5A8D6EE0-3E18-11D0-821E-444553540000}")},function(){return f("{89820200-ECBD-11CF-8B85-00AA005B4383}")},function(){return f("{08B0E5C0-4FCB-11CF-AAA5-00401C608555}")},
function(){return f("{45EA75A0-A269-11D1-B5BF-0000F8051515}")},function(){return f("{DE5AED00-A4BF-11D1-9948-00C04F98BBC9}")},function(){return f("{22D6F312-B0F6-11D0-94AB-0080C74C7E95}")},function(){return f("{44BBA842-CC51-11CF-AAFA-00AA00B6015B}")},function(){return f("{3AF36230-A269-11D1-B5BF-0000F8051515}")},function(){return f("{44BBA840-CC51-11CF-AAFA-00AA00B6015C}")},function(){return f("{CC2A9BA0-3BDD-11D0-821E-444553540000}")},function(){return f("{08B0E5C0-4FCB-11CF-AAA5-00401C608500}")},
function(){return eval("navigator.appCodeName")},function(){return eval("navigator.appName")},function(){return eval("navigator.appVersion")},function(){return s(["navigator.productSub","navigator.appMinorVersion"])},function(){return eval("navigator.browserLanguage")},function(){return eval("navigator.cookieEnabled")},function(){return s(["navigator.oscpu","navigator.cpuClass"])},function(){return eval("navigator.onLine")},function(){return eval("navigator.platform")},function(){return eval("navigator.systemLanguage")},
function(){return eval("navigator.userAgent")},function(){return s(["navigator.language","navigator.userLanguage"])},function(){return eval("document.defaultCharset")},function(){return eval("document.domain")},function(){return eval("screen.deviceXDPI")},function(){return eval("screen.deviceYDPI")},function(){return eval("screen.fontSmoothingEnabled")},function(){return eval("screen.updateInterval")},function(){return Math.abs(n-o)!==0},function(){return w(b)},p("@UTC@"),function(){var g=0;g=0;if(w(b))g=
Math.abs(n-o);return g=-(b.getTimezoneOffset()+g)/60},function(){return(new Date(2005,5,7,21,33,44,888)).toLocaleString()},function(){return eval("screen.width")},function(){return eval("screen.height")},function(){return l.Acrobat},function(){return l.Flash},function(){return l.QuickTime},function(){return l["Java Plug-in"]},function(){return l.Director},function(){return l.Office},p("@CT@"),function(){return n},function(){return o},function(){return b.toLocaleString()},function(){return eval("screen.colorDepth")},
function(){return eval("window.screen.availWidth")},function(){return eval("window.screen.availHeight")},function(){return eval("window.screen.availLeft")},function(){return eval("window.screen.availTop")},function(){return e("Acrobat")},function(){return e("Adobe SVG")},function(){return e("Authorware")},function(){return e("Citrix ICA")},function(){return e("Director")},function(){return e("Flash")},function(){return e("MapGuide")},function(){return e("MetaStream")},function(){return e("PDFViewer")},
function(){return e("QuickTime")},function(){return e("RealOne")},function(){return e("RealPlayer Enterprise")},function(){return e("RealPlayer Plugin")},function(){return e("Seagate Software Report")},function(){return e("Silverlight")},function(){return e("Windows Media")},function(){return e("iPIX")},function(){return e("nppdf.so")},function(){var g=document.createElement("span");g.innerHTML="&nbsp;";g.style.position="absolute";g.style.left="-9999px";document.body.appendChild(g);var q=g.offsetHeight;
document.body.removeChild(g);return q}];y();for(var h="",d=0;d<i.length;d++){if(a){h+=t(i[d].toString(),'"',"'",true);h+="="}var j;try{j=i[d](this)}catch(k){j=""}h+=a?j:escape(j);h+=";";if(a)h+="\\n"}h=t(h,escape("@UTC@"),(new Date).getTime());h=t(h,escape("@CT@"),(new Date).getTime()-c.getTime());return window.f1b5?window.f1b5(h):h}function t(a,b,c,i){if(typeof i!=="boolean")i=false;for(var h=true,d;(d=a.indexOf(b))>=0&&(i||h);){a=a.substr(0,d)+c+a.substr(d+b.length);h=false}return a}function w(a){var b=
Math.min(n,o);return Math.abs(n-o)!==0&&a.getTimezoneOffset()===b}function y(){for(var a=["Acrobat","Flash","QuickTime","Java Plug-in","Director","Office"],b=0;b<a.length;b++){var c=a[b],i=l,h=c,d=c;c="";try{if(navigator.plugins&&navigator.plugins.length){var j=RegExp(d+".* ([0-9._]+)");for(d=0;d<navigator.plugins.length;d++){var k=j.exec(navigator.plugins[d].name);if(k===null)k=j.exec(navigator.plugins[d].description);if(k)c=k[1]}}else if(window.ActiveXObject&&u[d])try{var g=new ActiveXObject(u[d][0]);
c=u[d][1](g)}catch(q){c=""}}catch(x){c=x.message}i[h]=c}}function s(a){for(var b=0;b<a.length;b++)try{var c=eval(a[b]);if(c)return c}catch(i){}return""}function f(a){var b="";try{if(typeof m.a.getComponentVersion!=="undefined")b=m.a.getComponentVersion(a,"ComponentID")}catch(c){a=c.message.length;a=a>40?40:a;b=escape(c.message.substr(0,a))}return b}var m={},n=(new Date(2005,0,15)).getTimezoneOffset(),o=(new Date(2005,6,15)).getTimezoneOffset(),l=[],u={Flash:["ShockwaveFlash.ShockwaveFlash",function(a){return a.getVariable("$version")}],
Director:["SWCtl.SWCtl",function(a){return a.ShockwaveVersion("")}]};try{m.a=document.createElement("span");typeof m.a.addBehavior!=="undefined"&&m.a.addBehavior("#default#clientCaps")}catch(z){}l={};m.jscall=function(a){try{if(!a)return v();var b;a:{var c;try{c=document.getElementById(a)}catch(i){}if(c===null||typeof c==="undefined")try{c=document.getElementsByName(a)[0]}catch(h){}if(c===null||typeof c==="undefined")for(var d=0;d<document.forms.length;d++)for(var j=document.forms[d],k=0;k<j.elements.length;k++){var g=
j[k];if(g.name===a||g.id===a){b=g;break a}}b=c}if(b!==null)try{b.value=v()}catch(q){b.value=escape(q.message)}}catch(x){}};window.parm4=m;var r=navigator.userAgent.toLowerCase();navigator.product==="Gecko"&&parseInt(r.substring(r.indexOf("rv:")+3,r.indexOf(")",r.indexOf("rv:")+3)).split(".")[0])<=2&&window.parm4.jscall()})();

//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//-----------------------------------------------------------------------------
// You can include this script on both sides - server and client:
// Server: <!-- #INCLUDE FILE="ScriptFile.js" -->
// Client: <script type="text/javascript" src="ScriptFile.js"></script>
//-----------------------------------------------------------------------------
// Warning: Be careful about what code you include in such way. Since the  code
// will be passed to the client side as simple text, your code can be  seen  by
// anyone who wants. Never do this with  scripts  which  contain  any  kind  of
// passwords, database connection strings, or SQL queries.
//=============================================================================

/// <reference name="System.js" assembly="System" />

//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------

System = {};

window.System = {
	__namespace: true,
	__typeName: "Sys",
	getName: function () { return "Sys"; },
	__upperCaseTypes: {}
};


//-----------------------------------------------------------------------------
// CLASS: System.Type
//-----------------------------------------------------------------------------

System.Type = function () {
	/// <summary>
	/// Initializes a new instance of the System.Type class.
	/// </summary>
	/// <remarks>These XML Comments were created only for IntelliSense.</remarks>
	/// <summary>
	/// Initializes a new instance of the System.Type class.
	/// </summary>
	this.Name = new String('name');
	this.Namespace = new String;
	this.FullName = new String;
	//---------------------------------------------------------
	this.ToSting = function () {
		/// <summary>
		/// Returns a String representing the name of the current Type.
		/// </summary>
		/// <returns>A String representing the name of the current System.Type.</returns>
		return this.FullName;
	}
	//---------------------------------------------------------
	function initialize() {
		var tn = new String();
		tn = arguments[0];
		this.FullName = tn;
		var ta = new Array;
		if (tn) {
			ta = tn.split('.');
			this.Name = ta[ta.length - 1];
			this.Namespace = ta.slice(0, ta.length - 2).join('.');
			//tnarguments[0];
			//tn.
			//this.Namespace = nspace;
			//this.Name = name;
			//this.FullName = this.Namespace +"."+ this.Name
		}
	}
	initialize.apply(this, arguments);
}

//-----------------------------------------------------------------------------

System.Type.Inherits = function (d, s) {
	for (var property in s) {
		if (property == "__typeName") continue;
		if (property == "GetType") continue;
		d[property] = s[property];
	}
	return s;
}

//-----------------------------------------------------------------------------

System.Type.RegisterNamespace = function (namespacePath) {
	// If Microsoft Ajax function exist then...
	if (typeof (Type) != "undefined" && typeof (Type.registerNamespace) == "function") {
		// Register namespace.
		Type.registerNamespace(namespacePath);
	} else {
		var rootObject = window;
		var namespaceParts = namespacePath.split('.');
		for (var i = 0; i < namespaceParts.length; i++) {
			var currentPart = namespaceParts[i];
			var ns = rootObject[currentPart];
			if (!ns) ns = rootObject[currentPart] = {};
			ns.__typeName = namespacePath;
			ns.__namespace = true;
			rootObject = ns;
		}
	}
}

//-----------------------------------------------------------------------------

System.Type.RegisterClass = function (typeName, baseType, interfaceTypes) {
	// If Microsoft Ajax function exist then...
	if (typeof (Type) != "undefined" && typeof (Type.registerClass) == "function") {
		// Register namespace.
		Type.registerClass(typeName, baseType, interfaceTypes);
	} else {
		var parsedName = eval(typeName);
		parsedName.__typeName = typeName;
		parsedName.__class = true;
	}
	var o = eval(typeName);
	o.prototype.GetType = function () { return new System.Type(typeName); }
}

//-----------------------------------------------------------------------------

System.Type.RegisterInterface = function (typeName, baseType) {}

//-----------------------------------------------------------------------------

System.Type.RegisterEnum = function (type, flags) {
	// If Microsoft Ajax function exist then...
	if (typeof (Type) != "undefined" && typeof (Type.registerEnum) == "function") {
		// Register namespace.
		Type.registerEnum(type, flags);
	} else {
		var o = eval(type);
		for (var i in o.prototype) o[i] = o.prototype[i];
		o.__enum = true;
		o.__flags = flags;
	}
}

//-----------------------------------------------------------------------------

System.Type.RegisterProperty = function (name) {
	var o = me[name];
	me[name] = function (value) {
		if (arguments.length == 0) return me[name].get();
		if (arguments.length == 1) me[name].set(value);
	}
}

//-----------------------------------------------------------------------------

System.Type.RegisterNamespace("System");
System.Type.RegisterClass("System.Type");


//=============================================================================
// Extensions
//-----------------------------------------------------------------------------
System.Extensions = function () {
	/// <summary>
	/// Create class to extend javascript objects. This function will run at the end
	/// of this file.
	/// </summary>
	//---------------------------------------------------------
	// METHOD: Apply
	//---------------------------------------------------------
	this.Apply = function () {
		var isServerSide = false;
		if (typeof (Response) == "object") isServerSide = true;
		if (!isServerSide) {
			// Cretae function $(...) - Get objects by Ids.
			// if this.$ conflicts with jquery so use this.d
			this.d = function () {
				return document.getElementById(arguments[0]);
			}
			// Try to add advanced $(...) function.
			try {
				if (System.Web.UI.HtmlControls.FindControl)
					this.d = function () {
						return System.Web.UI.HtmlControls.FindControl.apply(this, arguments);
					}
			} catch (ex) { }
			// Cretae function $(...) - Get objects by class name.
			this.$c = function () {
				return System.Web.UI.HtmlControls.FindControlsByClass.apply(this, arguments);
			}
		}
	
		// EXTENSIONS: Array
		Array.prototype.Clone = function () {
			var buffer = this.slice(0, this.length);
			for (var i = 0; i < this.length; i++) buffer[i] = this[i];
			return buffer;
		}

	}
}
System.Type.RegisterClass("System.Extensions");

// Make this class static.
System.Extensions = new System.Extensions();
// Use this to apply extensions to current context.
// System.Extensions.Apply.apply(this);


//=============================================================================
// System.Math
//-----------------------------------------------------------------------------

//=============================================================================
// Random
//-----------------------------------------------------------------------------

System.Random = function () {
	/// <summary>
	/// Initializes a new instance of the Random class, using a time-dependent default
	/// seed value.
	/// </summary>
	//---------------------------------------------------------

	this.Next = function (minValue, maxValue) {

		switch (arguments.length) {
			case 0:
				maxValue = Math.pow(2, 31);
				minValue = 0;
				break;
			case 1:
				maxValue = arguments[0];
				minValue = 0;
				break;
			case 2:
				break;
			default:
				return 0;
				break;
		}
		var number = minValue;
		if (maxValue > minValue) {
			number = Math.floor(Math.random() * (maxValue - minValue)) + minValue;
		}
		return number;
	}

	this.InitializeClass = function () {
	}
	this.InitializeClass.apply(this, arguments);
}
System.Type.RegisterClass("System.Random");




System.Array = function () {

	this.Initialize = function () {
	}
	this.Initialize.apply(this, arguments);
}
System.Type.RegisterClass("System.Array");

// Add static method.
System.Array.Reverse = function (array, index, length) {
	/// <summary>
	/// Reverses the sequence of the elements in a range of elements in the one-dimensional
	/// </summary>
	/// <param name="array">The one-dimensional System.Array to reverse.</param>
	/// <param name="index">The starting index of the section to reverse.</param>
	/// <param name="length">The number of elements in the section to reverse.</param>
	index = (index) ? index : 0;
	length = (length) ? length : array.length;
	// Make a copy of reversed block.
	var iArray = array.slice(index, index + length).reverse();
	for (var i = 0; i < length; i++) array[i + index] = iArray[i];
}

// Add static method.
System.Array._Copy1 = function (sourceArray, destinationArray, length) {
	/// <summary>
	/// Copy array
	/// </summary>
	for (var i = 0; i < length; i++) {
		destinationArray[i] = sourceArray[i];
	}
}

// Add static method.
System.Array._Copy2 = function (sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
	/// <summary>
	/// Copy array
	/// </summary>
	for (var i = 0; i < length; i++) {
		destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
	}
}

System.Array.Copy = function () {
	if (arguments.length == 3) System.Array._Copy1.apply(this, arguments);
	if (arguments.length == 5) System.Array._Copy2.apply(this, arguments);
}

System.Array.FillMultiDimensional = function (array, dimensions, value) {
	var x;
	if (dimensions.length > 0) {
		for (x = 0; x < array.length; x++) {
			var ar = new Array(dimensions[0]);
			var dims = dimensions.slice(1);
			System.Array.FillMultiDimensional(ar, dims, value);
			array[x] = ar;
		}
	} else {
		// if this array is placed at last level.
		for (x = 0; x < array.length; x++) {
			// set default value.
			array[x] = value;
		}
	}
	return array;
}

System.Array.GetMultiDimensional = function (dimensions, value) {
	/// <sumary>
	/// Get multi-dimensional array with default values.
	/// </summary>
	/// <param name="dimensions" type="int[]">List of dimension sizes.</param>
	/// <param name="value">Default value of array.</param>
	/// <example>
	/// Get 16x16 array filled with zeroes.
	/// var matrix = System.Array.GetMultiDimensional([16,16] ,0);
	/// </example>
	var array = new Array(dimensions[0]);
	return System.Array.FillMultiDimensional(array, dimensions.slice(1), value);
}


//=============================================================================
// System.Buffer
//-----------------------------------------------------------------------------

System.Buffer = function () {
	//---------------------------------------------------------
	this.Initialize = function () {
	}
	this.Initialize.apply(this, arguments);
}
System.Type.RegisterClass("System.Buffer");

// Add static method.
System.Buffer.BlockCopy = function (src, srcOffset, dst, dstOffset, count) {
	/// <summary>
	/// Copies a specified number of bytes from a source array starting at a particular
	/// offset to a destination array starting at a particular offset.
	/// </summary>
	/// <param name="src">The source buffer.</param>
	/// <param name="srcOffset">The byte offset into src.</param>
	/// <param name="dst">The destination buffer.</param>
	/// <param name="dstOffset">The byte offset into dst.</param>
	/// <param name="count">The number of bytes to copy.</param>
	for (var i = 0; i < count; i++) {
		dst[dstOffset + i] = src[srcOffset + i];
	}
}

//=============================================================================
// System.Byte[]
//-----------------------------------------------------------------------------

System.Byte = function () {
	/// <summary>
	/// Get array of bytes.
	/// </summary>
	/// <example>
	/// To get one-dimentional array:
	///     var bytes = new System.Bytes(16);
	/// To get multi-dimentional array:
	///     var x = 3; y = 5; z = 2; ...
	///     var bytes = new System.Bytes(x, y, z, ...);
	/// To get value from multi-dimentional array:
	///     var value = bytes[0][2][1];
	/// It's same as in C#
	/// </example>
	// Convert arguments to dimensions array.
	var dims = new Array();
	for (var i = 0; i < arguments.length; i++) {
		dims.push(arguments[i]);
	}
	// Return multi-dimensional array filles with zeroes.
	return System.Array.GetMultiDimensional(dims, 0);
}
System.Type.RegisterClass("System.Byte");

System.Extensions.Apply.apply(this);

//==============================================================================
// END
//------------------------------------------------------------------------------
//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//-----------------------------------------------------------------------------
// You can include this script on both sides - server and client:
// Server: <!-- #INCLUDE FILE="ScriptFile.js" -->
// Client: <script type="text/javascript" src="ScriptFile.js"></script>
//-----------------------------------------------------------------------------
// Warning: Be careful about what code you include in such way. Since the  code
// will be passed to the client side as simple text, your code can be  seen  by
// anyone who wants. Never do this with  scripts  which  contain  any  kind  of
// passwords, database connection strings, or SQL queries.
//=============================================================================
/// <reference path="System.debug.js" />
/// <reference name="System.Text.js" assembly="System.Text" />
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.Text</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------

System.Type.RegisterNamespace("System.Text");


//=============================================================================
// CLASS: Encoding
//-----------------------------------------------------------------------------

System.Text.Encoding = function () { }

//=============================================================================
// CLASS: Encoder.UTF8
//-----------------------------------------------------------------------------

// UTF-8, a transformation format of ISO 10646:
// http://www.ietf.org/rfc/rfc3629.txt
// Transformation:
// http://www.czyborra.com/utf/
//
//   The table below summarizes the format of these different octet types.
//   The letter x indicates bits available for encoding bits of the
//   character number.
//
//    Char. number range   |        UTF-8 octet sequence
//       (hexadecimal)     |              (binary)
//   ----------------------+---------------------------------------------
//   0000 0000 - 0000 007F | 0xxxxxxx
//   0000 0080 - 0000 07FF | 110xxxxx 10xxxxxx
//   0000 0800 - 0000 FFFF | 1110xxxx 10xxxxxx 10xxxxxx
//   0001 0000 - 0010 FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

System.Text.UTF8Encoder = function(){

	//---------------------------------------------------------
	this.GetBytes = function(s){
		/// <summary>
		/// Get array of bytes.
		/// </summary>
		var bytes = new Array();
		var c = new Number;
		for (var i = 0; i < s.length; i++){
			c = s.charCodeAt(i);
			// Convert char code to bytes.
			if (c < 0x80){
				bytes.push(c);
			} else if (c < 0x800) {
				bytes.push(0xC0 | c>>6);
				bytes.push(0x80 | c & 0x3F);
			} else if (c < 0x10000) {
				bytes.push(0xE0 | c>>12);
				bytes.push(0x80 | c>>6 & 0x3F);
				bytes.push(0x80 | c & 0x3F);
			} else if (c < 0x200000) {
				bytes.push(0xF0 | c>>18);
				bytes.push(0x80 | c>>12 & 0x3F);
				bytes.push(0x80 | c>>6 & 0x3F);
				bytes.push(0x80 | c & 0x3F);
			} else {
				// If char is unknown then push "?".
				bytes.push(0x3F);
			}
		}
		return bytes;
	}

	//---------------------------------------------------------
	this.InitializeClass = function(){
	}
	this.InitializeClass();
}
System.Type.RegisterClass("System.Text.UTF8Encoder");

// Make it static.
System.Text.Encoding.UTF8 = new System.Text.UTF8Encoder();


//==============================================================================
// END
//------------------------------------------------------------------------------
//<!--//--><%
//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//-----------------------------------------------------------------------------
// You can include this script on both sides - server and client:
// Server: <!-- #INCLUDE FILE="ScriptFile.js" -->
// Client: <script type="text/javascript" src="ScriptFile.js"></script>
//-----------------------------------------------------------------------------
// Warning: Be careful about what code you include in such way. Since the  code
// will be passed to the client side as simple text, your code can be  seen  by
// anyone who wants. Never do this with  scripts  which  contain  any  kind  of
// passwords, database connection strings, or SQL queries.
//=============================================================================

/// <reference name="System.Convert.js" assembly="System.Convert" />

//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.Convert</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------

/// <reference path="System.debug.js" />

System.Type.RegisterNamespace("System.Convert");
//=============================================================================

System.Convert.Base64Array = function(){
	/// <summary>
	/// Array which makes base64 encoding and decoding faster.
	/// </ summary>
	// Declare string of available chars inside base64.
	this.S = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	this.CA = new Array();
	this.IA = new Array();
	//---------------------------------------------------------
	// INIT: Class
	//---------------------------------------------------------
	this.InitializeClass = function(){
		var c = new String;
		for (var i = 0; i < this.S.length; i++) {
			c = this.S.charAt(i);
			this.CA[i] = c;
			this.IA[c] = i;
		}
	}
	this.InitializeClass();
}

System.Convert.ToBase64String = function(b, wrap){
	/// <summary>
	/// Converts the value of an array of 8-bit unsigned integers to its equivalent
	/// System.String representation encoded with base 64 digits.
	/// </summary>
	/// <param type="byte[]" name="b">An array of 8-bit unsigned integers.</param>
	/// <param type="bool" name="wrap">Wrap base64 string with '\r\n' separator.</param>
	/// <returns type="string">
	/// The System.String representation, in base 64, of the contents of inArray.
	/// </returns>
	/// <remarks>
	/// A very fast and memory efficient class to encode and decode to and from BASE64
	/// in full accordance with RFC 2045. Based on http://migbase64.sourceforge.net/
	/// Converted to JavaScript by Evaldas Jocys [evaldas@jocys.com], http://www.jocys.com
	/// </remarks>
	var B64 = new System.Convert.Base64Array();
	// Check special case
	var bLen = (b) ? b.length : 0;
	if (bLen == 0) return new Array(0);
	// Length of even 24-bits.
	var eLen = Math.floor(bLen / 3) * 3;
	// Returned character count.
	var cCnt = ((bLen - 1) / 3 + 1) << 2;   
	var dLen = cCnt + (wrap ? (cCnt - 1) / 76 << 1 : 0); // Length of returned array
	var dArr = new Array(dLen);
	// Encode even 24-bits.
	for (var s = 0, d = 0, cc=0; s < eLen;) {
		// Copy next three bytes into lower 24 bits of int, paying attension to sign.
		var i = (b[s++] & 0xff) << 16 | (b[s++] & 0xff) << 8 | (b[s++] & 0xff);
		// Encode the int into four chars.
		dArr[d++] = B64.CA[(i >>> 18) & 0x3f];
		dArr[d++] = B64.CA[(i >>> 12) & 0x3f];
		dArr[d++] = B64.CA[(i >>> 6) & 0x3f];
		dArr[d++] = B64.CA[i & 0x3f];
		// Add optional line separator as specified in RFC 2045.
		if (wrap && ++cc == 19 && d < dLen - 2) {
			dArr[d++] = '\r';
			dArr[d++] = '\n';
			cc = 0;
		}
	}
	// Pad and encode last bits if source isn't even 24 bits.
	var left = bLen - eLen; // 0 - 2.
	if (left > 0) {
		// Prepare the int.
		var j = ((b[eLen] & 0xff) << 10) | (left == 2 ? ((b[bLen - 1] & 0xff) << 2) : 0);
		// Set last four chars.
		dArr[dLen - 4] = B64.CA[j >> 12];
		dArr[dLen - 3] = B64.CA[(j >>> 6) & 0x3f];
		dArr[dLen - 2] = (left == 2) ? B64.CA[j & 0x3f] : '=';
		dArr[dLen - 1] = '=';
	}
	return dArr.join("");
}

System.Convert.FromBase64String = function(s, fix){
	/// <summary>
	/// Converts the specified System.String, which encodes binary data as base 64
	/// digits, to an equivalent 8-bit unsigned integer array.
	/// </summary>
	/// <param type="string" name="s">A string.</param>
	/// <param type="bool" name="fix">Fix base64 string by removing all ilegal chars.</param>
	/// <returns type="byte[]">
	/// An array of 8-bit unsigned integers equivalent to s.
	/// </returns>
	/// <remarks>
	/// A very fast and memory efficient class to encode and decode to and from BASE64
	/// in full accordance with RFC 2045. Based on http://migbase64.sourceforge.net/
	/// Converted to JavaScript by Evaldas Jocys [evaldas@jocys.com], http://www.jocys.com
	/// </remarks>
	var B64 = new System.Convert.Base64Array();
	// Check special case
	if (fix){
		// Remove illegal chars
		var regex = new RegExp("[^"+B64.S+"]","g");
		s = s.replace(regex,"");
	}
	var sLen = s.length;
	if (sLen == 0) return new Array(0);
	// Start and end index after trimming.
	var sIx = 0, eIx = sLen - 1;
	// Get the padding count (=) (0, 1 or 2).
	var pad = s.charAt(eIx) == '=' ? (s.charAt(eIx - 1) == '=' ? 2 : 1) : 0;  // Count '=' at end.
	// Content count including possible separators.
	var cCnt = eIx - sIx + 1;
	var sepLn = (s.charAt(76) == '\r') ? (cCnt / 78) : 0;
	var sepCnt = sLen > 76 ? (sepLn << 1) : 0;
	// The number of decoded bytes.
	var len = ((cCnt - sepCnt) * 6 >> 3) - pad;
	// Preallocate byte[] of exact length.
	var bytes = new Array(len);       
	// Decode all but the last 0 - 2 bytes.
	var d = 0;
	var eLen = Math.floor(len / 3) * 3;
	var i;
	for (var cc = 0; d < eLen;){
		// Assemble three bytes into an var from four "valid" characters.
		i = B64.IA[s.charAt(sIx++)] << 18 |
			B64.IA[s.charAt(sIx++)] << 12 |
			B64.IA[s.charAt(sIx++)] << 6 |
			B64.IA[s.charAt(sIx++)];
		// Add the bytes
		bytes[d++] = (i >> 16);
		bytes[d++] = ((i & 0xFFFF) >> 8);
		bytes[d++] = (i & 0xFF);
		// If line separator, jump over it.
		if (sepCnt > 0 && ++cc == 19) {
			sIx += 2;
			cc = 0;
		}
	}
	if (d < len) {
		// Decode last 1-3 bytes (incl '=') into 1-3 bytes.
		i = 0;
		for (var j = 0; sIx <= (eIx - pad); j++){
			i |= B64.IA[s.charAt(sIx++)] << (18 - j * 6);
		}
		for (var r = 16; d < len; r -= 8){
			var cropBits = Math.pow(2,r+8)-1;
			bytes[d++] = ((i & cropBits) >> r);
		}
	}
	return bytes;
}


//==============================================================================
// END
//------------------------------------------------------------------------------
//%>
//<!--//--><%
//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//-----------------------------------------------------------------------------
// You can include this script on both sides - server and client:
// Server: <!-- #INCLUDE FILE="ScriptFile.js" -->
// Client: <script type="text/javascript" src="ScriptFile.js"></script>
//-----------------------------------------------------------------------------
// Warning: Be careful about what code you include in such way. Since the  code
// will be passed to the client side as simple text, your code can be  seen  by
// anyone who wants. Never do this with  scripts  which  contain  any  kind  of
// passwords, database connection strings, or SQL queries.
//=============================================================================

/// <reference name="System.BigInt.js" assembly="System" />

//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------
System.Type.RegisterNamespace("System");
//=============================================================================


//=============================================================================
// Extensions
//-----------------------------------------------------------------------------
System.BigInt = function(){};

System.BigInt._Utils = function() {


	//globals
	var bpe = 0;         //bits stored per array element
	var mask = 0;        //AND this with an array element to chop it down to bpe bits
	var radix = 0;
	
	//the following global variables are scratchpad memory to 
	//reduce dynamic memory allocation in the inner loop
	t = new Array(0);
	ss = t;       //used in mult_()
	s0 = t;       //used in multMod_(), squareMod_() 
	s1 = t;       //used in powMod_(), multMod_(), squareMod_() 
	s2 = t;       //used in powMod_(), multMod_()
	s3 = t;       //used in powMod_()
	s4 = t; s5 = t; //used in mod_()
	s6 = t;       //used in bigInt2str()
	s7 = t;       //used in powMod_()
	T = t;        //used in GCD_()
	sa = t;       //used in mont_()
	mr_x1 = t; mr_r = t; mr_a = t;                                      //used in millerRabin()
	eg_v = t; eg_u = t; eg_A = t; eg_B = t; eg_C = t; eg_D = t;               //used in eGCD_(), inverseMod_()
	md_q1 = t; md_q2 = t; md_q3 = t; md_r = t; md_r1 = t; md_r2 = t; md_tt = t; //used in mod_()

	primes = t; pows = t; s_i = t; s_i2 = t; s_R = t; s_rm = t; s_q = t; s_n1 = t;
	s_a = t; s_r2 = t; s_n = t; s_b = t; s_d = t; s_x1 = t; s_x2 = t, s_aa = t; //used in randTruePrime_()

	rpprb = t; //used in randProbPrimeRounds() (which also uses "primes")

	////////////////////////////////////////////////////////////////////////////////////////


	//return a copy of x with at least n elements, adding leading zeros if needed
	function expand(x, n) {
		var ans = int2bigInt(0, (x.length > n ? x.length : n) * bpe, 0);
		copy_(ans, x);
		return ans;
	}


	//return (x**y mod n) where x,y,n are bigInts and ** is exponentiation.  0**0=1. Faster for odd n.
	function powMod(x, y, n) {
		var ans = expand(x, n.length);
		powMod_(ans, trim(y, 2), trim(n, 2), 0);  //this should work without the trim, but doesn't
		return trim(ans, 1);
	}


	//return x**(-1) mod n, for integers x and n.  Return 0 if there is no inverse
	function inverseModInt(x, n) {
		var a = 1, b = 0, t;
		for (; ; ) {
			if (x == 1) return a;
			if (x == 0) return 0;
			b -= a * Math.floor(n / x);
			n %= x;

			if (n == 1) return b; //to avoid negatives, change this b to n-b, and each -= to +=
			if (n == 0) return 0;
			a -= b * Math.floor(x / n);
			x %= n;
		}
	}



	//is bigInt x negative?
	function negative(x) {
		return ((x[x.length - 1] >> (bpe - 1)) & 1);
	}



	//is (x << (shift*bpe)) > y?
	//x and y are nonnegative bigInts
	//shift is a nonnegative integer
	function greaterShift(x, y, shift) {
		var i, kx = x.length, ky = y.length;
		k = ((kx + shift) < ky) ? (kx + shift) : ky;
		for (i = ky - 1 - shift; i < kx && i >= 0; i++)
			if (x[i] > 0)
			return 1; //if there are nonzeros in x to the left of the first column of y, then x is bigger
		for (i = kx - 1 + shift; i < ky; i++)
			if (y[i] > 0)
			return 0; //if there are nonzeros in y to the left of the first column of x, then x is not bigger
		for (i = k - 1; i >= shift; i--)
			if (x[i - shift] > y[i]) return 1;
		else if (x[i - shift] < y[i]) return 0;
		return 0;
	}

	//is x > y? (x and y both nonnegative)
	function greater(x, y) {
		var i;
		var k = (x.length < y.length) ? x.length : y.length;

		for (i = x.length; i < y.length; i++)
			if (y[i])
			return 0;  //y has more digits

		for (i = y.length; i < x.length; i++)
			if (x[i])
			return 1;  //x has more digits

		for (i = k - 1; i >= 0; i--)
			if (x[i] > y[i])
			return 1;
		else if (x[i] < y[i])
			return 0;
		return 0;
	}

	//divide x by y giving quotient q and remainder r.  (q=floor(x/y),  r=x mod y).  All 4 are bigints.
	//x must have at least one leading zero element.
	//y must be nonzero.
	//q and r must be arrays that are exactly the same length as x. (Or q can have more).
	//Must have x.length >= y.length >= 2.
	function divide_(x, y, q, r) {
		var kx, ky;
		var i, j, y1, y2, c, a, b;
		copy_(r, x);
		for (ky = y.length; y[ky - 1] == 0; ky--); //ky is number of elements in y, not including leading zeros

		//normalize: ensure the most significant element of y has its highest bit set  
		b = y[ky - 1];
		for (a = 0; b; a++)
			b >>= 1;
		a = bpe - a;  //a is how many bits to shift so that the high order bit of y is leftmost in its array element
		leftShift_(y, a);  //multiply both by 1<<a now, then divide both by that at the end
		leftShift_(r, a);

		//Rob Visser discovered a bug: the following line was originally just before the normalization.
		for (kx = r.length; r[kx - 1] == 0 && kx > ky; kx--); //kx is number of elements in normalized x, not including leading zeros

		copyInt_(q, 0);                      // q=0
		while (!greaterShift(y, r, kx - ky)) {  // while (leftShift_(y,kx-ky) <= r) {
			subShift_(r, y, kx - ky);             //   r=r-leftShift_(y,kx-ky)
			q[kx - ky]++;                       //   q[kx-ky]++;
		}                                   // }

		for (i = kx - 1; i >= ky; i--) {
			if (r[i] == y[ky - 1])
				q[i - ky] = mask;
			else
				q[i - ky] = Math.floor((r[i] * radix + r[i - 1]) / y[ky - 1]);

			//The following for(;;) loop is equivalent to the commented while loop, 
			//except that the uncommented version avoids overflow.
			//The commented loop comes from HAC, which assumes r[-1]==y[-1]==0
			//  while (q[i-ky]*(y[ky-1]*radix+y[ky-2]) > r[i]*radix*radix+r[i-1]*radix+r[i-2])
			//    q[i-ky]--;    
			for (; ; ) {
				y2 = (ky > 1 ? y[ky - 2] : 0) * q[i - ky];
				c = y2 >> bpe;
				y2 = y2 & mask;
				y1 = c + q[i - ky] * y[ky - 1];
				c = y1 >> bpe;
				y1 = y1 & mask;

				if (c == r[i] ? y1 == r[i - 1] ? y2 > (i > 1 ? r[i - 2] : 0) : y1 > r[i - 1] : c > r[i])
					q[i - ky]--;
				else
					break;
			}

			linCombShift_(r, y, -q[i - ky], i - ky);    //r=r-q[i-ky]*leftShift_(y,i-ky)
			if (negative(r)) {
				addShift_(r, y, i - ky);         //r=r+leftShift_(y,i-ky)
				q[i - ky]--;
			}
		}

		rightShift_(y, a);  //undo the normalization step
		rightShift_(r, a);  //undo the normalization step
	}

	//do carries and borrows so each element of the bigInt x fits in bpe bits.
	function carry_(x) {
		var i, k, c, b;
		k = x.length;
		c = 0;
		for (i = 0; i < k; i++) {
			c += x[i];
			b = 0;
			if (c < 0) {
				b = -(c >> bpe);
				c += b * radix;
			}
			x[i] = c & mask;
			c = (c >> bpe) - b;
		}
	}

	//return x mod n for bigInt x and integer n.
	function modInt(x, n) {
		var i, c = 0;
		for (i = x.length - 1; i >= 0; i--)
			c = (c * radix + x[i]) % n;
		return c;
	}

	//convert the integer t into a bigInt with at least the given number of bits.
	//the returned array stores the bigInt in bpe-bit chunks, little endian (buff[0] is least significant word)
	//Pad the array with leading zeros so that it has at least minSize elements.
	//There will always be at least one leading 0 element.
	function int2bigInt(t, bits, minSize) {
		var i, k;
		k = Math.ceil(bits / bpe) + 1;
		k = minSize > k ? minSize : k;
		buff = new Array(k);
		copyInt_(buff, t);
		return buff;
	}

	//is the bigInt x equal to zero?
	function isZero(x) {

		var i;
		for (i = 0; i < x.length; i++)
			if (x[i])
			return 0;
		return 1;
	}

	//returns a duplicate of bigInt x
	function dup(x) {
		var i;
		buff = new Array(x.length);
		copy_(buff, x);
		return buff;
	}

	//do x=y on bigInts x and y.  x must be an array at least as big as y (not counting the leading zeros in y).
	function copy_(x, y) {
		var i;
		var k = x.length < y.length ? x.length : y.length;
		for (i = 0; i < k; i++)
			x[i] = y[i];
		for (i = k; i < x.length; i++)
			x[i] = 0;
	}

	//do x=y on bigInt x and integer y.  
	function copyInt_(x, n) {

		var i, c;
		for (c = n, i = 0; i < x.length; i++) {
			x[i] = c & mask;
			c >>= bpe;
		}
	}

	//do x=x+n where x is a bigInt and n is an integer.
	//x must be large enough to hold the result.
	function addInt_(x, n) {
		var i, k, c, b;
		x[0] += n;
		k = x.length;
		c = 0;
		for (i = 0; i < k; i++) {
			c += x[i];
			b = 0;
			if (c < 0) {
				b = -(c >> bpe);
				c += b * radix;
			}
			x[i] = c & mask;
			c = (c >> bpe) - b;
			if (!c) return; //stop carrying as soon as the carry is zero
		}
	}

	//right shift bigInt x by n bits.  0 <= n < bpe.
	function rightShift_(x, n) {
		var i;
		var k = Math.floor(n / bpe);
		if (k) {
			for (i = 0; i < x.length - k; i++) //right shift x by k elements
				x[i] = x[i + k];
			for (; i < x.length; i++)
				x[i] = 0;
			n %= bpe;
		}
		for (i = 0; i < x.length - 1; i++) {
			x[i] = mask & ((x[i + 1] << (bpe - n)) | (x[i] >> n));
		}
		x[i] >>= n;
	}

	//left shift bigInt x by n bits.
	function leftShift_(x, n) {
		var i;
		var k = Math.floor(n / bpe);
		if (k) {
			for (i = x.length; i >= k; i--) //left shift x by k elements
				x[i] = x[i - k];
			for (; i >= 0; i--)
				x[i] = 0;
			n %= bpe;
		}
		if (!n)
			return;
		for (i = x.length - 1; i > 0; i--) {
			x[i] = mask & ((x[i] << n) | (x[i - 1] >> (bpe - n)));
		}
		x[i] = mask & (x[i] << n);
	}
	
	//do x=x*n where x is a bigInt and n is an integer.
	//x must be large enough to hold the result.
	function multInt_(x, n) {
		var i, k, c, b;
		if (!n)
			return;
		k = x.length;
		c = 0;
		for (i = 0; i < k; i++) {
			c += x[i] * n;
			b = 0;
			if (c < 0) {
				b = -(c >> bpe);
				c += b * radix;
			}
			x[i] = c & mask;
			c = (c >> bpe) - b;
		}
	}

	//do x=floor(x/n) for bigInt x and integer n, and return the remainder
	function divInt_(x, n) {
		var i, r = 0, s;
		for (i = x.length - 1; i >= 0; i--) {
			s = r * radix + x[i];
			x[i] = Math.floor(s / n);
			r = s % n;
		}
		return r;
	}
	
	//do the linear combination x=a*x+b*(y<<(ys*bpe)) for bigInts x and y, and integers a, b and ys.
	//x must be large enough to hold the answer.
	function linCombShift_(x, y, b, ys) {
		var i, c, k, kk;
		k = x.length < ys + y.length ? x.length : ys + y.length;
		kk = x.length;
		for (c = 0, i = ys; i < k; i++) {
			c += x[i] + b * y[i - ys];
			x[i] = c & mask;
			c >>= bpe;
		}
		for (i = k; c && i < kk; i++) {
			c += x[i];
			x[i] = c & mask;
			c >>= bpe;
		}
	}

	//do x=x mod n for bigInts x and n.
	function mod_(x, n) {
		if (s4.length != x.length)
			s4 = dup(x);
		else
			copy_(s4, x);
		if (s5.length != x.length)
			s5 = dup(x);
		divide_(s4, n, s5, x);  //x = remainder of s4 / n
	}

	//do x=x*y mod n for bigInts x,y,n.
	//for greater speed, let y<x.
	function multMod_(x, y, n) {
		var i;
		if (s0.length != 2 * x.length)
			s0 = new Array(2 * x.length);
		copyInt_(s0, 0);
		for (i = 0; i < y.length; i++)
			if (y[i])
			linCombShift_(s0, x, y[i], i);   //s0=1*s0+y[i]*(x<<(i*bpe))
		mod_(s0, n);
		copy_(x, s0);
	}

	//return x with exactly k leading zero elements
	function trim(x, k) {
		var i, y;
		for (i = x.length; i > 0 && !x[i - 1]; i--);
		y = new Array(i + k);
		copy_(y, x);
		return y;
	}

	//do x=x**y mod n, where x,y,n are bigInts and ** is exponentiation.  0**0=1.
	//this is faster when n is odd.  x usually needs to have as many elements as n.
	function powMod_(x, y, n) {
		var k1, k2, kn, np;
		if (s7.length != n.length)
			s7 = dup(n);

		//for even modulus, use a simple square-and-multiply algorithm,
		//rather than using the more complex Montgomery algorithm.
		if ((n[0] & 1) == 0) {
			copy_(s7, x);
			copyInt_(x, 1);
			while (!equalsInt(y, 0)) {
				if (y[0] & 1)
					multMod_(x, s7, n);
				divInt_(y, 2);
				squareMod_(s7, n);
			}
			return;
		}

		//calculate np from n for the Montgomery multiplications
		copyInt_(s7, 0);
		for (kn = n.length; kn > 0 && !n[kn - 1]; kn--);
		np = radix - inverseModInt(modInt(n, radix), radix);
		s7[kn] = 1;
		multMod_(x, s7, n);   // x = x * 2**(kn*bp) mod n

		if (s3.length != x.length)
			s3 = dup(x);
		else
			copy_(s3, x);

		for (k1 = y.length - 1; k1 > 0 & !y[k1]; k1--);  //k1=first nonzero element of y
		if (y[k1] == 0) {  //anything to the 0th power is 1
			copyInt_(x, 1);
			return;
		}
		for (k2 = 1 << (bpe - 1); k2 && !(y[k1] & k2); k2 >>= 1);  //k2=position of first 1 bit in y[k1]
		for (; ; ) {
			if (!(k2 >>= 1)) {  //look at next bit of y
				k1--;
				if (k1 < 0) {
					mont_(x, one, n, np);
					return;
				}
				k2 = 1 << (bpe - 1);
			}
			mont_(x, x, n, np);

			if (k2 & y[k1]) //if next bit is a 1
				mont_(x, s3, n, np);
		}
	}

	//do x=x*y*Ri mod n for bigInts x,y,n, 
	//  where Ri = 2**(-kn*bpe) mod n, and kn is the 
	//  number of elements in the n array, not 
	//  counting leading zeros.  
	//x array must have at least as many elemnts as the n array
	//It's OK if x and y are the same variable.
	//must have:
	//  x,y < n
	//  n is odd
	//  np = -(n^(-1)) mod radix
	function mont_(x, y, n, np) {
		var i, j, c, ui, t, ks;
		var kn = n.length;
		var ky = y.length;

		if (sa.length != kn)
			sa = new Array(kn);

		copyInt_(sa, 0);

		for (; kn > 0 && n[kn - 1] == 0; kn--); //ignore leading zeros of n
		for (; ky > 0 && y[ky - 1] == 0; ky--); //ignore leading zeros of y
		ks = sa.length - 1; //sa will never have more than this many nonzero elements.  

		//the following loop consumes 95% of the runtime for randTruePrime_() and powMod_() for large numbers
		for (i = 0; i < kn; i++) {
			t = sa[0] + x[i] * y[0];
			ui = ((t & mask) * np) & mask;  //the inner "& mask" was needed on Safari (but not MSIE) at one time
			c = (t + ui * n[0]) >> bpe;
			t = x[i];

			//do sa=(sa+x[i]*y+ui*n)/b   where b=2**bpe.  Loop is unrolled 5-fold for speed
			j = 1;
			for (; j < ky - 4; ) {
				c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
				c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
				c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
				c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
				c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
			}
			for (; j < ky; ) { c += sa[j] + ui * n[j] + t * y[j]; sa[j - 1] = c & mask; c >>= bpe; j++; }
			for (; j < kn - 4; ) {
				c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
				c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
				c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
				c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
				c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++;
			}
			for (; j < kn; ) { c += sa[j] + ui * n[j]; sa[j - 1] = c & mask; c >>= bpe; j++; }
			for (; j < ks; ) { c += sa[j]; sa[j - 1] = c & mask; c >>= bpe; j++; }
			sa[j - 1] = c & mask;
		}

		if (!greater(n, sa))
			sub_(sa, n);
		copy_(x, sa);
	}

	this.ToArray = function(x, base) {
		var i, t;
		var s = new Array();
		if (s6.length != x.length)
			s6 = dup(x);
		else
			copy_(s6, x);

		if (base == -1) { //return the list of array contents
			for (i = 0; i < x.length; i++) s.push(x[i]);
		}
		else { //return it in the given base
			while (!isZero(s6)) {
				t = divInt_(s6, base);  //t=s6 % base; s6=floor(s6/base);
				s.push(t);
			}
		}
		if (s.length == 0) s.push(0);
		return s;
	}

	this.FromArray = function(s, base, minSize) {
		var d, i, x, y, kk;

		var k = s.length;
		x = int2bigInt(0, base * k, 0);
		for (i = 0; i < k; i++) {
			d = s[i];
			if (d >= base || d < 0) {   //stop at first illegal character
				break;
			}
			multInt_(x, base);
			addInt_(x, d);
		}

		for (k = x.length; k > 0 && !x[k - 1]; k--); //strip off leading zeros
		k = minSize > k + 1 ? minSize : k + 1;
		y = new Array(k);
		kk = k < x.length ? k : x.length;
		for (i = 0; i < kk; i++)
			y[i] = x[i];
		for (; i < k; i++)
			y[i] = 0;
		return y;
	}
	
	var greater2 = greater;
	
	greater = function(x, y){
	
		return greater2(x, y) == 1; 
	
	}
	
	this.ToBytes = function(x){ return this.ToArray(x, 256); }
	this.FromBytes = function(bytes){ return this.FromArray(bytes, 256, 0); }

	this._initialize = function(){

		this.ElementSize = bpe;
		this.ElementMask = mask;
		this.ElementRadix = radix;
	
		radix = mask + 1;  //equals 2^bpe.  A single 1 bit to the left of the last bit of mask.
		//the digits for converting to different bases
		digitsStr = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz_=!@#$%^&*()[]{}|;:,.<>/?`~ \\\'\"+-';

		//initialize the global variables
		for (bpe = 0; (1 << (bpe + 1)) > (1 << bpe); bpe++);  //bpe=number of bits in the mantissa on this platform
		bpe >>= 1;                   //bpe=number of bits in one element of the array representing the bigInt
		mask = (1 << bpe) - 1;           //AND the mask with an integer to get its bpe least significant bits
		radix = mask + 1;              //2^bpe.  a single 1 bit to the left of the first bit of mask
		one = int2bigInt(1, 1, 1);     //constant used in powMod_()
	
		this.Clone = dup;
		this.Expand = expand;
		this.MoreThan = greater;
		this.MoreThanShitf = greaterShift;
		this.FromInt = int2bigInt;
		this.InverseModInt = inverseModInt;
		this.IsZero = isZero;
		this.ModInt = modInt;
		this.IsNegative = negative;
		this.PowMod = powMod;
		this.Trim = trim;

		this.AddInt_ = addInt_;
		this.Clone_ = copy_;
		this.CloneInt_ = copyInt_;
		this.Mod_ = mod_;
		this.MultiplyMod_ =multMod_; 
		this.PowMod_ = powMod_;

		this.Carry_ = carry_;
		this.Divide_ = divide_;
		this.DivideInt_ = divInt_;

		this.LeftShift_ = leftShift_;

		this.LinCombShift_ = linCombShift_;
		this.MontMultiply_ = mont_;
		this.MultiplyInt_ = multInt_;
		this.RightShift_ = rightShift_;

		
	}
	this._initialize.apply(this, arguments);

}

System.BigInt.Utils = new System.BigInt._Utils();


//==============================================================================
// END
//------------------------------------------------------------------------------
//%>
//<!--//--><%
//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//-----------------------------------------------------------------------------
// You can include this script on both sides - server and client:
// Server: <!-- #INCLUDE FILE="ScriptFile.js" -->
// Client: <script type="text/javascript" src="ScriptFile.js"></script>
//-----------------------------------------------------------------------------
// Warning: Be careful about what code you include in such way. Since the  code
// will be passed to the client side as simple text, your code can be  seen  by
// anyone who wants. Never do this with  scripts  which  contain  any  kind  of
// passwords, database connection strings, or SQL queries.
//=============================================================================

/// <reference name="System.Convert.js" assembly="System.Convert" />

//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.Convert</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------

/// <reference path="System.debug.js" />

System.Type.RegisterNamespace("System.Convert");
//=============================================================================

System.Convert.Base64Array = function(){
	/// <summary>
	/// Array which makes base64 encoding and decoding faster.
	/// </ summary>
	// Declare string of available chars inside base64.
	this.S = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	this.CA = new Array();
	this.IA = new Array();
	//---------------------------------------------------------
	// INIT: Class
	//---------------------------------------------------------
	this.InitializeClass = function(){
		var c = new String;
		for (var i = 0; i < this.S.length; i++) {
			c = this.S.charAt(i);
			this.CA[i] = c;
			this.IA[c] = i;
		}
	}
	this.InitializeClass();
}

System.Convert.ToBase64String = function(b, wrap){
	/// <summary>
	/// Converts the value of an array of 8-bit unsigned integers to its equivalent
	/// System.String representation encoded with base 64 digits.
	/// </summary>
	/// <param type="byte[]" name="b">An array of 8-bit unsigned integers.</param>
	/// <param type="bool" name="wrap">Wrap base64 string with '\r\n' separator.</param>
	/// <returns type="string">
	/// The System.String representation, in base 64, of the contents of inArray.
	/// </returns>
	/// <remarks>
	/// A very fast and memory efficient class to encode and decode to and from BASE64
	/// in full accordance with RFC 2045. Based on http://migbase64.sourceforge.net/
	/// Converted to JavaScript by Evaldas Jocys [evaldas@jocys.com], http://www.jocys.com
	/// </remarks>
	var B64 = new System.Convert.Base64Array();
	// Check special case
	var bLen = (b) ? b.length : 0;
	if (bLen == 0) return new Array(0);
	// Length of even 24-bits.
	var eLen = Math.floor(bLen / 3) * 3;
	// Returned character count.
	var cCnt = ((bLen - 1) / 3 + 1) << 2;   
	var dLen = cCnt + (wrap ? (cCnt - 1) / 76 << 1 : 0); // Length of returned array
	var dArr = new Array(dLen);
	// Encode even 24-bits.
	for (var s = 0, d = 0, cc=0; s < eLen;) {
		// Copy next three bytes into lower 24 bits of int, paying attension to sign.
		var i = (b[s++] & 0xff) << 16 | (b[s++] & 0xff) << 8 | (b[s++] & 0xff);
		// Encode the int into four chars.
		dArr[d++] = B64.CA[(i >>> 18) & 0x3f];
		dArr[d++] = B64.CA[(i >>> 12) & 0x3f];
		dArr[d++] = B64.CA[(i >>> 6) & 0x3f];
		dArr[d++] = B64.CA[i & 0x3f];
		// Add optional line separator as specified in RFC 2045.
		if (wrap && ++cc == 19 && d < dLen - 2) {
			dArr[d++] = '\r';
			dArr[d++] = '\n';
			cc = 0;
		}
	}
	// Pad and encode last bits if source isn't even 24 bits.
	var left = bLen - eLen; // 0 - 2.
	if (left > 0) {
		// Prepare the int.
		var j = ((b[eLen] & 0xff) << 10) | (left == 2 ? ((b[bLen - 1] & 0xff) << 2) : 0);
		// Set last four chars.
		dArr[dLen - 4] = B64.CA[j >> 12];
		dArr[dLen - 3] = B64.CA[(j >>> 6) & 0x3f];
		dArr[dLen - 2] = (left == 2) ? B64.CA[j & 0x3f] : '=';
		dArr[dLen - 1] = '=';
	}
	return dArr.join("");
}

System.Convert.FromBase64String = function(s, fix){
	/// <summary>
	/// Converts the specified System.String, which encodes binary data as base 64
	/// digits, to an equivalent 8-bit unsigned integer array.
	/// </summary>
	/// <param type="string" name="s">A string.</param>
	/// <param type="bool" name="fix">Fix base64 string by removing all ilegal chars.</param>
	/// <returns type="byte[]">
	/// An array of 8-bit unsigned integers equivalent to s.
	/// </returns>
	/// <remarks>
	/// A very fast and memory efficient class to encode and decode to and from BASE64
	/// in full accordance with RFC 2045. Based on http://migbase64.sourceforge.net/
	/// Converted to JavaScript by Evaldas Jocys [evaldas@jocys.com], http://www.jocys.com
	/// </remarks>
	var B64 = new System.Convert.Base64Array();
	// Check special case
	if (fix){
		// Remove illegal chars
		var regex = new RegExp("[^"+B64.S+"]","g");
		s = s.replace(regex,"");
	}
	var sLen = s.length;
	if (sLen == 0) return new Array(0);
	// Start and end index after trimming.
	var sIx = 0, eIx = sLen - 1;
	// Get the padding count (=) (0, 1 or 2).
	var pad = s.charAt(eIx) == '=' ? (s.charAt(eIx - 1) == '=' ? 2 : 1) : 0;  // Count '=' at end.
	// Content count including possible separators.
	var cCnt = eIx - sIx + 1;
	var sepLn = (s.charAt(76) == '\r') ? (cCnt / 78) : 0;
	var sepCnt = sLen > 76 ? (sepLn << 1) : 0;
	// The number of decoded bytes.
	var len = ((cCnt - sepCnt) * 6 >> 3) - pad;
	// Preallocate byte[] of exact length.
	var bytes = new Array(len);       
	// Decode all but the last 0 - 2 bytes.
	var d = 0;
	var eLen = Math.floor(len / 3) * 3;
	var i;
	for (var cc = 0; d < eLen;){
		// Assemble three bytes into an var from four "valid" characters.
		i = B64.IA[s.charAt(sIx++)] << 18 |
			B64.IA[s.charAt(sIx++)] << 12 |
			B64.IA[s.charAt(sIx++)] << 6 |
			B64.IA[s.charAt(sIx++)];
		// Add the bytes
		bytes[d++] = (i >> 16);
		bytes[d++] = ((i & 0xFFFF) >> 8);
		bytes[d++] = (i & 0xFF);
		// If line separator, jump over it.
		if (sepCnt > 0 && ++cc == 19) {
			sIx += 2;
			cc = 0;
		}
	}
	if (d < len) {
		// Decode last 1-3 bytes (incl '=') into 1-3 bytes.
		i = 0;
		for (var j = 0; sIx <= (eIx - pad); j++){
			i |= B64.IA[s.charAt(sIx++)] << (18 - j * 6);
		}
		for (var r = 16; d < len; r -= 8){
			var cropBits = Math.pow(2,r+8)-1;
			bytes[d++] = ((i & cropBits) >> r);
		}
	}
	return bytes;
}


//==============================================================================
// END
//------------------------------------------------------------------------------
//%>
//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//-----------------------------------------------------------------------------
// You can include this script on both sides - server and client:
// Server: <!-- #INCLUDE FILE="ScriptFile.js" -->
// Client: <script type="text/javascript" src="ScriptFile.js"></script>
//-----------------------------------------------------------------------------
// Warning: Be careful about what code you include in such way. Since the  code
// will be passed to the client side as simple text, your code can be  seen  by
// anyone who wants. Never do this with  scripts  which  contain  any  kind  of
// passwords, database connection strings, or SQL queries.
//=============================================================================
/// <reference path="System.debug.js" />
/// <reference name="System.Security.Cryptography.js" assembly="System.Security.Cryptography" />
//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.Security.Cryptography</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------
System.Type.RegisterNamespace("System.Security.Cryptography");
//=============================================================================

System.Security.Cryptography.CryptographicException = function(message){
	this.message = message;
	var err = Error.create(this.message, { name: this.GetType().FullName });
	err.popStackFrame();
	return err;
}
System.Type.RegisterClass("System.Security.Cryptography.CryptographicException");

System.Security.Cryptography.CryptographicException = function(message){
	this.message = message;
	this.toString = function(){ return this.name+": "+this.message; }
	var err = Error.create(this.message, { name: this.GetType().FullName });
	err.popStackFrame();
	return err;
}
System.Type.RegisterClass("System.Security.Cryptography.CryptographicException");


System.Security.Cryptography.ICryptoTransform = function (algorithm, encryption, rgbIV) {
	/// <summary>
	/// Defines the basic operations of cryptographic transformations.
	/// </summary>
	//---------------------------------------------------------
	// Private Properties.
	//var iv = new Array;
	var algo = null;
	var encrypt = false;
	var blockSizeByte = 0;
	var temp = new Array;
	var temp2 = new Array;
	//var workBuff = new Array;
	//var workout = new Array;
	var feedBackByte = 0;
	var feedBackIter = 0;
	//var m_disposed = false;
	//var lastBlock = false;
	var _rng;
	//---------------------------------------------------------
	// Public Properties.
	this.InputBlockSize = 0;
	this.OutputBlockSize = 0;
	this.CanTransformMultipleBlocks = true;
	this.CanReuseTransform = false;
	//---------------------------------------------------------
	this._Transform = function (input, output) {
		/// <summary>
		/// </summary>
		/// <param type="byte[]" name="input"></param>
		/// <param type="byte[]" name="output"></param>
		/// <remarks>
		/// Each block MUST be BlockSizeValue in size!!!
		/// i.e. Any padding must be done before calling this method
		/// </remarks>
		switch (algo.Mode) {
			case System.Security.Cryptography.CipherMode.ECB:
				ECB(input, output);
				break;
			case System.Security.Cryptography.CipherMode.CBC:
				CBC(input, output);
				break;
			case System.Security.Cryptography.CipherMode.CFB:
				CFB(input, output);
				break;
			case System.Security.Cryptography.CipherMode.OFB:
				OFB(input, output);
				break;
			case System.Security.Cryptography.CipherMode.CTS:
				CTS(input, output);
				break;
			default:
				var msg = "Unkown CipherMode" + algo.Mode;
				throw msg;
		}
	}
	//---------------------------------------------------------
	// Electronic Code Book (ECB)
	function ECB(input, output) {
		var outputBuffer;
		if (encrypt) {
			outputBuffer = algo.Encrypt(algo.Key, input, System.Security.Cryptography.CipherMode.ECB);
			//var outputBuffer = input;
			System.Buffer.BlockCopy(outputBuffer, 0, output, 0, blockSizeByte);
		} else {
			outputBuffer = algo.Decrypt(algo.Key, input, System.Security.Cryptography.CipherMode.ECB);
			System.Buffer.BlockCopy(outputBuffer, 0, output, 0, blockSizeByte);
		}
		//Trace.Write("call ECB(input["+input.length+"] = "+System.BitConverter.ToString(input)+", output["+output.length+"] = "+System.BitConverter.ToString(output)+")");
	}
	//---------------------------------------------------------
	// Cipher-Block-Chaining (CBC)
	function CBC(input, output) {
		var i = 0;
		if (encrypt) {
			for (i = 0; i < blockSizeByte; i++) temp[i] ^= input[i];
			ECB(temp, output);
			System.Buffer.BlockCopy(output, 0, temp, 0, blockSizeByte);
		} else {
			System.Buffer.BlockCopy(input, 0, temp2, 0, blockSizeByte);
			ECB(input, output);
			for (i = 0; i < blockSizeByte; i++) output[i] ^= temp[i];
			System.Buffer.BlockCopy(temp2, 0, temp, 0, blockSizeByte);
		}
		//Trace.Write("call CBC(input["+input.length+"] = "+System.BitConverter.ToString(input)+", output["+output.length+"] = "+System.BitConverter.ToString(output)+")");
	}
	//---------------------------------------------------------
	// Cipher-FeedBack (CFB)
	function CFB(input, output) {
		var x = 0;
		var i = 0;
		if (encrypt) {
			for (x = 0; x < feedBackIter; x++) {
				// temp is first initialized with the IV.
				ECB(temp, temp2);
				for (i = 0; i < feedBackByte; i++) {
					output[i + x] = (temp2[i] ^ input[i + x]);
				}
				System.Buffer.BlockCopy(temp, feedBackByte, temp, 0, blockSizeByte - feedBackByte);
				System.Buffer.BlockCopy(output, x, temp, blockSizeByte - feedBackByte, feedBackByte);
			}
		} else {
			for (x = 0; x < feedBackIter; x++) {
				// we do not really decrypt this data!
				encrypt = true;
				// temp is first initialized with the IV
				ECB(temp, temp2);
				encrypt = false;
				System.Buffer.BlockCopy(temp, feedBackByte, temp, 0, blockSizeByte - feedBackByte);
				System.Buffer.BlockCopy(input, x, temp, blockSizeByte - feedBackByte, feedBackByte);
				for (i = 0; i < feedBackByte; i++) {
					output[i + x] = (temp2[i] ^ input[i + x]);
				}
			}
		}
	}
	//---------------------------------------------------------
	// Output-FeedBack (OFB)
	function OFB(input, utput) {
		throw "OFB isn't supported";
	}
	//---------------------------------------------------------
	// Cipher Text Stealing (CTS)
	function CTS(input, output) {
		throw "CTS  isn't supported";
	}

	//---------------------------------------------------------
	function Random(buffer, start, length, zeroBytes) {
		if (_rng == null) {
			_rng = new System.Security.Cryptography.RNGCryptoServiceProvider();
		}
		var random = new System.Byte(length);
		if (zeroBytes) {
			_rng.GetBytes(random);
		} else {
			_rng.GetNonZeroBytes(random);
		}
		System.Buffer.BlockCopy(random, 0, buffer, start, length);
	}

	//---------------------------------------------------------
	this._Padding = function (inputBuffer, inputOffset, inputCount) {
		var rem = blockSizeByte - inputCount;
		var paddingSize = (rem > 0) ? rem : blockSizeByte;
		var paddedInput = new System.Byte(paddingSize);
		var blocksCount = 1;
		var newBlock = new Array();
		var i = 0;
		// Fill padded Input.
		switch (algo.Padding) {
			case System.Security.Cryptography.PaddingMode.None:
				if (rem != 0) {
					throw new System.Security.Cryptography.CryptographicException("Invalid block length");
				}
			case System.Security.Cryptography.PaddingMode.Zeros:
				// ... MM 00 00 00 00 00 00 00 (Message | Zero )
				for (i = 0; i < paddedInput.length; i++) {
					paddedInput[i] = 0;
				}
				if (rem == 0) blocksCount = 2;
				break;
			case System.Security.Cryptography.PaddingMode.ANSIX923:
				// ... MM 00 00 00 00 00 00 PL (Message | Zero | Padding Length)
				paddedInput[paddedInput.length - 1] = paddingSize;
				if (rem == 0) blocksCount = 2;
				break;
			case System.Security.Cryptography.PaddingMode.ISO10126:
				// ... MM RR RR RR RR RR RR PL (Message | Random | Padding Length)
				Random(paddedInput, 0, paddedInput.length - 1, true);
				paddedInput[paddedInput.length - 1] = paddingSize;
				if (rem == 0) blocksCount = 2;
				break;
			case System.Security.Cryptography.PaddingMode.PKCS7:
				// ... MM PL PL PL PL PL PL PL  (Message | Padding Length)
				for (i = 0; i < paddedInput.length; i++) {
					paddedInput[i] = paddingSize;
				}
				if (rem == 0) blocksCount = 2;
				break;
			case System.Security.Cryptography.PaddingMode.RsaEsPkcs:
				// ... MM 00 RR RR RR RR 02 00 (Message | 00 | Random Non Zero | 02 | 00)
				Random(paddedInput, 1, paddedInput.length - 2, false);
				paddedInput[0] = 0;
				paddedInput[paddedInput.length - 2] = 2;
				paddedInput[paddedInput.length - 1] = 0;
				if (rem == 0) blocksCount = 2;
				break;
			case System.Security.Cryptography.PaddingMode.RsaEsOaep:
				var oaep = new System.Security.Cryptography.PKCS1Padding()
				var mgf = new System.Security.Cryptography.PKCS1MaskGenerationMethod();
				var hash = new System.Security.Cryptography.SHA1CryptoServiceProvider();
				var rng = new System.Security.Cryptography.RNGCryptoServiceProvider();
				newBlock = oaep.RsaEsOaepEncrypt(algo, hash, mgf, rng, inputBuffer);
			default:
				break;
		}
		var iBuffer = new System.Byte(blockSizeByte * blocksCount);
		var oBuffer = new System.Byte(blockSizeByte * blocksCount);
		if (newBlock.length == 0) {
			// Copy data to temp input buffer.
			System.Buffer.BlockCopy(inputBuffer, inputOffset, iBuffer, 0, inputCount);
			// Copy padding to temp input buffer.
			if ((rem > 0) || (rem == 0 && blocksCount == 2)) {
				System.Buffer.BlockCopy(paddedInput, 0, iBuffer, inputCount, paddingSize);
			}
		} else {
			System.Buffer.BlockCopy(newBlock, inputOffset, iBuffer, 0, inputCount + paddingSize);
		}
		var result = {};
		result["blocksCount"] = blocksCount;
		result["iBuffer"] = iBuffer;
		result["oBuffer"] = oBuffer;
		return result;
	}


	//---------------------------------------------------------
	this.Initialize = function (algorithm, encryption) {
		algo = algorithm;
		encrypt = encryption;
		if (algo) {
			blockSizeByte = (algo.BlockSize >> 3);
			this.InputBlockSize = blockSizeByte;
			this.OutputBlockSize = blockSizeByte;
			// Mode buffers
			temp = new System.Byte(blockSizeByte);
			System.Buffer.BlockCopy(algo.IV, 0, temp, 0, Math.min(blockSizeByte, algo.IV.length));
			temp2 = new System.Byte(blockSizeByte);
			feedBackByte = (algo.FeedbackSize >> 3);
			if (feedBackByte != 0)
				feedBackIter = blockSizeByte / feedBackByte;
			// Transform buffers
			workBuff = new System.Byte(blockSizeByte);
			workout = new System.Byte(blockSizeByte);
		}
	}
	this.Initialize.apply(this, arguments);
}
System.Type.RegisterClass("System.Security.Cryptography.ICryptoTransform");

System.Security.Cryptography.RNGCryptoServiceProvider = function(){
	//---------------------------------------------------------
	// Private Properties.
	var rnd;
	//---------------------------------------------------------
	this.GetNonZeroBytes = function(data){
		/// <summary>
		/// Fills an array of bytes with a sequence of random nonzero values.
		/// </summary>
		/// <param name="inputBuffer">The array to fill with a sequence of random nonzero values.</param>
		var length = data.length;
		for (var i = 0; i < length; i++){
			data[i] = rnd.Next(1, 256);
		}
	}
	//---------------------------------------------------------
	this.Initialize = function(){
		rnd = new System.Random();
	}
	this.Initialize.apply(this, arguments);
}
System.Type.RegisterClass("System.Security.Cryptography.RNGCryptoServiceProvider");

//-----------------------------------------------------------------------------
// CipherMode
//-----------------------------------------------------------------------------

System.Security.Cryptography.CipherMode = function () {
	/// <summary>Specifies the block cipher mode to use for encryption.</summary>
	/// <field name="CBC" type="Number">The Cipher Block Chaining (CBC) mode introduces feedback. Before each plain text block is encrypted, it is combined with the cipher text of the previous block by a bitwise exclusive OR operation. This ensures that even if the plain text contains many identical blocks, they will each encrypt to a different cipher text block. The initialization vector is combined with the first plain text block by a bitwise exclusive OR operation before the block is encrypted. If a single bit of the cipher text block is mangled, the corresponding plain text block will also be mangled. In addition, a bit in the subsequent block, in the same position as the original mangled bit, will be mangled.</field>
	/// <field name="ECB" type="Number">The Cipher Feedback (CFB) mode processes small increments of plain text into cipher text, instead of processing an entire block at a time. This mode uses a shift register that is one block in length and is divided into sections. For example, if the block size is eight bytes, with one byte processed at a time, the shift register is divided into eight sections. If a bit in the cipher text is mangled, one plain text bit is mangled and the shift register is corrupted. This results in the next several plain text increments being mangled until the bad bit is shifted out of the shift register.</field>
	/// <field name="OFB" type="Number">The Cipher Text Stealing (CTS) mode handles any length of plain text and produces cipher text whose length matches the plain text length. This mode behaves like the CBC mode for all but the last two blocks of the plain text.</field>
	/// <field name="CFB" type="Number">The Electronic Codebook (ECB) mode encrypts each block individually. This means that any blocks of plain text that are identical and are in the same message, or in a different message encrypted with the same key, will be transformed into identical cipher text blocks. If the plain text to be encrypted contains substantial repetition, it is feasible for the cipher text to be broken one block at a time. Also, it is possible for an active adversary to substitute and exchange individual blocks without detection. If a single bit of the cipher text block is mangled, the entire corresponding plain text block will also be mangled.</field>
	/// <field name="CTS" type="Number">The Output Feedback (OFB) mode processes small increments of plain text into cipher text instead of processing an entire block at a time. This mode is similar to CFB; the only difference between the two modes is the way that the shift register is filled. If a bit in the cipher text is mangled, the corresponding bit of plain text will be mangled. However, if there are extra or missing bits from the cipher text, the plain text will be mangled from that point on.</field>
 }
System.Security.Cryptography.CipherMode.prototype = {
	CBC: 1,
	ECB: 2,
	OFB: 3,
	CFB: 4,
	CTS: 5
}
System.Type.RegisterEnum("System.Security.Cryptography.CipherMode");

//-----------------------------------------------------------------------------
// PaddingMode
//-----------------------------------------------------------------------------

System.Security.Cryptography.PaddingMode = function(){
	/// <summary>Specifies the type of padding to apply when the message data block is shorter than the full number of bytes needed for a cryptographic operation.</summary>
	/// <field name="ANSIX923" type="Number">The ANSIX923 padding string consists of a sequence of bytes filled with zeros before the length.</field>
	/// <field name="ISO10126" type="Number">The ISO10126 padding string consists of random data before the length.</field>
	/// <field name="None" type="Number">No padding is done.</field>
	/// <field name="PKCS7" type="Number">The PKCS #7 padding string consists of a sequence of bytes, each of which is equal to the total number of padding bytes added.</field>
	/// <field name="Zeros" type="Number">The padding string consists of bytes set to zero.</field>
	/// <field name="RsaEsPkcs" type="Number">PKCS#1 v1.5 padding - Old encryption/decryption scheme as first standardized in version 1.5 of PKCS#1.</field>
	/// <field name="RsaEsOaep" type="Number">Improved encryption/decryption scheme; based on the Optimal Asymmetric Encryption Padding scheme proposed by Mihir Bellare and Phillip Rogaway.</field>
}

System.Security.Cryptography.PaddingMode.prototype = {
	None: 1,
	PKCS7: 2,
	Zeros: 3,
	ANSIX923: 4,
	ISO10126: 5,
	RsaEsPkcs: 6,
	RsaEsOaep: 7
}
System.Type.RegisterEnum("System.Security.Cryptography.PaddingMode");

//-----------------------------------------------------------------------------
// CryptoStreamMode
//-----------------------------------------------------------------------------

System.Security.Cryptography.CryptoStreamMode = function () {
	/// <summary>Specifies the mode of a cryptographic stream.</summary>
	/// <field name="Read" type="Number">Read access to a cryptographic stream.</field>
	/// <field name="Write" type="Number">Write access to a cryptographic stream.</field>
}

System.Security.Cryptography.CryptoStreamMode.prototype = {
	Read: 0,
	Write: 1
}
System.Type.RegisterEnum("System.Security.Cryptography.CryptoStreamMode");

//==============================================================================
// END
//------------------------------------------------------------------------------
//<!--//--><%
//=============================================================================
// Jocys.com JavaScript.NET Classes               (In C# Object Oriented Style)
// Created by Evaldas Jocys <evaldas@jocys.com>
//-----------------------------------------------------------------------------
// You can include this script on both sides - server and client:
// Server: <!-- #INCLUDE FILE="ScriptFile.js" -->
// Client: <script type="text/javascript" src="ScriptFile.js"></script>
//-----------------------------------------------------------------------------
// Warning: Be careful about what code you include in such way. Since the  code
// will be passed to the client side as simple text, your code can be  seen  by
// anyone who wants. Never do this with  scripts  which  contain  any  kind  of
// passwords, database connection strings, or SQL queries.
//=============================================================================

/// <reference name="System.Security.Cryptography.RSA.js" assembly="System.Security.Cryptography" />

//=============================================================================
// Namespaces
//-----------------------------------------------------------------------------
// <PropertyGroup>
//		<RootNamespace>System.Security.Cryptography</RootNamespace>
// <PropertyGroup>
//-----------------------------------------------------------------------------
System.Type.RegisterNamespace("System.Security.Cryptography");
//=============================================================================

System.Security.Cryptography.RSAManaged = function(){
	/// <summary>
	/// Initializes a new instance of the System.Security.Cryptography.RSAManaged
	/// class.
	/// </summary>	
	/// <remarks>
	/// Evaldas Jocys, evaldas@jocys.com, www.jocys.com
	/// </remarks>
	//---------------------------------------------------------
	// Public Properties
	//---------------------------------------------------------
	// Private Properties
	//---------------------------------------------------------
}

System.Security.Cryptography.RSAParameters = function(){
	/// <summary>
	/// Initializes a new instance of the System.Security.Cryptography.RSACryptoServiceProvider
	/// class using the default key.
	/// </summary>	
	/// <remarks>
	/// Recreated as JavaScript class by:
	/// Evaldas Jocys, evaldas@jocys.com, www.jocys.com
	/// http://www.koders.com/csharp/fidE8DED43C8555D56BAB880F8E5AA4CEC09C62A847.aspx
	/// </remarks>
	//---------------------------------------------------------
	// Public Properties
	this.Exponent = new Array;
	this.Modulus = new Array;
	// Non serialized parameters.
	this.D = new Array;
	this.DP = new Array;
	this.DQ = new Array;
	this.InverseQ = new Array;
	this.P = new Array;
	this.Q = new Array;
	//---------------------------------------------------------
	this.Clone = function(includePrivateParameters){
		var parameters = new System.Security.Cryptography.RSAParameters();
		System.Array.Copy(this.Exponent, parameters.Exponent, this.Exponent.length);
		System.Array.Copy(this.Modulus, parameters.Modulus, this.Modulus.length);
		if (includePrivateParameters){
			if (this.D) System.Array.Copy(this.D, parameters.D, this.D.length);
			if (this.DP) System.Array.Copy(this.DP, parameters.DP, this.DP.length);
			if (this.DQ) System.Array.Copy(this.DQ, parameters.DQ, this.DQ.length);
			if (this.InverseQ) System.Array.Copy(this.InverseQ, parameters.InverseQ, this.InverseQ.length);
			if (this.P) System.Array.Copy(this.P, parameters.P, this.P.length);
			if (this.Q) System.Array.Copy(this.Q, parameters.Q, this.Q.length);
		}
		return parameters;
	}
	//---------------------------------------------------------
	this.Initialize = function(){
	}
	this.Initialize.apply(this, arguments);
}

System.Security.Cryptography.RSACryptoServiceProvider = function(){
	/// <summary>
	/// Initializes a new instance of the System.Security.Cryptography.RSACryptoServiceProvider
	/// class using the default key.
	/// </summary>	
	/// <remarks>
	/// Recreated as JavaScript class by:
	/// Evaldas Jocys, evaldas@jocys.com, www.jocys.com
	/// </remarks>
	//---------------------------------------------------------
	// Public Properties
	// Default key in .NET is 1024.
	// Set default key size to 512-bit for slow JavaScript.
	this.KeySize = 512;
	this.BlockSize = 512;
	this.FeedbackSize = 512;
	this.IV = new Array();
	this.HashSize = 20*8; // SHA-1
	//---------------------------------------------------------
	// Private Properties
	var rsaParams = null;
	var rsaParamsBi = null;
	var bi = System.BigInt.Utils;
	//---------------------------------------------------------
	function GetKeyPair(){
		if (rsaParams == null) rsaParams = NewKeyPair.call(this, true);
		return rsaParams;
	}

	//---------------------------------------------------------
	function getXmlValue(xmlString, tag){
		var tag = new RegExp("<"+tag+">(.*?)</"+tag+">", "gi");
		var tagMatch = xmlString.match(tag);
		if (!tagMatch) return null;
		var base64 = tagMatch[0].replace(tag,"$1");
		var bytes = System.Convert.FromBase64String(base64);
		return bytes;
	}
	//---------------------------------------------------------
	this.ImportParameters = function(parameters){
		rsaParams = parameters.Clone(true);
		rsaParamsBi = null;
		this.KeySize = rsaParams.Modulus.length*8;
		this.BlockSize = this.KeySize;
		this.FeedbackSize = this.KeySize;
	}

	//---------------------------------------------------------
	this.FromXmlString = function(xmlString)
	{
		var parameters = new System.Security.Cryptography.RSAParameters();
		var tagSpace = new RegExp("\\s","gi");
		xmlString = xmlString.replace(tagSpace, "");
		parameters.Exponent = getXmlValue(xmlString, "Exponent");
		parameters.Modulus = getXmlValue(xmlString, "Modulus");
		parameters.D = getXmlValue(xmlString, "D");
		parameters.DP = getXmlValue(xmlString, "DP");
		parameters.DQ = getXmlValue(xmlString, "DQ");
		parameters.InverseQ = getXmlValue(xmlString, "InverseQ");
		parameters.P = getXmlValue(xmlString, "P");
		parameters.Q = getXmlValue(xmlString, "Q");
		this.ImportParameters(parameters);
	}

	//---------------------------------------------------------
	function Padding(input, fOAEP, encrypt){
		this.Padding = fOAEP
			? System.Security.Cryptography.PaddingMode.RsaEsOaep
			: System.Security.Cryptography.PaddingMode.RsaEsPkcs;
		this.Mode = System.Security.Cryptography.CipherMode.ECB;
		var crypto = new System.Security.Cryptography.ICryptoTransform(this, true);
		var output = encrypt
			? crypto._Padding(input, 0, input.length).iBuffer
			: crypto._PaddingRemove(input, 0, input.length);
		return output;	
	}
	//---------------------------------------------------------
	function RsaEncryptBlock(block, key){
		var mBytes = block.Clone();
		System.Array.Reverse(mBytes);
		var e = bi.FromBytes(key.Exponent);
		var n = bi.FromBytes(key.Modulus);
		var d = bi.FromBytes(key.D);
		var m = bi.FromBytes(mBytes);
		// Encrypt: c = m^e mod n
		var c = bi.PowMod(m, e, n);
		var cBytes = bi.ToBytes(c);
		// Expand to block size with empty bytes.
		var bpb = this.KeySize / 8;				// bytes per block
		for (var i = cBytes.length; i < bpb; i++) cBytes.push(0x00);
		System.Array.Reverse(cBytes);
		return cBytes;
	}
	//---------------------------------------------------------
	function EncryptBytes(key, input, fOAEP){
		var bpb = (this.KeySize / 8) - (fOAEP ? 41 : 11);// bytes per block
		var output = new Array();               // plaintext array
		var block;                              // current block number
		for (var b = 0; b < input.length / bpb; b++) {
			block = input.slice(b*bpb, (b+1)*bpb);
			// Reverse bytes for compatibility with RSACryptoServiceProvider.
			System.Array.Reverse(block);
			// Add padding.
			var padded = Padding.call(this, block, fOAEP, true);
			// RSA Encrypt.
			var cBytes = RsaEncryptBlock.call(this, padded, key);
			// Add result to output.
			output = output.concat(cBytes);
		}
		return output;
	}
	//---------------------------------------------------------
	this.Encrypt = function(rgb, fOAEP){
		/// <summary>
		/// Encrypts data with the System.Security.Cryptography.RSA algorithm.
		/// </summary>
		/// <param name="rgb">The data to be encrypted.</param>
		/// <param name="fOAEP">true to perform direct System.Security.Cryptography.RSA encryption using
		/// OAEP padding (only available on a computer running Microsoft Windows XP or
		/// later); otherwise, false to use PKCS#1 v1.5 padding.
		/// </param>
		/// <returns>The encrypted data.</returns>
		var msg;	
		var key = GetKeyPair.call(this);
		var digitSize = key.Modulus.length;
		if (!fOAEP && rgb.length > digitSize - 11)
		{
			msg = "The data to be encrypted exceeds the maximum for this modulus of "+key.digitSize+" bytes. Maximum data size is "+(key.digitSize - 11)+" bytes.";
			Trace.Write(msg);
			throw new System.Security.Cryptography.CryptographicException(msg);
		}
		if (fOAEP && rgb.length > digitSize - 42){
			// 41 = 1 (0x00) prefix + 20 seed + 20 label + 1 (0x01) separator.
			msg = "The data to be encrypted exceeds the maximum for this modulus of "+key.digitSize+" bytes. Maximum data size is "+(key.digitSize - 42)+" bytes.";
			Trace.Write(msg);
			throw new System.Security.Cryptography.CryptographicException(msg);
		}
		return EncryptBytes.call(this, key, rgb, fOAEP);
	}
	
	//---------------------------------------------------------
	this.Initialize = function(){
		if (arguments.length == 1){
			if (typeof(arguments[0]) == "number"){
				this.KeySize = arguments[0];
				this.BlockSize = this.KeySize;
				this.FeedbackSize = this.KeySize;
			}
		}
	}
	this.Initialize.apply(this, arguments);
}

//==============================================================================
// END
//------------------------------------------------------------------------------
//%>
var TCO = new function() {

    this.loadPubKey = function(mode, callback) {
        var r = getUTCNowvar(),
            n = document.createElement("script"),
            h = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
        if (mode === 'sandbox') {
            n.src = "https://sandbox.2checkout.com/checkout/api/script/publickey/" + r;
        } else {
            n.src = "https://www.2checkout.com/checkout/api/script/publickey/" + r;
        }
        n.onload = n.onreadystatechange = function() {
            if (!n.readyState || /loaded|complete/.test(n.readyState)) {
                n.onload = n.onreadystatechange = null;
                if (h && n.parentNode) {
                    h.removeChild(n);
                }
                n = undefined;
                if (typeof callback === 'function') {
                    callback();
                }
            }
        };
        h.insertBefore(n, h.firstChild);
    };

    this.requestToken = function(e, t, f) {
        var n = new TokenRequest();
        n.fillTokenRequest(f, t);
        if (validate(n, t)) {
            publishableKey = encode64(n.publishableKey);
            var r = getEncodedUserPreference();
            sellerId = n.sellerId;
            var i = encodeURI('{"sellerId" : "' + sellerId + '", "publicKey" : "' + publishableKey + '" , "userPref" : "' + r + '"}');
            var s = tokenRequestUrl + "1/" + sellerId + "/rs/preTokenService?";
            var o = "tcoJsonp";
            var u = "jsonCallback";
            if (!isSafePreTokenURL(s, o, u, i)) {
                i = encodeURI('{"sellerId" : "' + sellerId + '", "publicKey" : "' + publishableKey + '" , "userPref" : "' + "" + '"}');
            }
            ajax2co({
                url: s,
                type: n.httpMethod,
                contentType: "application/json",
                data: "payload=" + i,
                processData: false,
                jsonpCallback: u,
                dataType: "jsonp",
                jsonp: o,
                success: function (r, i, s) {
                  if (r.response !== null) {
                      n.preToken = r.response.preToken;
                      sendTokenRequest(e, t, n);
                  } else if (r.exception !== null) {
                      defaultErrorFunction(t, r.exception.errorMsg, r.exception.errorCode);
                  } else {
                      defaultErrorFunction(t);
                  }
                },
                error: function (e) {
                    defaultErrorFunction(t);
                }
            });
        }
    };

    var sendTokenRequest = function(e, t, n) {
        try {
          sellerId = n.sellerId;
          var r = encodeURI('{"sellerId":"' + sellerId + '","paymentMethod":"' + n.generatePaymentDetail() + '"}');
          ajax2co({
              url: n.tcoUrl + "1/" + sellerId + "/rs/tokenService?",
              contentType: "application/json",
              type: n.httpMethod,
              data: "payload=" + r,
              processData: false,
              jsonpCallback: "jsonCallback",
              dataType: "jsonp",
              jsonp: "tcoJsonp",
              success: function (r, i, s) {
                  if (r.response !== null) {
                    e(r, i, s);
                  } else if (r.exception !== null) {
                      defaultErrorFunction(t, r.exception.errorMsg, r.exception.errorCode);
                  } else {
                      defaultErrorFunction(t);
                  }
              },
              error: function (e) {
                  defaultErrorFunction(t);
              }
          });
        } catch (i) {
            defaultErrorFunction(t);
        }
    };

    var validate = function(e, f) {
        var t = true;
        e.expMonth = (e.expMonth.toString().length === 1) ? '0'+e.expMonth : e.expMonth;
        e.expYear = (e.expYear.toString().length < 4) ? '20'+e.expYear : e.expYear;
        e.cardNum = e.cardNum.replace(/[^0-9]+/g,'');
        e.cvv = e.cvv.replace(/[^0-9]+/g,'');
        if (!isNumber(e.cardNum) || !isNumber(e.cvv) || !isNumber(e.expMonth) || !isNumber(e.expYear)) {
           t = false;
           defaultErrorFunction(f, "Missing Card Data", 401);
        } else if (typeof publicKey === 'undefined') {
           t = false;
           defaultErrorFunction(f, "Missing publicKey.js", 401);
        }
        return t;
    };

    var defaultErrorFunction = function(f, e, t) {
        if (typeof e === 'undefined' && typeof t === 'undefined') {
           e = "Unable to process the request";
           t = 200;
        }
        data = {
           "errorCode": t,
           "errorMsg": e
        };
        f(data);
    };

    var isNumber = function(e) {
        return !isNaN(parseFloat(e)) && isFinite(e);
    };

    var getUTCNowvar = function() {
        var e = new Date();
        var t = Date.UTC(e.getFullYear(), e.getMonth(), e.getDate(), e.getHours(), e.getMinutes(), e.getSeconds(), e.getMilliseconds());
        return t;
    };

    var encode64 = function(e) {
        var t = "";
        var n, r, i, s, o, u, a;
        var f = 0;
        e = utf8Encode(e);
        while (f < e.length) {
            n = e.charCodeAt(f++);
            r = e.charCodeAt(f++);
            i = e.charCodeAt(f++);
            s = n >> 2;
            o = (n & 3) << 4 | r >> 4;
            u = (r & 15) << 2 | i >> 6;
            a = i & 63;
            if (isNaN(r)) {
               u = a = 64;
            } else if (isNaN(i)) {
               a = 64;
            }
            t = t + keyStr.charAt(s) + keyStr.charAt(o) + keyStr.charAt(u) + keyStr.charAt(a);
        }
        return t;
    };

    var utf8Encode = function(e) {
        e = e.replace(/\r\n/g, "\n");
        var t = "";
        for (var n = 0; n < e.length; n++) {
            var r = e.charCodeAt(n);
            if (r < 128) {
                t += String.fromCharCode(r);
            } else if (r > 127 && r < 2048) {
                t += String.fromCharCode(r >> 6 | 192);
                t += String.fromCharCode(r & 63 | 128);
            } else {
                t += String.fromCharCode(r >> 12 | 224);
                t += String.fromCharCode(r >> 6 & 63 | 128);
                t += String.fromCharCode(r & 63 | 128);
            }
        }
        return t;
    };

    var encrypt = function(e) {
        var t = "2048";
        var n = "<RSAKeyValue>" + "<Modulus>" + publicKey.m + "</Modulus>" + "<Exponent>" + publicKey.e + "</Exponent>" + "</RSAKeyValue>";
        var r = new System.Security.Cryptography.RSACryptoServiceProvider(parseInt(t, 10));
        r.FromXmlString(n);
        var i = System.Text.Encoding.UTF8.GetBytes(e);
        var s = r.Encrypt(i, false);
        var o = System.Convert.ToBase64String(s);
        return o;
    };

    var randomUUID = function(e, t) {
        var i;
        var n = CHARS,
            r = [];
        t = t || n.length;
        if (e) {
            for (i = 0; i < e; i++) r[i] = n[0 | Math.random() * t];
        } else {
            var s;
            r[8] = r[13] = r[18] = r[23] = "-";
            r[14] = "4";
            for (i = 0; i < 36; i++) {
                if (!r[i]) {
                    s = 0 | Math.random() * 16;
                    r[i] = n[i == 19 ? s & 3 | 8 : s];
                }
            }
        }
        return r.join("");
    };

    var getEncodedUserPreference = function() {
        addUserPrefsInput();
        parm4.jscall("2co_user_prefs");
        var e = document.getElementById("2co_user_prefs").value;
        removeUserPrefsInput();
        return encode64(e);
    };

    var addUserPrefsInput = function() {
        if (!document.getElementById("2co_user_prefs")) {
            var e = document.body || document.getElementsByTagName("body")[0];
            var t = document.createElement("input");
            t.setAttribute("type", "hidden");
            t.setAttribute("id", "2co_user_prefs");
            e.appendChild(t);
        }
    };

    var removeUserPrefsInput = function() {
        var e = document.getElementById("2co_user_prefs");
        if (e || e.parentNode) {
            e.parentNode.removeChild(e);
        }
    };

    var isSafePreTokenURL = function(e, t, n, r) {
        var i = e + t + "=" + n + "&" + r;
        return i.length < 2048;
    };

    var TokenRequest = function() {
        this.tcoUrl = tokenRequestUrl, this.cardType = "CC", this.httpMethod = "GET", this.sellerId = "", this.pubAccessKey = "", this.cardNum = "", this.expMonth = "", this.expYear = "", this.cvv = "", this.preToken = "", this.generatePaymentDetail = function () {
            var e = '{"paymentMethod":{"cardNum":"' + this.cardNum + '", "expMonth":"' + this.expMonth + '", "expYear":"' + this.expYear + '", "cvv":"' + this.cvv + '", "cardType":"' + this.cardType + '"}' + ', "pubAccessKey":"' + this.publishableKey + '", "preToken":"' + this.preToken + '"}';
            var t = encrypt(e);
            return encode64(t);
        };
        this.fillTokenRequest = function (f, t) {
            if (typeof f === 'object') {
                if (f.sellerId && f.publishableKey && f.ccNo && f.expMonth && f.expYear && f.cvv) {
                    this.sellerId = f.sellerId;
                    this.publishableKey = f.publishableKey;
                    this.cardNum = f.ccNo;
                    this.expMonth = f.expMonth;
                    this.expYear = f.expYear;
                    this.cvv = f.cvv;
                } else {
                    defaultErrorFunction(t, "Missing Form Fields", 401);
                }
            } else {
                var e = document.getElementById(f);
                if (e.sellerId && e.publishableKey && e.ccNo && e.expMonth && e.expYear && e.cvv) {
                    this.sellerId = e.sellerId.value;
                    this.publishableKey = e.publishableKey.value;
                    this.cardNum = e.ccNo.value;
                    this.expMonth = e.expMonth.value;
                    this.expYear = e.expYear.value;
                    this.cvv = e.cvv.value;
                } else {
                    defaultErrorFunction(t, "Missing Form Fields", 401);
                }
            }
        };
    };

    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");

};

function ajax2co(option) {

	var url, data; // rjsonp = /(=)\?(?=&|$)|\?\?/;
	var isCalled = false;

	// set call back name if not set
	option.jsonpCallback = option.jsonpCallback || "jsonCallback";

	// construct the url with call back function name and pay load
	option.url = option.url + option.jsonp + "=" + option.jsonpCallback + "&" + option.data;

	// install jsonp callback function
	window[option.jsonpCallback] = function() {
		isCalled = true;
		data = arguments[0];
	};

	// send the request as script tag source.
	var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;

	script = document.createElement("script");

	script.async = "async";
	if (option.scriptCharset) {
		script.charset = option.scriptCharset;
	}
	script.src = option.url;

	// Attach handlers for all browsers
	script.onload = script.onreadystatechange = function() {

		if (!script.readyState || /loaded|complete/.test(script.readyState)) {

			// Handle memory leak in IE
			script.onload = script.onreadystatechange = null;

			// Remove the script
			if (head && script.parentNode) {
				head.removeChild(script);
			}

			// Dereference the script
			script = undefined;
			//
			if (isCalled) {
				// call callback function
				option.success(data);
			} else if (option.error) {
				option.error();
			}
		}
	};

	head.insertBefore(script, head.firstChild);

}
