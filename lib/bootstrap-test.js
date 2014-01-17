console.log("Node bootstraps");

peer = new GossipPeer({
  host: $('#peerserver-ip').text(),
  port: parseInt($('#peerserver-port').text()),
  debug: 3,
  logFunction: function(){
    var copy = Array.prototype.slice.call(arguments).join(' ');
    console.log(copy);
  },
  cacheSize: parseInt($('#cache-size').text()),
  firstViewSize: parseInt($('#first-view-size').text()),
  l: parseInt($('#l-parameter').text()),
  gossipPeriod: parseInt($('#gossip-period').text()),
  bootable: $('#bootable').text()
});

peer.on('open', function(id){
  console.log("ID from PeerServer was received");
  if(peer.options.bootable === "false"){
    console.log("Requesting first view to PeerServer");
    peer.emit('randomView');
  }
  else{
    console.log("I am a bootable peer");
  }
});

window.onunload = window.onbeforeunload = function(e) {
  if (!!peer && !peer.destroyed) {
      peer.destroy();
    }
};
