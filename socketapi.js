const io = require( "socket.io" )();
    const socketapi = {
        io: io
    };

    var connections=[];
    var connectionid=[];

    // Add your socket.io logic here!
    io.on( "connection", function( socket ) {
      
      io.emit( connections, "Onlineusers");
          socket.on('disconnect', () => {
          let indexofduser = connectionid.indexOf(socket.id);
          connections.splice(indexofduser, 1);
          connectionid.splice(indexofduser, 1);
          io.emit(  "Onlineusers", connections);
          //console.log(connections);
          //console.log(connectionid);

          //console.log('A user disconnected');
          });
          /*socket.on('msg', data => {
            io.emit('msg', data);
          });*/
          socket.on('naam', function(data){
            connections.push(data);
            connectionid.push(socket.id);
            io.emit(  "Onlineusers", connections);
            console.log(connections);
            console.log(connectionid);
            //console.log(data); 
            
            socket.on('msg', function(data) {
               //console.log(data);
               let connectionkanaam = connections[connectionid.indexOf(socket.id)]
               io.emit('msg',{connection:connectionkanaam, msg:data}); 
             })
             
        })
        socket.on('typing', function (data) {
          //console.log(data);
          let usernamee = connections[connectionid.indexOf(socket.id)]
          socket.broadcast.emit( 'typing', usernamee);
        });

    });
    
     // end of socket.io logic

    module.exports = socketapi;