// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Greeting} from "../src/Greeting.sol";

contract DeployScript is Script {
    Greeting public greeting;

    function setUp() public {}

    function run() public {
        vm.startBroadcast();

        greeting = new Greeting();

        vm.stopBroadcast();
    }
}
