import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

export const DateComponent = (props) => {
  dayjs.locale('en')
  dayjs.extend(relativeTime)
  const { datePost } = props
  const time = dayjs().to(dayjs(datePost))
  return <span style={{ fontStyle: 'italic', fontWeight: 'normal' }} >{time}</span>
}
