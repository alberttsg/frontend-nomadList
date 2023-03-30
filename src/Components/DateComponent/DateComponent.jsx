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
      <span style={{ padding: '0.8px 0px 0 0', color: 'gray' ,fontStyle: 'italic', fontWeight: 'normal', fontSize: '10px' }} >{time1}</span>
      {datePost2 && datePost2 !== datePost && <span style={{ fontStyle: 'italic', fontWeight: 'normal', fontSize: '10px' }} >(updated {time2})</span>}
    </>
  )
}
