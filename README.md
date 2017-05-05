# Healer Debuffs

Sends notifications to yourself or the party when an abnormality has been applied.
Messages are only sent to yourself by default.


## Chat Commands
* Typing "!hd" will toggle the notifications on and off
* Typing "!hd.party" will toggle sending messages to yourself or everyone in party.


## Known Issues
* Unable to determine who overwrote or refreshed an abnormality. The problem is the server sends "C_ABNORMALITY_REFRESH" instead of "C_ABNORMALITY_START", thing is it doesn't say who did the refreshing. 
* Sometimes a misleading notification is sent, such as a Lancer or Priest applying contagion, or another healer applying hurricane when they actually didn't.


## Changelog
### 1.2.0
* [+] Changed command prefix to exclamation '!'
* [+] Commands no longer case-sensitive
* [+] Added slash support
* [+] Changed chat notification channels and removed GM tag
### 1.1.0
* [+] Added C_ABNORMALITY_REFRESH to notify that someone has refreshed an abnormality.


![Screenshot](http://i.imgur.com/txZzgvL.jpg)

