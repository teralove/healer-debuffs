// vers 1.1
const MESSAGE_SENDER_NAME = 'Healer Debuffs',
ABNORMALITY_CONTAGION = 701700,
ABNORMALITY_HURRICANE = 60010

let SEND_TO_PARTY = false,		// false = send to yourself only, true = send to everyone in party
MESSAGE_CHANNEL = 1,			// party = 1, p-notice = 21, raid = 32, r-notice = 25
SEND_MESSAGES = true

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
				if (partyMembers.members[i].cID - event.source == 0)
				{
					var memberName = partyMembers.members[i].name
					var durationSeconds = (event.duration * 0.001)
					
					switch (event.id) 
					{
						case ABNORMALITY_CONTAGION:
							sendChatMessage(memberName + ' - Contagion (' + durationSeconds + 's)')
							break;
						case ABNORMALITY_HURRICANE:
							sendChatMessage(memberName + ' - Hurricane (' + durationSeconds + 's)')
							break;
					}
				}
			}
		}
	})
  
	/*Protocal version 1 is missing source datatype, unable to determine who casted the skill...*/
    dispatch.hook('sAbnormalityRefresh', 1, (event) => {

		if (partyMembers == null) return
		
		if (event.id == ABNORMALITY_CONTAGION || event.id == ABNORMALITY_HURRICANE)
		{	
			var memberName = '??????'
			var durationSeconds = (event.duration * 0.001)
					
			switch (event.id) 
			{
				case ABNORMALITY_CONTAGION:
					sendChatMessage(memberName + ' - Contagion (' + durationSeconds + 's)')
					break;
				case ABNORMALITY_HURRICANE:
					sendChatMessage(memberName + ' - Hurricane (' + durationSeconds + 's)')
					break;
			}
		}
	})
  
  dispatch.hook('cChat', (event) => {	  
    if (/^<FONT>.hd.party<\/FONT>$/i.test(event.message)) {		
      if (SEND_TO_PARTY) {
        SEND_TO_PARTY = false
        dispatch.toClient('sChat', {
          channel: 2,
          authorID: { high: 0, low: 0 },
          unk1: 0,
          gm: 1,
          unk2: 0,
		  authorName: MESSAGE_SENDER_NAME,
          message: '<FONT>Messages are now only visible for you.</FONT>'
        })
      } else {
        SEND_TO_PARTY = true
        dispatch.toClient('sChat', {
          channel: 2,
          authorID: { high: 0, low: 0 },
          unk1: 0,
          gm: 1,
          unk2: 0,
		  authorName: MESSAGE_SENDER_NAME,
          message: '<FONT>Messages are now sent to your party.</FONT>'
        })
      }
      return false
    }
	else if (/^<FONT>.hd<\/FONT>$/i.test(event.message)) {	
		SEND_MESSAGES = !SEND_MESSAGES
		
		var sendMessageStatus = null
		if (SEND_MESSAGES) sendMessageStatus = 'enabled' 
		else sendMessageStatus = 'disabled'
			
		dispatch.toClient('sChat', {
          channel: 2,
          authorID: { high: 0, low: 0 },
          unk1: 0,
          gm: 1,
          unk2: 0,
		  authorName: MESSAGE_SENDER_NAME,
          message: '<FONT>Messages have been ' + sendMessageStatus + '</FONT>'
        })
		return false
	}
  })
  
  function sendChatMessage(message) { 
	if (SEND_MESSAGES == false) return
  
    if (SEND_TO_PARTY) {
      dispatch.toServer('cChat', {
        channel: MESSAGE_CHANNEL,
        message: '<FONT>' + message + '</FONT>'
      })
    } else {
      dispatch.toClient('sChat', {
        channel: MESSAGE_CHANNEL,
        authorID: { high: 0, low: 0 },
        unk1: 0,
        gm: 1,
        unk2: 0,
        authorName: MESSAGE_SENDER_NAME,
        message: '<FONT>' + message + '</FONT>'
      })
    }
  }
}
