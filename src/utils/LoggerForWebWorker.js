(function(exports){
  function Logger(opts){
    this.header = opts.header;
    this.local = true;
    if(typeof opts.host === 'string' && typeof opts.port === 'number'){
      this.host = opts.host;
      this.port = opts.port;
      this.url = 'http://' + opts.host + ':' + opts.port + '/log';
      this.local = false;
    }
  }
  
  Logger.prototype.send = function(msg){
    var xhr = new XMLHttpRequest();
    xhr.open('POST', this.url, true);
    xhr.setRequestHeader("Content-type", "text/plain");
    var self = this;
    xhr.onreadystatechange = function(){
      if(xhr.readyState !== 4){ return; }
      if(xhr.status !== 200){
        xhr.onerror();
        return;
      }
    };
    xhr.onerror = function(e){
      console.error('Logger failed to post, subsequent logs will be shown in local');
      self.local = true;
      //TODO schedule a timeout for checking if server is up could be nice
    };
    xhr.send(msg);
  };
  
  Logger.prototype.warn = function(msg){
    var d = new Date();
    var dStr = d.toTimeString().split(' ')[0];
    var log = '[' + dStr + ' - WARN ] ' + this.header + ': ' + msg;
    if(this.local) console.warn(log);else this.send(log);
  };
  Logger.prototype.info = function(msg){
    var d = new Date();
    var dStr = d.toTimeString().split(' ')[0];
    var log = '[' + dStr + ' - INFO ] ' + this.header + ': ' + msg;
    if(this.local) console.info(log);else this.send(log);
  };
  Logger.prototype.error = function(msg){
    var d = new Date();
    var dStr = d.toTimeString().split(' ')[0];
    var log = '[' + dStr + ' - ERROR] ' + this.header + ': ' + msg;
    if(this.local) console.error(log);else this.send(log);
  };
  
  exports.Logger = Logger;
})(this);