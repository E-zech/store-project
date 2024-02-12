import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove'
import { useContext, useState } from "react";
import { GeneralContext } from "../../App";
import { RoleTypes } from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import './ProductComponent.css';
import { Box } from "@mui/material";


export default function ProductComponent({ product, setProducts, add2Cart }) {
  const { user, setUser, setLoader, userRoleType, snackbar, } = useContext(GeneralContext);
  const [isAdded, setIsAdded] = useState(false);
  const [quantity, setQuantity] = useState(1); // State for quantity

  const navigate = useNavigate();

  const handleAddToCart = (productId, price) => {
    console.log("Adding product to cart:", productId, price, quantity);
    add2Cart(product._id, product.price, quantity);
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
    console.log(quantity)
  };

  const decrementQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      console.log(quantity)
    }
  };

  const toggleFavOrNot = (id, favorite) => {
    setLoader(true);

    const snackbarMessage = favorite ? 'Removed from Favorites' : 'Added to Favorites';

    fetch(`http://localhost:5000/products/${id}`, {
      credentials: 'include',
      method: 'PATCH',
      headers: {
        'Authorization': localStorage.token,
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setProducts((products) =>
          products.map((product) =>
            product._id === id ? { ...product, favorite: !favorite } : product));
        setLoader(false);
        snackbar(snackbarMessage);
      });
  };

  const addedOrNot = (productId, userId) => {
    setLoader(true);

    fetch(`http://localhost:5000/users/${userId}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.token,
      }
    })
      .then(res => res.json())
      .then(data => {
        const isProductAdded = data.addToCart && data.addToCart.some(item => item._id === productId);
        setIsAdded(isProductAdded);
        setUser(data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      })
      .finally(() => setLoader(false));
  }

  // const deleteProduct = (id, userRoleType) => {
  //   setLoader(true);

  //   const isConfirmed = window.confirm("Are you sure you want to delete this product?");

  //   if (isConfirmed) {

  //     fetch(`http://localhost:5000/products/${id}`, {
  //       credentials: 'include',
  //       method: 'DELETE',
  //       headers: {
  //         'Authorization': localStorage.token,
  //         'Content-Type': 'application/json',
  //       },
  //     })
  //       .then(() => {
  //         setProducts((products) =>
  //           products.filter((product) => product._id !== id)
  //         );
  //         setLoader(false);
  //         snackbar('Card deleted successfully');
  //       });
  //   } else {
  //     setLoader(false);
  //   }
  // }

  return (
    <>
      <section className='container-cards' >
        <Card sx={{
          maxWidth: 345,
          backgroundColor: '#f3ead985',
          boxShadow: '0px 0px 6px 0.5px #b88138;', '&:hover': { boxShadow: '0px 0px 6px 1px #fba32d', }
        }}
          key={product._id}
          className='card' >

          <CardMedia sx={{ transition: "all 0.5s ease-in-out", "&:hover": { cursor: "pointer", transform: "scale(1.02)" } }}
            component="img"
            height="194"
            image={product.imgUrl}
            alt="Paella dish"
            onClick={() => navigate(`/product/${product._id}`)} /> {/* // need to create a route like this and a page that canhandle the product + prams id */}

          <CardContent>
            <div className="card-wrapper">
              <h1 className="main-headline"> {product.title} </h1>

              <span className="card-number cardSpan">
                <span className="bold-spn">Product Number:</span> {product._id}
              </span>
            </div>

            <div>
              <IconButton aria-label="">
                Price: {product.price} <AttachMoneyIcon />
              </IconButton>
            </div>
          </CardContent>

          <CardActions disableSpacing>



            <IconButton id='favoriteBtn' aria-label="add to favorites" onClick={() => toggleFavOrNot(product._id, product.faves)}>
              <FavoriteIcon color={product.faves ? "error" : ""} />
            </IconButton>

            <IconButton aria-label="" onClick={() => handleAddToCart(product._id, product.price)}>
              {isAdded ? <RemoveShoppingCartIcon /> : <AddShoppingCartIcon />}
            </IconButton>

            <IconButton aria-label="" onClick={decrementQuantity}>
              <RemoveIcon />
            </IconButton>

            <span>{quantity}</span>
            <IconButton aria-label="" onClick={incrementQuantity}>
              <AddIcon />
            </IconButton>



            <IconButton aria-label="" >
            </IconButton>

            <IconButton aria-label="" >
            </IconButton>

            <IconButton aria-label="" >
            </IconButton>

          </CardActions>
        </Card >
      </section>
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