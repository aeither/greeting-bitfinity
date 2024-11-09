// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Greeting {
    // Array to store submitted names
    string[] public submittedNames;
    
    // Event to emit when a new greeting is created
    event NewGreeting(string name, string greeting);
    
    // Greet function that takes a name and returns a greeting
    function greet(string memory name) public returns (string memory) {
        // Store the name in the array
        submittedNames.push(name);
        
        // Create the greeting message
        string memory greeting = string(
            abi.encodePacked("Hello, ", name)
        );
        
        // Emit the greeting event
        emit NewGreeting(name, greeting);
        
        return greeting;
    }
    
    // Function to get all submitted names
    function getSubmittedNames() public view returns (string[] memory) {
        return submittedNames;
    }
    
    // Function to get the count of submitted names
    function getSubmittedNamesCount() public view returns (uint256) {
        return submittedNames.length;
    }
}