let _callbacks = [];

class _Dispatcher {

    register(callback) {
        _callbacks.push(callback);
    }

    dispatch(payload) {
        console.log("DISPATCH: " + payload);
        _callbacks.forEach(c => c(payload));
    }
}

let Dispatcher = new _Dispatcher();
export default Dispatcher;