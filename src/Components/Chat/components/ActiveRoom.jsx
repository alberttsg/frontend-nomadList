import { useContext } from "react"
import { ChatContext } from "../context/ChatProvider"

export function ActiveRoom() {
  const { activeRoomName } = useContext(ChatContext);
  return (
    <div style={{ textAlign: 'center', paddingBottom: '5px' }}>
      {activeRoomName}
    </div>
  )
}