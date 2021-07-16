import React from 'react'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
// import Button from 'react-bootstrap/Button'
import {AiOutlineSearch} from 'react-icons/ai'

function SearchInput() {
    return (
        <InputGroup>
            <FormControl  placeholder='Enter tag or todo title'
                aria-label='search-todos'/>
            <InputGroup.Text id='searchIcon'>
                <AiOutlineSearch />
            </InputGroup.Text>
        </InputGroup>
    )
}

export default SearchInput
