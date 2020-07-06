import frida, sys
import time



test_sky = '''
Java.perform(function () {     
    console.log('start');     
    // 证书效验     
    // var cir = Java.use('a.a.a.cir');     
    var cir = Java.use('a.a.a.amz');     
    cir["checkServerTrusted"].overload('[Ljava.security.cert.X509Certificate;', 'java.lang.String').implementation = 
    function (v1, v2) {         
        console.log("v1: ", v2);         
        //var result = this.checkClientTrusted(v1, v2);
        return null;     
    }          
    // 日志     
    var LogUtility = Java.use('com.nearme.module.util.LogUtility');     
    LogUtility.debug.overload('java.lang.String').implementation = function (v1) {
             console.log("v1: ", v1);         
             return null;     
    } 
    });
'''


def read_file_all(file):
    fp = open(file, encoding='utf-8')
    text = fp.read()
    fp.close()
    return text

def on_message(message, data):
    if message['type'] == 'send':
        print("[*] {0}".format(message['payload']))
    else:
        print(message)


def test():
    process = frida.get_usb_device().attach('com.oppo.market')
    jss = read_file_all('hash.js')
    # script = process.create_script(test_sky)
    script = process.create_script(jss)
    script.on('message', on_message)
    script.load()
    sys.stdin.read()


# def hook_prepare():
#     process = frida.get_usb_device().attach('com.sankuai.meituan')
#     script = process.create_script(test_sky)
#     script.on('message', on_message)
#     script.load()
#     print('hook_prepare is ok')
#     return script


# hook_prepare()
if __name__ == "__main__":
    test()