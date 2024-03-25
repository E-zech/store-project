import { mainColor, font } from "../../css/Main.style";


export const containerCardStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: '10px',
};

export const cardStyle = {
    width: 345,
    maxWidth: 300,
    position: 'relative',
    backgroundColor: 'white',
    boxShadow: 'none',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 'none',
        // boxShadow: '0px 0px 6px 1px #b6b6b6',
    },
};

export const discountBtnStyle = {
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
    '&:hover': {
        backgroundColor: mainColor,
    },
};

export const cartMediaStyle = {
    position: 'relative',
    height: '194px',
    borderRadius: '15px',
    transition: "all 0.2s ease-in-out",
    "&:hover": { cursor: "pointer", transform: "scale(1.02)", borderRadius: '0px' }
};

export const cardContentStyle = {
    textAlign: 'center',
    padding: '0',
};

export const titleStyle = {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    fontFamily: font,
    padding: '5px 0px'
}

export const priceWrapper = {
    display: 'flex',
    flexDirection: 'row', justifyContent: 'center', alignItems: 'center',
};

export const totalPriceBtn = {
    '&:hover': {
        backgroundColor: 'white',
    },
}