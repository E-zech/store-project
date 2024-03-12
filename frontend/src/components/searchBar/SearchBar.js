import React, { useContext, useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { GeneralContext } from '../../App';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

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

// const ClearButton = styled(IconButton)(({ theme }) => ({
//     position: 'absolute',
//     right: theme.spacing(1),
//     top: '50%',
//     transform: 'translateY(-50%)',
//     color: 'white'
// }));

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState('');
    // const [showClearButton, setShowClearButton] = useState(false);
    const { setFilteredProducts, setLoader, products, setProducts, initialProducts, setInitialProducts } = useContext(GeneralContext);

    const navigate = useNavigate();
    const path = useResolvedPath().pathname;

    const handleChange = (value) => {
        console.log(`the value is: ${value}`)
        const lowercaseValue = value.toLowerCase().trim();
        console.log(`the lowercaseValue is: ${lowercaseValue}`)
        setSearchValue(value);
        const searchProducts = initialProducts.filter(p => p.title.toLowerCase().includes(lowercaseValue));
        console.log(`the searchProducts is: ${searchProducts}`)

        setProducts(searchProducts);
        // setShowClearButton(value.length > 0);
    };

    const handleClear = () => {
        setSearchValue('');
        // setShowClearButton(false);
        setProducts(initialProducts);
    };

    useEffect(() => {
        handleClear();
    }, [path]);

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
