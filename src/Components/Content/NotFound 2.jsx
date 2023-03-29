import { Result } from 'antd'

export function NotFound() {
  return (
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you were looking for does not exist.'
    />
  )
}