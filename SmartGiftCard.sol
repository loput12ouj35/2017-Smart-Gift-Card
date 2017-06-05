pragma solidity ^0.4.11;

contract GiftCard {
	struct Condition {
        uint8 ageMin;
        uint8 ageMax;
        bool isForMale;
        bool isForFemale;
		
        address shopID;
		
		uint time;
        uint dateMin;
        uint dateMax;
	}

    address public minter;  //never change
    address public owner;
    uint public originalValue = 0;  //never change
    uint public currentValue = 0;
    bool public isTransferable = true;
	Condition public condition = Condition
	(0, 255, true, true,
	0x00000000000000000000000000000000000000,
	99999999, 20170501, 99999999);
    
    function GiftCard(uint _value, bool _isTransferable) {
        minter = msg.sender;
        owner = msg.sender;
        originalValue = _value;
        currentValue = _value;
        isTransferable = _isTransferable;
    }    
    
    function send(address receiver) {
        require (owner == msg.sender);
        require (receiver != msg.sender);
        require (isTransferable || minter == msg.sender || receiver == condition.shopID);
        owner = receiver;
    }
    
    function destroy() {
        require (owner == msg.sender);
        selfdestruct(this);
    }	
    
    function changeValue(uint _input) {
        require (minter == msg.sender);
		require (_input >= originalValue);
        currentValue = _input;
    }
	
    function setCondition
    (uint8 _ageMin, uint8 _ageMax, bool _isForMale, bool _isForFemale,
    address _shopID,
    uint _time, uint _dateMin, uint _dateMax
    )
	{
        require (minter == msg.sender);
        require (minter == owner);
        
        if(!isTransferable)
            _shopID = 0x00000000000000000000000000000000000000;
        
		condition = Condition(_ageMin, _ageMax, _isForMale, _isForFemale,
		_shopID,
		_time, _dateMin, _dateMax
		);
    }
}