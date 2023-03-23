import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { searchService } from '../../service/searchService';
import { Input, Dropdown } from 'antd';

export const SearchBar = () => {
  const [isLoading, setIsLoading] = useState('')
  const [isDropdownOpen, setDropdownOpen] = useState(false)
  const [searchResult, setSearchResult] = useState()
  const navigate = useNavigate()

  const onSearch = async (input) => {
    if (!input) return;
    setIsLoading(true);
    const result = await searchService(input);
    setSearchResult(result);
    setDropdownOpen(true);
    setIsLoading(false);
  }

  return (
    <>
      <Dropdown
        menu={{
          items: searchResult,
          onClick: (item) => navigate(item.key),
          onBlur: () => setDropdownOpen(false),
        }}
        open={isDropdownOpen}
      >
        <Input.Search
          allowClear={true}
          loading={isLoading}
          onSearch={(input) => onSearch(input)}
          enterButton='Search'
        />
      </Dropdown>
    </>
  )
}

