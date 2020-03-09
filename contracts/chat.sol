pragma solidity >=0.4.21 <0.7.0;

contract TextMessage {
    // define event

    event NewText(
        address indexed sender,
        address indexed receiver,
        string content
    );

    function sendMessage(
        address _sender,
        address _receiver,
        string memory _content
    ) public {
        // emit event
        emit NewText(_sender, _receiver, _content);
    }

}
