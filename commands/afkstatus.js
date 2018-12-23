exports.run = (client, message, args, role) => {
  //First check if user is mentioned
    if(message.mentions.members.first()){
      //If user is mentioned, try to get all data from database
      sql.run(`SELECT * FROM users WHERE id=${message.mentions.members.id}`).then(row =>{
        //If use can be found from database
        if(row){
          //User is found, let's check if he's afk status is 1
          if (row.afkstatus == '1') {
            //afk status was 1, let's make variable called status with message that tells info for user.
            var status = `User is afk. Message: ${row.afkreason}`;
          }else{
            //afk status was 0 so let's make same variable but change content
            var status = `User is not in afk.`;
          }
          //just send message
          message.channel.send(status);
        }else{
          //user was not found from database, so that means that he is not used afk feature ever before.
          var status = `User is not in afk.`;
          message.channel.send(status);
        }
      })
    }
  };