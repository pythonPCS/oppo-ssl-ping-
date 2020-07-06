// usage examples
setTimeout(function() { // avoid java.lang.ClassNotFoundException

	Java.perform(function() {
	    var thread = Java.use('java.lang.Thread');
	    var instance = thread.$new();

	    function where(stack){
	        var at = "";
	        for (var i = 0; i < stack.length; i++){
	            at += stack[i].toString() + "\n";
	        }
	        return at;
	    }

        var coinClass = Java.use("java.security.MessageDigest");
        coinClass.getInstance.overload("java.lang.String").implementation=function () {
            var name = arguments[0];

            console.log("++++++++++++++++++++++++++定位到哈希算法库++++++++++++++++++++++++++++++"+name);
            return this.getInstance(name);
        };
        coinClass.update.overload('[B').implementation = function (aaa) {
            console.log("update结果:", bytesToString(aaa));
            return this.update(aaa);
        };


        coinClass.digest.overload().implementation = function () {
            var result = this.digest();
            console.log("digest结果:" + bytesToHex(result));
            // send("digest结果:" + bytesToBase64(result));
            // var stack = instance.currentThread().getStackTrace();
            // var full_call_stack = where(stack);
            //F
            // console.log(full_call_stack);
            return result;
        };


        function bytesToHex(arr) {
            var str = '';
            var k, j;
            for (var i = 0; i < arr.length; i++) {
                k = arr[i];
                j = k;
                if (k < 0) {
                    j = k + 256;
                }
                if (j < 16) {
                    str += "0";
                }
                str += j.toString(16);
            }
            return str;

        }
        //将byte[]转成String的方法
        function bytesToString(arr) {
            var str = '';
            arr = new Uint8Array(arr);
            for (var i in arr) {
                str += String.fromCharCode(arr[i]);
            }
            return str;
        }

	});
}, 0);