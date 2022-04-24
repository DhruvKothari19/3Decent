pragma solidity >=0.6.0 <0.9.0;

contract Decentragram {
  // Code goes here...
  string public name= "Decentragram";
  //Store Images
  uint public imageCount = 0;
  Comment[] public comments;
  mapping(uint => Image) public images;
  mapping (uint => uint[]) public commentsFromPost;
  mapping (uint => address) public commentFromAccount;
  struct Image{
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
  }
  struct Comment {
      string comment;
    }
  event ImageCreated(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
);
  event CommentAdded(
    uint commentId,
    address author
  );
  event ImageTipped(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
);

  //Create Images
  function uploadImage(string memory _imgHash, string memory _description) public {
    //Image exists
    require(bytes(_imgHash).length > 0);
    //Image description exists
    require(bytes(_description).length > 0);
    //Uploader address exists
    require(msg.sender != address(0x0));
    //Increment image id
    imageCount++;
    // Add image to contract
    images[imageCount] = Image(imageCount,_imgHash, _description, 0, payable(msg.sender));

    emit ImageCreated(imageCount, _imgHash, _description, 0, payable(msg.sender));
    

   }
  //Tip Images
  function tipImageOwner(uint _id) public payable {
    require(_id > 0 && _id <= imageCount);
    
    Image memory _image = images[_id];

    address _author = _image.author;
    require(msg.sender != _author);
    payable(address(_author)).transfer(msg.value);
    _image.tipAmount = _image.tipAmount + msg.value;
    images[_id] = _image; 
    emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, payable(_author)); 
  }
  //Comments
   function newComment(string memory _comment) public {
        Comment memory comment = Comment(_comment);
        comments.push(comment);
        uint commentId = comments.length - 1;

        commentFromAccount[commentId] = msg.sender;
        emit CommentAdded(commentId,msg.sender);
    }
}