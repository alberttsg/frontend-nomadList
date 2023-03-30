import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { searchByName } from '../../service/searchServ';
import { Input, Dropdown } from 'antd';

export const Header = () => {
  const [isLoading, setIsLoading] = useState('')
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [searchResult, setSearchResult] = useState()
  const navigate = useNavigate()

  const onSearch = async (input) => {
    if (!input) return;
    setIsLoading(true);
    const result = await searchByName(input);
    setSearchResult(result);
    setDropdownOpen(true);
    setIsLoading(false);
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }} onMouseLeave={() => setDropdownOpen(false)}>
      <Dropdown
        menu={{
          items: searchResult,
          onClick: (item) => navigate(item.key)
        }}
        open={isDropdownOpen}
        destroyPopupOnHide={true}
        autoAdjustOverflow={true}
        size='small'
      >
        <Input.Search
          bordered={true}
          allowClear={true}
          loading={isLoading}
          onSearch={(input) => onSearch(input)}
          placeholder='Find users in Nomad'
          enterButton='Search'
        />
      </Dropdown>
    </div>
  )
}