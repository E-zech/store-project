import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../App";
import { RoleTypes } from "../navbar/Navbar";
import { useLocation, useNavigate, useParams, useResolvedPath } from "react-router-dom";
import './ProductComponent.css';
import { Box } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddOrEditProduct from "./managment(CRUD)/AddOrEditProduct";
import { CartContext } from '../../pages/AllProducts.js';


export default function ProductComponent({ product, add2Cart }) {

  const { user, setUser, userRoleType, filteredProducts, setFilteredProducts, setProducts, productsInCart, setProductsInCart, snackbar, loader, setLoader } = useContext(GeneralContext);

  const path = useResolvedPath().pathname;
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false)
  const isAdded = productsInCart.some(item => item._id === product._id);


  const handleClick = () => {
    if (isAdded) {
      // If the item is already in the cart, show a snackbar
      snackbar("Item already in cart");
    } else {
      add2Cart(product._id, product.title, product.price);
    }
    setTimeout(() => {
      setIsSaving(false);
    }, 300);
  };

  const deleteProduct = (id) => {
    setLoader(true);

    const isConfirmed = window.confirm("Are you sure you want to delete this product?");

    if (isConfirmed) {

      fetch(`http://localhost:5000/products/${id}`, {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Authorization': localStorage.token,
          'Content-Type': 'application/json',
        },
      })
        .then(() => {
          setFilteredProducts((filteredProducts) =>
            filteredProducts.filter((product) => product._id !== id)
          );
          setLoader(false);
          snackbar('Card deleted successfully');
        });
    } else {
      setLoader(false);
    }
  }

  return (
    <>
      <section className='container-cards' >
        <Card sx={{
          maxWidth: 345,
          backgroundColor: 'white',
          // backgroundColor: '#f3ead985',
          boxShadow: 'none',
          transition: 'box-shadow 0.3s', // Add transition for smooth effect
          '&:hover': {
            boxShadow: '0px 0px 6px 1px #3333333d', // Apply box shadow on hover
          },
          // boxShadow: '0px 0px 6px 0.5px #acacac8c;',
        }}
          key={product._id}
          className='card' >

          <CardMedia sx={{ transition: "all 0.2s ease-in-out", "&:hover": { cursor: "pointer", transform: "scale(1.02)" } }}
            component="img"
            height="194"
            image={product.imgUrl}
            alt={product.imgAlt}
            onClick={() => navigate(`/product/${product._id}`)} />

          <CardContent sx={{ textAlign: 'center', padding: '0' }}>
            <div className="card-wrapper">
              <h1 className="main-headline"> {product.title} </h1>
            </div>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
              <IconButton aria-label="price">
                {product.price} <AttachMoneyIcon />
              </IconButton>

              <IconButton aria-label="discount" sx={{ textDecoration: 'line-through' }}>
                {product.discount} <AttachMoneyIcon />
              </IconButton>
            </Box>


          </CardContent>

          <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {path === '/' && (
              <>
                <IconButton
                  aria-label="Add or Remove"
                  onClick={() => { setIsSaving(true); handleClick() }}
                  disabled={isSaving}
                >
                  {isAdded ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
                </IconButton>

                <IconButton id='favoriteBtn' aria-label="add to favorites"
                //  onClick={() => toggleFavOrNot(product._id, product.faves)}
                >
                  <FavoriteIcon color={product.faves ? "error" : ""} />
                </IconButton>
              </>
            )}


            {path === '/product-management' && (
              <>
                <IconButton aria-label="Edit" onClick={() => navigate(`/product/add-edit/${product._id}`)}><EditIcon />
                </IconButton>

                <IconButton aria-label="Delete"
                  onClick={() => deleteProduct(product._id)}
                >
                  <DeleteIcon />
                </IconButton>


              </>

            )}
          </CardActions>
        </Card >
      </section >
    </>
  );
}
