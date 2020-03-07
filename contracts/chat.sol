pragma solidity >=0.4.21 <0.7.0;

// contract Owned {
//     address public owner;

//     function owned() public {
//         owner = msg.sender;
//     }

//     modifier onlyOwner {
//         if (msg.sender != owner)
//             revert("Message sender is different from its owner");
//         _;
//     }

//     function transferOwnership(address newOwner) public onlyOwner {
//         owner = newOwner;
//     }
// }

contract TextMessage {
    uint256 cost;
    bool public enabled;

    // Stores msg index + sender
    mapping(uint256 => address) internal sendersPerIndex;
    // Stores msg index + msg content
    mapping(uint256 => string) internal contentsPerIndex;
    // Stores all the msg indexes
    uint256[] internal msgIndices;

    event NewText(address sender, string content);

    // function sendText(string memory phoneNumber, string memory textBody) public payable {
    //     if (!enabled) revert("");
    //     if (msg.value < cost) revert("");
    //     sendMsg(phoneNumber, textBody);
    // }

    function sendMessage(address _sender, string memory _content) public {
        // Calculate the next message index
        uint256 msgIndex = msgIndices.length;

        // Store the messages
        sendersPerIndex[msgIndex] = _sender;
        contentsPerIndex[msgIndex] = _content;
        msgIndices.push(msgIndex);
        emit NewText(_sender, _content);
    }

}
