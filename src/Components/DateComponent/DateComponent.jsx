import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

export const DateComponent = (props) => {
  dayjs.extend(relativeTime)
  const {datePost} = props
  console.log(datePost)
  const dateString = dayjs(datePost).format('YYYY-MM-DD')
  return (
    <div>
      {dayjs().to(dayjs(dateString))}
    </div>
    
  )
}
