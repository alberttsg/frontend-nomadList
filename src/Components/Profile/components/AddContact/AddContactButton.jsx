import { useContext, useEffect } from "react";
import { ChatContext } from "../../../Chat/context/ChatProvider";
import { ProfileContext } from "../../Profile";
import { Button } from "antd";
import { UserAddOutlined, UserDeleteOutlined } from "@ant-design/icons";

export function AddContactButton() {
  const { userData } = useContext(ProfileContext);
  const { addContact, removeContact, setContacts, contacts } = useContext(ChatContext);

  useEffect(() => {
    setContacts();
  }, [])

  const addedContact = contacts.some(e => e.userId === userData?._id);

  return (
    <>
      {
        !addedContact ?
          <Button
            type='primary'
            style={{
              backgroundColor: '#52B2C8',
              color: 'white',
            }}
            onClick={() => addContact(userData?._id)}
          >
            < UserAddOutlined />
            Add contact
          </Button>
          :
          <Button
            type='primary'
            style={{
              backgroundColor: '#c8c6c7',
              color: 'black',
            }}
            onClick={() => removeContact(userData?._id)}
          >
            < UserDeleteOutlined />
            Remove contact
          </Button>
      }
    </>
  )
}