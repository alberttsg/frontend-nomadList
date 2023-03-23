import { Button } from 'antd';
import { useNavigate } from 'react-router';

export function Logo({ size, width }) {
  const navigate = useNavigate();
  return (
    <Button
      type='secondary'
      style={{
        fontFamily: 'Monoton',
        fontSize: size + 'px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: width + '%',
        height: size * 1.1 + 'px',
      }}
      onClick={() => navigate('/')}
    >Nomad
    </Button>
  )
}