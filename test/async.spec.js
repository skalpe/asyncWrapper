import {async} from '../src/async';

describe('Async helper for generators', function(){
  it('Should continue as many times as yield is written', function(done){
    var counter = 0, success,
        promise = new Promise(function(resolve, reject){
          success = resolve;
        });

    async(function* (){

      yield Promise.resolve('1');
      counter++;

      yield Promise.resolve('2');
      counter++;

      yield Promise.resolve('3');
      counter++;
      success();

    });

    promise.then(function(){
      expect(counter).toEqual(3);
      done();
    });
  });
  it('Should yield success value on resolve', function(done){
    var resolveSuccessValue = 'resolveSuccessValue', success,
      promise = new Promise(function(resolve, reject){
        success = resolve;
      });

    async(function* (){

      var successValue = yield new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve(resolveSuccessValue);
        }, 1000);
      });

      success(successValue);

    });

    promise.then(function(successValue){
      expect(successValue).toBe(resolveSuccessValue);
      done();
    });
  });
  it('Should handle error is sync manner', function(done){
    var mustBeThrownError = new Error('Must be thrown'), fail,
        promise = new Promise(function(resolve, reject){
          fail = reject;
      });

    async(function* (){

      try{
        yield new Promise(function(resolve, reject){
          setTimeout(function(){
            reject(mustBeThrownError);
          }, 1000);
        });
      }catch(yieldedError){
        fail(yieldedError);
      }

    });

    promise.then(function(){}, function(yieldedError){
      expect(yieldedError).toBe(mustBeThrownError);
      done();
    });
  });
  it('Should continue after error is sync manner', function(done){
    var resolveSuccessValue = 'resolveSuccessValue', success,
      promise = new Promise(function(resolve, reject){
        success = resolve;
      });

    async(function* (){

      try{
        yield new Promise(function(resolve, reject){
          setTimeout(function(){
            reject(new Error('Er'));
          }, 1000);
        });
      }catch(yieldedError){}

      var successValue = yield new Promise(function(resolve, reject){
        setTimeout(function(){
          resolve(resolveSuccessValue);
        }, 1000);
      });

      success(successValue);

    });

    promise.then(function(successValue){
      expect(successValue).toBe(resolveSuccessValue);
      done();
    });
  });
  it('Should support parallel requests', function(done){
    var requestValues = ['1', '2', '3'], success,
      promise = new Promise(function(resolve, reject){
        success = resolve;
      });

    async(function* (){
      var requests = requestValues.reduce(function(memo, val, index){
        memo.push(new Promise(function(resolve, reject){
          setTimeout(function(){
            resolve(val);
          }, index * 1000);
        }));
        return memo;
      }, []);

      var combinedResponse = yield Promise.all(requests);

      success(combinedResponse);

    });

    promise.then(function(successValue){
      expect(successValue).toEqual(requestValues);
      done();
    });
  });
  it('Should behave as usual function without yield', function(){
    var success = false;

    async(function* (){

      success = true;

    });

    expect(success).toBe(true);
  });
});