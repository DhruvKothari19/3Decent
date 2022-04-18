pragma solidity >=0.5.0 <0.9.0;

contract Decentragram {
  // Code goes here...
  string public name= "Decentragram";
  //Store Images
  mapping(uint => Image) public images;
  struct Image{
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author memory;
  }
  //Create Images
  function uploadImage() public {
    images[1] = Image(1,'abc', 'Hello World', 0, address());
   }
  //Tip Images

}