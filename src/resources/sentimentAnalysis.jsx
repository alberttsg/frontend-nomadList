import { BsEmojiAngry, BsEmojiDizzy, BsEmojiNeutral, BsEmojiSmile } from 'react-icons/bs';
import { FaRegSadCry } from 'react-icons/fa';
import './sentimentAnalysis.scss';

export const emojisBySentiment = (sentiment) => {
  switch (sentiment) {
    case 1:
      return <span className="emojis" style={{ color: 'rgba(0, 0, 0, 0.88)' }}><BsEmojiDizzy /></span>
    case 2:
      return <span className="emojis" style={{ color: 'rgb(255, 0, 60)' }}><BsEmojiAngry /></span>
    case 3:
      return <span className="emojis" style={{ color: 'rgb(170, 195, 232)' }}><FaRegSadCry /></span>
    case 4:
      return <span className="emojis" style={{ color: 'rgb(246, 221, 0)' }}><BsEmojiSmile /></span>
    case 5:
      return <span className="emojis" style={{ color: 'rgb(151, 50, 74)' }}><BsEmojiNeutral /></span>
    default:
      return null;
  }
}

