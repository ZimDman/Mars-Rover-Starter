const Command = require('./command.js')
const Message = require('./message.js')


let commands = [
  new Command('MODE_CHANGE', 'LOW_POWER'),new Command('STATUS_CHECK')
];

let message = new Message('Help!', commands);




class Rover {
   // Write code here!
   constructor(position){
      this.position = position;
      this.mode = "NORMAL";
      this.generatorWatts = 110;
   }


   receiveMessage(message) {
    let results = [];
    let response = {
      "message" : message.name,
      "results" : results
    }
    /*let roverStatus = {
      "mode": this.mode,
      "generatorWatts": this.generatorWatts,
      "position": this.position
    };*/
  
    for (let i=0; i<message.commands.length; i++) {
      if (message.commands[i].commandType ==='MOVE') {
        if (this.mode ==='LOW_POWER') {
          results.push({"completed": false})
        }
        else {
          results.push({"completed": true})
          this.position = message.commands[i].value
          console.log(message.commands[i].value);
      }
      }
      if (message.commands[i].commandType === 'MODE_CHANGE') {
        results.push({"completed": true})
        this.mode = message.commands[i].value;
        console.log(this.mode);
      }
      if (message.commands[i].commandType === 'STATUS_CHECK') {
        results.push({"completed": true, "roverStatus": {mode:this.mode, generatorWatts:this.generatorWatts, position:this.position}});
      }   
      
    }
    // return {message:message.name,results: results};
    return response
  }
   /*receiveMessage(message) {
    let results = [];

    for(let i = 0; i < message.commands.length; i++) {
      if(message.commands[i].commandType === "MOVE") {
        if(this.mode === "LOW_POWER") {
          results.push({completed: false});
        }else{
          results.push({completed: true});
          this.position = message.commands[i].value;
        }
      }else if(message.commands[i].commandType === "STATUS_CHECK") {
        results.push({completed: true}, {roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
      }else if(message.commands[i].commandType === "MODE_CHANGE") {
        results.push({completed: true});
        this.mode = message.commands[i].value;
      }
    }

    return {message: message.name, results: results};
  }*/

      /*receiveMessage(message){
          let results = [];
          let  roverStatus = {
            mode: this.mode,
            position: this.position,
            generatorWatts: this.generatorWatts
          };
          let completed = {
            completed: false
          };
          
          for (let i=0; i < message.commands.length; i++){
             let command = message.commands[i].commandType;
             let value = message.commands[i].value;
            //  let roverStatus = this.processCommand(command, value);
           if(command.includes('STATUS_CHECK')){
              let completedStatus = `Completed: true`;
              completed.push(completedStatus);
              roverStatus.push(result);
             if (command.includes('MODE_CHANGE')){
                let completedMode = 'completed: true';
                completed.push(completedMode);
                roverStatus.mode = value;
                this.mode= value;
               if (command.includes('MOVE') && this.mode ==='LOW_POWER') { 
                  let completedMove = 'completed: false'; 
                  completed.push(completedMove);
                  roverStatus.position = this.position; 
                    if (command.includes('MOVE') && this.mode === 'NORMAL') { 
                        let completedMove= 'completed: true';
                        completed.push(completedMove); 
                        roverStatus.position = value; 
                        this.position = value; 
                   }
                }
             
              
              } 
           
            }
            
           let results = {message: message.name , results: completed,roverStatus};
           return results
          }*/

  
}

let rover = new Rover(57);
let response = rover.receiveMessage(message);



console.log (response.results[1].roverStatus);
console.log(response);



module.exports = Rover;

