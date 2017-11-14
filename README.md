# phillyMotoCraigslist

>This was my Treehouse Full Stack Dev certificate capstone demo. You can see a working version of this on [YouTube](https://youtu.be/v0DUT5olGbk).

This is a MEAN stack app (MongoDB, ExpressJS, AngularJS, NodeJS) that searches Philadelphia Craigslist motorcycle listings, saves listings, and allows a user to annotate listings. It doesn't have to be for the Philly area, nor limited to motorcycle listings. I just happen to live in the Philly area and like motorcycles. It was a no-brainer when creating my Capstone project for my Treehouse capstone project. You can pretty much configure this for just about anything and anywhere when perusing Craigslist.

### Installing Packages
You should run these commands in order to install dependent libraries/packages.

 - `npm install`

### Start Up
Type the following command to get it up an running after starting your Mongo database and shell...

 - `npm start`

### Major Libraries Used
I used the the following libraries for the heavy listing for the app. On the UI side, I used John Papa's ["Hot Towel"](https://github.com/johnpapa/generator-hottowel) Angular starter using a Yeoman Generator. And I also used Joshua Thomas' [Craiglist Search Driver](https://www.npmjs.com/package/node-craigslist) for Node, because CL doesn't have an API.

The Hot Towel and Craigslist Search Driver are both well annotated. I would recommend perusing the documentation in order to customize and/or expand on this project.

### Sample ENV file
There is a sample environment file with slots for Github and Google credentials. This file should be filed out with the appropriate information and saved as ".env" in the root of your project, at the same level as the package.json. API credentials required...

* Github
* Google
* Google Maps
