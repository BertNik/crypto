var secret = 573;
var e = (v)=>{
    v = typeof v === 'number' ? v.toString() : v;
    var enc = v.split('').map((a,b)=>{
            var random = Math.ceil(Math.random() * 10);
            var rt = parseInt((secret * random) + a.charCodeAt().toString(10));
            return rt;
        }
    )
    return enc;
}

var d = (v)=>{
    var message = v.map((a,b)=>{
            var rt = String.fromCharCode(a % secret);
            return rt;
        }
    )
    return message.join("");
}
