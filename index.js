// vers 1.2
const MESSAGE_SENDER_NAME = 'Healer Debuffs',
ABNORMALITY_CONTAGION = 701700,
ABNORMALITY_HURRICANE = 60010

let SEND_TO_PARTY = false,		// false = send to yourself only, true = send to everyone in party
MESSAGE_CHANNEL = 1,			// party = 1, p-notice = 21, raid = 32, r-notice = 25
SEND_NOTIFICATION = true

const format = require('./format.js');

module.exports = function HealerDebuffs(dispatch) {
	let	partyMembers = null

	dispatch.hook('sPartyMemberList', 1, (event) => {
		partyMembers = event
	})	
  
    dispatch.hook('sAbnormalityBegin', 1, (event) => {

		if (partyMembers == null) return
	
		if (event.id == ABNORMALITY_CONTAGION || event.id == ABNORMALITY_HURRICANE)
		{	
			for (var i in partyMembers.members)
			{				
				if (partyMembers.members[i].cID - event.source == 0)  // !NOTE: This can't be right, should to try something different
				{
					var memberName = partyMembers.members[i].name
					var durationSeconds = (event.duration * 0.001)
					
					switch (event.id) 
					{
						case ABNORMALITY_CONTAGION:
							sendNotification(memberName + ' - Contagion (' + durationSeconds + 's)')
							break;
						case ABNORMALITY_HURRICANE:
							sendNotification(memberName + ' - Hurricane (' + durationSeconds + 's)')
							break;
					}
				}
			}
		}
	})
  
	/*Definition is missing source datatype, unable to determine who casted the skill...*/
    dispatch.hook('sAbnormalityRefresh', 1, (event) => {

		if (partyMembers == null) return
		
		if (event.id == ABNORMALITY_CONTAGION || event.id == ABNORMALITY_HURRICANE)
		{	
			var memberName = '??????'
			var durationSeconds = (event.duration * 0.001)
					
			switch (event.id) 
			{
				case ABNORMALITY_CONTAGION:
					sendNotification(memberName + ' - Contagion (' + durationSeconds + 's)')
					break;
				case ABNORMALITY_HURRICANE:
					sendNotification(memberName + ' - Hurricane (' + durationSeconds + 's)')
					break;
			}
		}
	})
  
  dispatch.hook('cChat', (event) => {
	let command = format.stripTags(event.message).split(' ');
		
    if (command[0].toLowerCase() === '!hd.party') {
		toggleSendingMessagesToParty();
		return false;
    }
	else if (command[0].toLowerCase() === '!hd') {
		toggleNotificationsOnOff();
		return false;
	}
  })
  
	function toggleSendingMessagesToParty() {
		SEND_TO_PARTY = !SEND_TO_PARTY;
		
		if (SEND_TO_PARTY) systemMsg('<FONT>Messages are now sent to your party.</FONT>');
		else systemMsg('<FONT>Messages are now only visible for you.</FONT>');
	}
  
	function toggleNotificationsOnOff() {
		SEND_NOTIFICATION = !SEND_NOTIFICATION
		systemMsg('<FONT>Messages are now ' + (SEND_NOTIFICATION ? 'enabled' : 'disabled') + '</FONT>')
	}
  
	function systemMsg(message) {
		dispatch.toClient('sChat', {
          channel: 24,
          authorID: { high: 0, low: 0 },
          unk1: 0,
          gm: 0,
          unk2: 0,
		  authorName: '',
          message: ' {' + MESSAGE_SENDER_NAME + '} ' + message
        })
	}
  
  function sendNotification(message) { 
	if (SEND_NOTIFICATION == false) return
  
    if (SEND_TO_PARTY) {
      dispatch.toServer('cChat', {
        channel: MESSAGE_CHANNEL,
        message: message
      })
    } else {
      dispatch.toClient('sChat', {
        channel: MESSAGE_CHANNEL,
        authorID: { high: 0, low: 0 },
        unk1: 0,
        gm: 0,
        unk2: 0,
        authorName: MESSAGE_SENDER_NAME,
        message: message
      })
    }
  }
  
	// slash support, thanks to wuaw for snippet
	try {
		const Slash = require('slash')
		const slash = new Slash(dispatch)
		slash.on('hd', args => toggleNotificationsOnOff())
		slash.on('hd.party', args => toggleSendingMessagesToParty())
	} catch (e) {
		// do nothing because slash is optional
	}
  
}
