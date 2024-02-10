import React, { useContext, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { GeneralContext } from '../../App';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));


export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    const [allProducts, setAllProducts] = useState([]);

    const { setFilteredProducts } = useContext(GeneralContext);

    useEffect(() => {
        fetch(`http://localhost:5000/products`, {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                setAllProducts(data);
                setFilteredProducts(data);
            });
    }, [])


    const handleChange = (value) => {
        const lowercaseValue = value.toLowerCase().trim();
        setSearchValue(value);

        const searchProducts = allProducts.filter(p => p.title.toLowerCase().startsWith(lowercaseValue));;

        setFilteredProducts(searchProducts);
    };


    return (
        <Box sx={{ flexGrow: 1 }}>

            <Search>
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>

                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                    value={searchValue}
                    onChange={(ev) => handleChange(ev.target.value)} />
            </Search>

        </Box>
    );
}
