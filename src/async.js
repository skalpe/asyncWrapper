function async(gen){
  var generator = gen();

  next(generator.next());

  function onResolve(...ret){
    next(generator.next(...ret));
  }

  function onReject(err){
    next(generator.throw(err));
  }

  function next(returnedIterator){
    if(returnedIterator.done) return;

    returnedIterator.value.then(onResolve, onReject);
  }
}

export {
  async
};