import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useContext, useState, useEffect } from "react";
import { GeneralContext } from "../../App";
import { useNavigate, useResolvedPath } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import { cardContentStyle, cardStyle, cartMediaStyle, containerCardStyle, discountBtnStyle, priceWrapper, titleStyle, totalPriceBtn } from './ProductComponent.style';
import { black, mainColor, transparent, white } from "../../css/Main.style";

export default function ProductComponent({ product }) {
  const [isDiscount, setIsDiscount] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  // const [isFavorite, setIsFavorite] = useState(false)
  const path = useResolvedPath().pathname;
  const navigate = useNavigate();
  const { user, mode, setFilteredProducts, products, setProducts, productsInCart, snackbar, favProducts, setFavProducts, add2Cart, loader, setLoader } = useContext(GeneralContext);

  const isAdded = productsInCart.some(item => item._id === product._id);
  const isFavorite = favProducts.some(item => item._id === product._id); // Check if product is in favorites

  useEffect(() => {
    if (product.discount === 0) {
      setIsDiscount(false)
    }
  }, [path])


  const handleClick = () => {
    if (isAdded) {
      // If the item is already in the cart, show a snackbar
      snackbar("Item already in cart");
    } else {
      add2Cart(product._id, product.title, product.price);
    }
    setIsSaving(false);
  };


  const toggleFavOrNot = (id) => {
    const snackbarMessage = isFavorite ? 'Removed from Favorites' : 'Added to Favorites';

    fetch(`http://localhost:5000/products/faves/${id}`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Authorization': localStorage.token,
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          return snackbar('Network response was not ok : product Component "toggleFavOrNot"');
        }
        return res.json();
      })
      .then(data => {
        setProducts(products => products.map(p => p._id === id ? { ...p, faves: data.faves } : p));
        setFavProducts(favProducts => isFavorite ? favProducts.filter(p => p._id !== id) : [...favProducts, product]); // Toggle product in favorites
        snackbar(snackbarMessage);
      });
  };


  const deleteProduct = (id) => {
    setLoader(true);

    const isConfirmed = window.confirm("Are you sure you want to delete this product?"); // cahnge to a modal or popUp for confirmationn

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
    }
  }

  return (
    <>
      <Container sx={containerCardStyle}>
        <Card key={product._id} sx={{ ...cardStyle, color: mode === 'light' ? black : white, backgroundColor: mode === 'light' ? white : black, }}>

          {isDiscount && (
            <IconButton aria-label="discount"
              sx={{
                ...discountBtnStyle,
                backgroundColor: mode === 'light' ? mainColor : black,
              }}>
              -{product.discount.toFixed(2)}$
            </IconButton>
          )}

          <CardMedia sx={cartMediaStyle}
            component="img"
            image={product.imgUrl}
            alt={product.imgAlt}
            onClick={() => { navigate(`/product/${product._id}`) }} />

          <CardContent sx={cardContentStyle}>
            <Box>
              <Typography sx={titleStyle}>
                {product.title}
              </Typography>
            </Box>

            <Box sx={priceWrapper}>
              {isDiscount &&
                <IconButton aria-label="total-price" sx={totalPriceBtn}>

                  {`${(Math.floor((product.price - product.discount) * 10) / 10).toFixed(1)}0$`}
                </IconButton>

              }

              <IconButton aria-label="price" sx={{
                textDecoration: isDiscount ? 'line-through' : 'none', '&:hover': {
                  backgroundColor: 'white',
                },
              }}>
                {product.price.toFixed(2)}$
              </IconButton>

            </Box>

            {path === '/product-management' &&
              <>
                <Box>
                  <Typography sx={{ textAlign: 'center' }}>
                    In-Stock: {product.totalQuantity} Units
                  </Typography>
                </Box>
              </>
            }


          </CardContent>
          {
            user && <CardActions disableSpacing
              sx={{
                display: 'flex', justifyContent: 'center', alignItems: 'center', border: '2px solid #99c8c2',
                borderTopLeftRadius: '80px', borderTopRightRadius: '5px', borderBottomLeftRadius: '5px', borderBottomRightRadius: '80px',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  borderTopLeftRadius: '5px',
                  borderTopRightRadius: '80px',
                  borderBottomLeftRadius: '80px',
                  borderBottomRightRadius: '5px',

                  backgroundColor: '#99c8c2'
                }

              }}>
              {(path === '/' || path === '/faves') && (
                <>
                  <Tooltip title="Add to cart" arrow sx={{
                    color: "lightblue",
                    backgroundColor: "green"
                  }}>
                    <IconButton
                      aria-label="Add or Remove from cart"
                      onClick={() => { setIsSaving(true); handleClick() }}
                      disabled={isSaving}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                      }}
                    >
                      {isAdded ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
                    </IconButton>
                  </Tooltip>


                  <Tooltip title={isFavorite ? "Remove from favorites" : "Add to favorites"} arrow >
                    <IconButton id='favoriteBtn' aria-label="add to favorites"
                      onClick={() => toggleFavOrNot(product._id,)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                      }}
                    >
                      <FavoriteIcon color={isFavorite ? "error" : ""} />
                    </IconButton>
                  </Tooltip>
                </>
              )}

              {path === '/product-management' && (
                <>
                  <IconButton aria-label="Edit"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'white',
                      },
                    }}
                    onClick={() => { navigate(`/product/add-edit/${product._id}`) }}><EditIcon />
                  </IconButton>

                  <IconButton aria-label="Delete"
                    sx={{
                      '&:hover': {
                        backgroundColor: 'white',
                      },
                    }}
                    onClick={() => deleteProduct(product._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </CardActions>
          }

        </Card>
      </Container>
    </>
  );
}
