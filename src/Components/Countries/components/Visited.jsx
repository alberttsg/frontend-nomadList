import { PlusCircleTwoTone} from '@ant-design/icons';
import { Avatar, Button, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';
import { addVisitor } from '../../../service/countryService';

const Visited = ({visitorAvatar}) => {
  // const [beenThere, setBeenThere] = useState(false);
// useEffect(()=>{
//   // ountry.visitor.visited // checkar si visitante ya ha visitado  mediante peticion axios o estado//
// console.log('useEfeeeect')
// },[])
  // const  = async ()=>{
  //  const res = await addVisitor(country._id, user._id);
  //  console.log(res)
  //  return res;
  // }
    return (
        <Button style={{marginLeft: '100px'}} type='secondary'>
          <PlusCircleTwoTone twoToneColor={'lightgray'} onClick={()=>{
            
            console.log('hola')
            
            }} style={{fontSize: '26px', background: 'transparent'}} />
        </Button>

    );
};

export default Visited;
// onClick={()=>beenThere(visitorAvatar._id, country._id)}