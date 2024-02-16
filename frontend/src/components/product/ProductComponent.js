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

  const isAdded = productsInCart.some(item => item._id === product._id);


  const handleClick = () => {
    if (isAdded) {
      // If the item is already in the cart, show a snackbar
      snackbar("Item already in cart");
    } else {
      handleAddToCart(product._id, product.title, product.price);
    }
  };

  const handleAddToCart = (productId, title, price,) => {
    add2Cart(productId, title, price);
  };

  // const toggleFavOrNot = (id, favorite) => {
  //   setLoader(true);

  //   const snackbarMessage = favorite ? 'Removed from Favorites' : 'Added to Favorites';

  //   fetch(`http://localhost:5000/products/${id}`, {
  //     credentials: 'include',
  //     method: 'PATCH',
  //     headers: {
  //       'Authorization': localStorage.token,
  //       'Content-Type': 'application/json',
  //     },
  //   })
  //     .then(() => {
  //       setProducts((products) =>
  //         products.map((product) =>
  //           product._id === id ? { ...product, favorite: !favorite } : product));
  //       setLoader(false);
  //       snackbar(snackbarMessage);
  //     });
  // };

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
          backgroundColor: '#f3ead985',
          boxShadow: 'none',
          transition: 'box-shadow 0.3s', // Add transition for smooth effect
          '&:hover': {
            boxShadow: '0px 0px 6px 1px #fba32d', // Apply box shadow on hover
          },
          // boxShadow: '0px 0px 6px 0.5px #b88138;', '&:hover': { boxShadow: '0px 0px 6px 1px #fba32d', }
        }}
          key={product._id}
          className='card' >

          <CardMedia sx={{ transition: "all 0.2s ease-in-out", "&:hover": { cursor: "pointer", transform: "scale(1.02)" } }}
            component="img"
            height="194"
            image={product.imgUrl}
            alt={product.imgAlt}
            onClick={() => navigate(`/product/${product._id}`)} />

          <CardContent sx={{ textAlign: 'center' }}>
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

          <CardActions disableSpacing>
            {path === '/' && (
              <>
                <IconButton
                  aria-label="Add or Remove"
                  onClick={handleClick}
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
// {
//   openCart &&
//   <Cart add2Cart={add2Cart} />
// }
// const add2Cart = async (id) => {
//   const updatedProducts = products.map(p => p._id === id ? { ...p, addToCart: !p.addToCart } : p);
//   setProducts(updatedProducts);

//   const productUpdate = updatedProducts.find(p => p._id === id);

//   try {
//     const res = await fetch(`http://localhost:5000/products/${id}`, {
//       method: 'PUT',
//       credentials: 'include',
//       headers: { "Content-Type": "application/json", },
//       body: JSON.stringify(productUpdate),
//     });

//     // Handle the response
//     const data = await res.json();

//     setProducts(updatedProducts.map(p => (p._id === id ? data : p)));

//   } catch (error) {
//     console.error('Error updating product:', error);
//   }
// };

// const [tableMode, setTableMode] = useState(false);
// const toggleTableMode = () => {
//         setTableMode(!tableMode);
//     };
// <Box mb={2}>
// <label>View as Table</label>
// <Switch checked={tableMode} onChange={toggleTableMode} />
// </Box>


// const handleCategory = (ev) => {
//   const selectedCategory = ev.target.value;
//   setFormData({ ...formData, category: selectedCategory });
// };
// <Box mb={2}>
// <Select value={formData.category} onChange={handleCategory}>
//     <MenuItem value="all">All</MenuItem>
//     <MenuItem value="face">Face</MenuItem>
//     <MenuItem value="eyes">Eyes</MenuItem>
//     <MenuItem value="body">Body</MenuItem>
//     <MenuItem value="hands">Hands</MenuItem>
//     <MenuItem value="feet">Feet</MenuItem>
// </Select>
// </Box>






{/* <CardContent>
<Box marginTop={1}>
    <Typography gutterBottom variant="h4" component="div">
        {p.name}
    </Typography>
</Box>
<Box marginTop={1}>
    <Typography component="h2" variant="h3" color="text.primary">
        ${p.price}
    </Typography>
</Box>
<Box marginTop={1}>
    <Typography component="h2" variant="h5" color="text.secondary">
        Discount: ${p.discount}
    </Typography>
</Box>
<Box marginTop={1}>
    <Typography variant="body2" color="text.secondary">
        {p.description}
    </Typography>
</Box>
<Box marginTop={1}>
    <Typography variant="body2" color="text.secondary">
        {moment(p.createdAt).format('DD-MM-YYYY, hh:mm A')}
    </Typography>
</Box>

</CardContent> */}


// <CardActions>
// <Button size="small" onClick={() => navigate('/payment')}>Buy</Button>
// <Button size="small" onClick={() => add2Cart(p._id)}>{p.addToCart ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}</Button>
// <Button size="small" onClick={() => edit(p._id)}><EditIcon /></Button>
// <Button size="small" onClick={() => remove(p._id)}><DeleteIcon /></Button>
// </CardActions>



// const addOrUpdate = (ev) => {
//   if (ev) {
//       ev.preventDefault();
//   }
//   const url = editProductId ? `http://localhost:5000/products/${editProductId}` : "http://localhost:5000/products";
//   const method = editProductId ? 'PUT' : 'POST';

//   fetch(url, {
//       method,
//       credentials: 'include',
//       headers: { "Content-Type": "application/json", },
//       body: JSON.stringify(formData)
//   })
//       .then(res => res.json())
//       .then(data => {
//           if (editProductId) {
//               // If it's an update, replace the existing product
//               setProducts(products.map(p => (p._id === editProductId ? data : p)));
//           } else {
//               // If it's a new product, add it to the list
//               setProducts([...products, data]);
//           }
//       })
//       .finally(() => {
//           setPopUp(false);
//           setEditProductId(null);
//       });
// }