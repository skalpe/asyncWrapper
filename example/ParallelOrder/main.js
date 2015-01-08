import {async} from 'async';

async(function* (){
  console.log('Async order.');

  var aPromiseResult, bPromiseResult, cPromiseResult;

    aPromiseResult = yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('aPromise resolved');
      }, 1000);
    });

    console.log(aPromiseResult);

    bPromiseResult = yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('bPromise resolved');
      }, 2000);
    });

    console.log(bPromiseResult);

    cPromiseResult = yield new Promise(function(resolve, reject){
      setTimeout(function(){
        resolve('cPromise resolved');
      }, 3000);
    });

    console.log(cPromiseResult);

});