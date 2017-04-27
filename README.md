# Healer Debuffs

Sends notifications to user or party when an abnormality has been applied.
Messages are only sent to yourself by default, see chat commands. Or in index.js set SEND_TO_PARTY to true.


## Chat Commands
* Typing ".hd" will toggle the notifications on and off
* Typing ".hd.party" will toggle sending messages to self or everyone in party.


## Known Bugs
* No notification is sent if an abnormality overwrites another abnormality. Notifications are only sent if the target didn't have the abnormality currently applied.
The problem happens when an abnormality overwrites another abnormality on a target, the server sends "C_ABNORMALITY_REFRESH", but at the moment, there is no source data, 
thus unable to determine who refreshed the abnormality. 
* Sometimes a misleading notification is sent, such as a Priest casting contagion, or another healer casting hurricane when they actually didn't. Not sure what the cause could be.


## Changelog
### 1.1.0
* [+] Added C_ABNORMALITY_REFRESH to notify that someone has refreshed an abnormality.


![Screenshot](http://i.imgur.com/txZzgvL.jpg)

