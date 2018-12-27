var ar = process.argv;
var z = parseInt(ar[2]);
var sofz = Math.sqrt(z);
var c_ofs = Math.ceil(sofz);
var f_ofs = Math.floor(sofz);
var count = 0, start = Date.now(), printstuffint, printstuff, printstats, printtime, update = 10;

var mainint = setInterval(function(){
    if(count === 0){
        printtime = (arg) => {
            if(arg !== 'done'){
                console.log('operation running for ' + ( (Date.now() - start) / 1000)  + " seconds");
            }else{
                console.log('operation ran for ' + ( (Date.now() - start) / 1000)  + " seconds");
            }
        }
        printstuff =  (f_ofs, c_ofs) => {
            console.log("result: "+ f_ofs.toString() + " * " + c_ofs.toString() + " = "  + f_ofs * c_ofs)
         }
         printstuffint = setInterval(function(){
            printstuff(f_ofs, c_ofs);
            printstats();
            printtime();
            console.log(count + " operations took place.");
            console.log('---------------------------------------------------------------');
        }, 1000 * update)
        printstats = () => {
            console.log("heap used: " + process.memoryUsage().heapUsed)
            console.log("heap total: " + process.memoryUsage().heapTotal);
            console.log("difference " + (process.memoryUsage().heapTotal - process.memoryUsage().heapUsed));
        }
        setTimeout(function(){
            printstuff(f_ofs, c_ofs);
            printstats();
            printtime();
            console.log('---------------------------------------------------------------');
        },500);

        var stdin = process.openStdin();
        stdin.addListener("data", function(d) {
            var input = d.toString().trim();
            switch(input){
                case 'r':
                    console.log("refreshing manually.");
                    console.log('---------------------------------------------------------------');
                    clearInterval(printstuffint);
                    setTimeout(function(){
                        printstuff(f_ofs, c_ofs);
                        printstats();
                        printtime();
                        console.log(count + " operations took place.");
                        console.log('---------------------------------------------------------------');
                    }, 2000);
                    break;
                case '':
                    console.log("refresh disabled; press 'r' or enter an integer to restart.");
                    console.log('---------------------------------------------------------------');
                    clearInterval(printstuffint);
                    break;
                default:
                    console.log("refresh time changed to: " +  d.toString().trim() + " seconds.");
                    console.log('---------------------------------------------------------------');
                    clearInterval(printstuffint);
                    setTimeout(function(){
                        printstuffint = setInterval(function(){
                            printstuff(f_ofs, c_ofs);
                            printstats();
                            printtime();
                            console.log(count + " operations took place.");
                            console.log('---------------------------------------------------------------');
                        }, 1000 * parseInt(input));
                    }, 1000);
                    break;
            }
        });
    }

    if(f_ofs !== 1 && c_ofs !== z){
        count++;
        if((parseInt(f_ofs) * parseInt(c_ofs)) === z) {
             console.log(f_ofs  + " and " + c_ofs );
             console.log(z + ' is NOT a prime number')
             console.log('took ' + count + " tries to find NON prime")
             clearInterval(printstuffint);
             clearInterval(mainint);
         }
         if( f_ofs * c_ofs > z){
            f_ofs--;
         }else{
            c_ofs++;
         }
     }
     if(f_ofs === 1 ) {
        console.log(z + ' is a prime number!')
        console.log('took ' + count + " tries to find prime")
        printstuff(f_ofs, c_ofs);
        printstats();
        printtime('done');
        clearInterval(printstuffint);
        clearInterval(mainint);
    }
},0);
