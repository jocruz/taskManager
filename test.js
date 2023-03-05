function callTwice(fn) {
    return function(x) {
      //(x);
      console.log(x);
      //fn(x);
    };
  }
  
  function logMessage(message) {
    console.log(message);
  }
  
  

  const logMessageTwice = callTwice(logMessage);
  
  logMessageTwice("Hello"); // logs "Hello" twice
