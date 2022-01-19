# ACL Airlines :blush:
***
## Description
This project is a semi-complete airline reservation system. A guest user will be able to sign up, browse through all available flights and start making a reservation. A registered user can do the same (except for signing up) as well as complete making the reservation and pay for them, checking previous bookings, access their profile, change their information and password, viewing specific itineraries, change upcoming reservations and be charged extra/refunded if needed or cancel them and get emails with their up-to-date booking information.

## How to run
The Frontend and backend are independent. In order to run this project user should open two terminals with paths
### Install
#### Frontend Terminal
```\client```
#### Backend Terminal
```\server```
On the two parallel terminals run:
```npm i```

### Run
Run the following on each terminal (run the server side first)
#### Frontend Terminal
```npm start```
#### Backend Terminal
```node index```
A website with the url "localhost:3000" should automatically open in your browser

### Rest API
The folder containing all the routes for the REST API in our application is
```\server\router\...```
with subfolders containing routes for general, admin and user usage.

## Endpoints
The folder containing all the endpoints in our application is
```\server\controller```

## Tech/Framework Used
MERN Stack
- MongoDB - document database
- Express(.js) - Node.js web framework
- React(.js) - a client-side JavaScript framework
- Node(.js) - the premier JavaScript web server