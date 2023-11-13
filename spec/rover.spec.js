const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  it("constructor sets position and default values for mode and generatorWatts", function() {
    expect( new Rover(5).position).toBe(5);
    expect(new Rover(5).mode).toBe("NORMAL");
    expect(new Rover(5).generatorWatts).toBe(110);
  });
  it("response returned by receiveMessage contains the name of the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);   
    let response = new Rover(5).receiveMessage(message);
    expect (response.message).toEqual("Test message with two commands");
  });
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test message with two commands', commands);   
    let response = new Rover(5).receiveMessage(message);
    expect (response.results.length).toEqual(message.commands.length);
  });
  
  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('check status', commands);
    let rover = new Rover(5);
    let response = rover.receiveMessage(message);
    let testStatus= {mode: (rover.mode), generatorWatts: (rover.generatorWatts), position: (rover.position)};
    expect(response.results[0].roverStatus).toEqual(testStatus);
  });
  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Changing mode', commands);
    let rover = new Rover(5);
    let response = rover.receiveMessage(message);
    expect(rover.mode).toEqual('LOW_POWER');
  });
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 2000)];
    let message = new Message('false value', commands);
    let rover = new Rover(5);
    let response = rover.receiveMessage(message);
    expect(response.results[1]).toEqual({completed: false});
    expect(rover.position).toEqual(5);
  });
  it("responds with position for move command", function() {
    let commands = [new Command('MOVE', 2000)];
    let message = new Message('position change', commands);
    let rover = new Rover(5);
    let response = rover.receiveMessage(message);
    expect(rover.position).toEqual(2000);
  });

});
