import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';

export const DateComponent = ({ datePost, datePost2 }) => {
  dayjs.locale('en')
  dayjs.extend(relativeTime)
  const time1 = dayjs().to(dayjs(datePost))
  const time2 = dayjs().to(dayjs(datePost2))

  return (
    <>
      <span style={{ fontStyle: 'italic', fontWeight: 'normal' }} >{time1}</span>
      {datePost2 && <span style={{ fontStyle: 'italic', fontWeight: 'normal' }} >(updated {time2})</span>}
    </>
  )
}
