pragma solidity >=0.4.21 <0.7.0;

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
