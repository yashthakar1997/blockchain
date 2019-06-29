# Sample Blockchain Example
This application will create new block based on the old block encrypted by sha256 hash.

## Prerequisites
* node server
* Check if for port 3000 
* clone the repository to your environment 

## Installing

```
  cd blockchain
  npm install
  node index.js
```

## Test

* open you web browser and search for 
```
  http://localhost:3000/
```

* click on add new block and it will create new block based on the previous block with the hash

## Built With
- node js
  - express
  - crypto-js/sha256
  - body-parser
- Bootstrap 4
- Jquery

## NODE Js Apis

> GET Request to '/' will render the home page

> POST Request to '/hash' will accept the data to hash and will return hash as data

> GET Request to '/genesis' will return the first block of the block chain

> POST Request to '/addnewblock' will return the new block of the block chain

** Please create a new issue if you find any changes or an new feature is demanded.

