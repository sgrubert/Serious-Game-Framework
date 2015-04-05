Serious Game Framework
======================

A framework targeted at university professors and other educators to create simple Serious Games and let them be played by their students and pupils.

## Installation guide

+ Install NodeJS
    + We recommend running v0.10.30, as there are often compatibility problems with node_modules.
+ Install MongoDB
+ Go to folder gleaner-frontend within lib folder
    + Install dependencies with ```npm install```
    + Make sure that the _node\_modules_ as well as _bower\_components_ are installed
+ [Create new user in gleaner-frontend ```node bin/install <username\> <password\>```]
+ Start gleaner-frontend with ```node app/app.js```
+ [Login]
+ Navigate to localhost:3000, where the node application was started
    + Create a new Game
    + Create a new Version for this game
+ Copy Tracking Code to _Serious-Game-Framework/lib/gleaner-tracker.js_
    + The code line is high up in the file, a comment will mark the correct line
+ Copy first 24 characters of Tracking Code to _gleaner\_data/lib/traces\_.js_
    + A comment will mark the correct line
+ After changing the configuration, restart the gleaner-frontend server
    + ```CTRL+C``` to terminate the server, ```node app/app.js``` to restart

## License

Copyright (c) 2014 Simon Grubert & Marko Kajzer, Advanced Community Information
Systems (ACIS) Group, Chair of Computer Science 5 (Databases & Information Systems),
RWTH Aachen University, Germany All rights reserved.

Redistribution and use in source and binary forms, with or without modification, are
permitted provided that the following conditions are met:

* Redistributions of source code must retain the above copyright notice, this list of
conditions and the following disclaimer.

* Redistributions in binary form must reproduce the above copyright notice, this list of
conditions and the following disclaimer in the documentation and/or other materials
provided with the distribution.

* Neither the name of the {organization} nor the names of its contributors may be used to
endorse or promote products derived from this software without specific prior written
permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED
TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A
PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
