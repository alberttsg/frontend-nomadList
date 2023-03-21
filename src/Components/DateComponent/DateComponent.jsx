import React from 'react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
import * as locale from 'dayjs/locale/es'


export const DateComponent = (props) => {
  dayjs.locale(locale)
  dayjs.extend(relativeTime)
  const {datePost} = props
  const dateString = dayjs(datePost).format('YYYY-MM-DD')
  const time = dayjs().to(dayjs(dateString))
  return (
    <div>
      <span>{time} <br></br>{datePost}</span>
    </div>
  )
}
