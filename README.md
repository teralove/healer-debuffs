# Healer Debuffs

Sends notifications to user or party when an abnormality has been applied.
Messages are only sent to yourself by default, see chat commands. Or in index.js set SEND_TO_PARTY to true.


## Chat Commands
* Typing "!hd" will toggle the notifications on and off
* Typing "!hd.party" will toggle sending messages to yourself or everyone in party.


## Known Bugs
* No notification is sent if an abnormality overwrites another matching abnormality. Notifications are only sent if the target didn't have the abnormality currently applied.
The problem happens when abnormality is refreshed rather than starting, the server sends "C_ABNORMALITY_REFRESH", thing is it's unable to determine who refreshed the abnormality. 
* Sometimes a misleading notification is sent, such as a Priest applying contagion, or another healer applying hurricane when they actually didn't.


## Changelog
### 1.2.0
* [+] Changed command prefix to exclamation '!'
* [+] Commands no longer case-sensitive
* [+] Added slash support
* [+] Changed chat notification channels and removed GM tag
### 1.1.0
* [+] Added C_ABNORMALITY_REFRESH to notify that someone has refreshed an abnormality.


![Screenshot](http://i.imgur.com/txZzgvL.jpg)

