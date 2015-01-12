/**
 * Wrapper for generator with promises to be bale to implement clear control flow in "sync" manner.
 * You can yield promise from generator and this promise will be handled in proper way.
 * On resolve - resolve arguments will be passed to generator and next iteration tick will be called.
 * On reject - error will be thrown in generator and next iteration tick will be called.
 *
 * @param gen - generator function
 */
function async(gen){
  var generator = gen();

  // Start iteration.
  next(generator.next());

  // When promise resolves - perform next step and pass arguments to generator.
  function onResolve(...ret){
    next(generator.next(...ret));
  }

  // When promise rejects - throw error in generator.
  function onReject(err){
    next(generator.throw(err));
  }

  /*
   Receive result of iteration.
   If iteration is done - finish.
   If there is another promise passed with yield statement:
   Set on resolve and on reject callbacks.
   */
  function next(returnedIterator){
    if(returnedIterator.done) return;

    returnedIterator.value.then(onResolve, onReject);
  }
}

export {
  async
};