import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useContext } from "react";
import { GeneralContext } from "../../App";
import { RoleTypes } from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";
import './ProductComponent.css';


export default function ProductComponent({ card, setAllCard }) {
  const { user, setLoader, userRoleType, snackbar, } = useContext(GeneralContext);
  const navigate = useNavigate();


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
        setAllCard((allCards) =>
          allCards.map((card) =>
            card.id === id ? { ...card, favorite: !favorite } : card));
        setLoader(false);
        snackbar(snackbarMessage);
      });
  };

  const deleteCard = (id, userRoleType) => {
    setLoader(true);

    const isConfirmed = window.confirm("Are you sure you want to delete this card?");

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
          setAllCard((allCards) =>
            allCards.filter((card) => card.id !== id)
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
        <Card sx={{ maxWidth: 345, backgroundColor: '#f3ead985', boxShadow: '0px 0px 6px 0.5px #b88138;', '&:hover': { boxShadow: '0px 0px 6px 1px #fba32d', } }}
          key={card.id}
          className='card' >

          <CardMedia sx={{ transition: "all 0.5s ease-in-out", "&:hover": { cursor: "pointer", transform: "scale(1.02)" } }}
            component="img"
            height="194"
            image={card.imgUrl}
            alt="Paella dish"
            onClick={() => navigate(`/landing-page/${card.id}`)} />

          <CardContent>
            <div className="card-wrapper">
              <h1 className="main-headline"> {card.title} </h1>
              <h3 className="sec-headline"> {card.subtitle} </h3>

              <span className="phone cardSpan">
                <span className="bold-spn">Phone:</span> {card.phone}
              </span>

              <span className="adress cardSpan">
                <span className="bold-spn">Adress:</span> {card.state}, {card.city}. <br /> {card.street}. {card.houseNumber}. {card.zip}.
              </span>

              <span className="card-number cardSpan">
                <span className="bold-spn">Card Number:</span> {card.id}
              </span>
            </div>
          </CardContent>

          <CardActions disableSpacing>
            <IconButton onClick={() => snackbar(`Phone Number : ${card.phone}`)}>
              <LocalPhoneIcon aria-label="phone" />
            </IconButton>

            {user && (
              <IconButton id='favoriteBtn' aria-label="add to favorites" onClick={() => toggleFavOrNot(card.id, card.favorite)}>
                <FavoriteIcon color={card.favorite ? "error" : ""} />
              </IconButton>)}

            {((userRoleType === RoleTypes.business && card.clientId === user.id) || (userRoleType === RoleTypes.admin && card.clientId === 0)) && (
              <IconButton aria-label="edit" onClick={() => navigate(`/edit-cards/${card.id}`)}>
                <ModeEditIcon />
              </IconButton>)}

            {((userRoleType === RoleTypes.business && card.clientId === user.id) || userRoleType === RoleTypes.admin) && (
              <IconButton aria-label="delete" onClick={() => deleteCard(card.id, userRoleType)}>
                <DeleteIcon />
              </IconButton>)}
          </CardActions>
        </Card >
      </section>
    </>
  );
}