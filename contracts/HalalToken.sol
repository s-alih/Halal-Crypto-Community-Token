// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract HCC {
    string public name = "Halal Crypto Community";
    string public symbol = "HCC";
    uint8 public decimals = 18;

    event Approval(address indexed src, address indexed guy, uint wad);
    event Transfer(address indexed src, address indexed dst, uint wad);
    event Deposit(address indexed dst, uint wad);
    event Withdrawal(address indexed src, uint wad);

    mapping(address => uint) public balanceOf;
    mapping(address => mapping(address => uint)) public allowance;

    receive() external payable {
        deposit();
    }

    function deposit() public payable {
        balanceOf[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint islm) public {
        require(balanceOf[msg.sender] >= islm);
        balanceOf[msg.sender] -= islm;
        payable(msg.sender).transfer(islm);
        emit Withdrawal(msg.sender, islm);
    }

    function totalSupply() public view returns (uint) {
        return address(this).balance;
    }

    function approve(address guy, uint islm) public returns (bool) {
        allowance[msg.sender][guy] = islm;
        emit Approval(msg.sender, guy, islm);
        return true;
    }

    function transfer(address dst, uint islm) public returns (bool) {
        return transferFrom(msg.sender, dst, islm);
    }

    function transferFrom(
        address src,
        address dst,
        uint islm
    ) public returns (bool) {
        require(balanceOf[src] >= islm);

        if (src != msg.sender && allowance[src][msg.sender] != type(uint).max) {
            require(allowance[src][msg.sender] >= islm);
            allowance[src][msg.sender] -= islm;
        }

        balanceOf[src] -= islm;
        balanceOf[dst] += islm;

        emit Transfer(src, dst, islm);

        return true;
    }
}
