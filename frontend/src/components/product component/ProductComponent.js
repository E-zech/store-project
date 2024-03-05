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
import AddOrEditProduct from "../../pages/add or edit product/AddOrEditProduct";
import Tooltip from '@mui/material/Tooltip';



export default function ProductComponent({ product, add2Cart }) {

  const { user, setUser, userRoleType, filteredProducts, setFilteredProducts, setProducts, productsInCart, setProductsInCart, snackbar, loader, setLoader, favProducts, setFavProducts } = useContext(GeneralContext);

  const path = useResolvedPath().pathname;
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const isAdded = productsInCart.some(item => item._id === product._id);
  const [isDiscount, setIsDiscount] = useState(true);

  useEffect(() => {
    if (product.discount === 0) {
      setIsDiscount(false)
    }
  }, [])


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

  const toggleFavOrNot = (id, faves) => {
    setLoader(true);

    const snackbarMessage = faves.includes(user._id) ? 'Removed from Favorites' : 'Added to Favorites';

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
        console.log(data)
        setProducts(products => products.map(p => p._id === id ? { ...p, faves: data.faves } : p));
        setFilteredProducts(products => products.map(p => p._id === id ? { ...p, faves: data.faves } : p));
        if (faves.includes(user._id)) {
          // If the product is already in favorites, remove it from favProducts
          setFavProducts(favProducts => favProducts.filter(p => p._id !== id));
        }
        setLoader(false);
        snackbar(snackbarMessage);
      });
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
      <section className='container-cards'>
        <Card sx={{
          maxWidth: 300,
          position: 'relative', // Ensure Card has a positioning context
          backgroundColor: 'white',
          boxShadow: 'none',
          transition: 'box-shadow 0.3s',
          '&:hover': {

            boxShadow: 'none'
            // boxShadow: '0px 0px 6px 1px #b6b6b6',
          },
        }}
          key={product._id}
          className='card'>

          {isDiscount && (
            <IconButton aria-label="discount" sx={{
              position: 'absolute',
              width: '115px',
              top: '45px',
              left: '-9px',
              color: 'white',
              padding: '6px 5px 5px 3px',
              transform: 'rotate(319deg)',
              transformOrigin: 'left bottom',
              fontSize: '0.8rem',
              textAlign: 'center',
              zIndex: 2,
              borderRadius: '5px',
              backgroundColor: '#99c8c2',
              '&:hover': {
                backgroundColor: '#99c8c2',
              },
            }}>
              -{product.discount.toFixed(2)}$
            </IconButton>
          )}

          <CardMedia sx={{ position: 'relative', transition: "all 0.2s ease-in-out", "&:hover": { cursor: "pointer", transform: "scale(1.02)" } }}
            component="img"
            height="194"
            image={product.imgUrl}
            alt={product.imgAlt}
            onClick={() => navigate(`/product/${product._id}`)} />

          <CardContent sx={{
            textAlign: 'center', padding: '0',
          }}>
            <div className="card-wrapper">
              <h1 className="main-headline"> {product.title} </h1>
            </div>

            <Box sx={{
              display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
            }}>
              {isDiscount &&
                <IconButton aria-label="total-price" sx={{
                  '&:hover': {
                    backgroundColor: 'white',
                  },
                }}>

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
                      aria-label="Add or Remove"
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


                  <Tooltip title="Add to favorites" arrow >
                    <IconButton id='favoriteBtn' aria-label="add to favorites"
                      onClick={() => toggleFavOrNot(product._id, product.faves)}
                      sx={{
                        '&:hover': {
                          backgroundColor: 'white',
                        },
                      }}
                    >
                      <FavoriteIcon color={product.faves?.includes(user?._id) ? "error" : ""} />
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
                    onClick={() => navigate(`/product/add-edit/${product._id}`)}><EditIcon />
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
      </section>

    </>
  );
}
