import {async} from 'async';

async(function* (){
  console.info('Parallel order.');

  var aPromise, bPromise, cPromise, results;

  aPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aPromise resolved');
    }, 1000);
  });
  bPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('bPromise resolved');
    }, 2000);
  });
  cPromise = new Promise(function(resolve, reject){
    setTimeout(function(){
      resolve('cPromise resolved');
    }, 3000);
  });

  results = yield Promise.all([aPromise, bPromise, cPromise]);

  console.log(results);

  console.info('Finished');

});