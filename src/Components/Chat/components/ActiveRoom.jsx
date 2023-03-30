import { useContext } from "react"
import { ChatContext } from "../context/ChatProvider"

export function ActiveRoom() {
  const { activeRoom, activeRoomName } = useContext(ChatContext);

  if (!activeRoom) return null;
  
  return (
    <div style={{ textAlign: 'center', paddingBottom: '5px' }}>
      {activeRoomName}
    </div>
  )
}