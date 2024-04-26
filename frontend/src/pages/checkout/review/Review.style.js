export const reviewContainer = {
    width: '100%',
    display: "flex",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '100px',
    maxWidth: '2000px',
    minHeight: '70vh'
};

export const reviewGridWrapper = {
    width: '90vw',
    backgroundColor: 'white',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '15px',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: "2000px",
    paddingTop: '30px',
    '@media (max-width: 800px)': {
        width: '95vw',
    }
};

export const reviewGridHead = {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)', backgroundColor: '#99c8c2',
    gap: '5px',
    fontSize: '1.2rem',
    alignItems: 'center',
    padding: '10px',
    borderRadius: '17px 17px 0 0',
    width: "100%",
    maxWidth: '2000px',
    margin: '0 auto',
    textAlign: 'center',
    '@media (max-width: 800px)': {
        gap: '0px',
        fontSize: '1rem',
    }
};

export const reviewGridBody = {
    ...reviewGridHead,
    borderRadius: '0px',
};

export const reviewImgGridWrapper = {
    minWidth: 0,
    width: '70px',
    height: '70px',
    margin: '0 auto',
};

export const reviewImgGrid = {
    borderRadius: '15px'
};

export const removeBtn = {
    textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s ease-in-out', '&:hover': { transform: 'scale(1.2)' }
};

export const reviewAddressPaymentWrapper = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '20px',
    width: '100%',
    maxWidth: '2000px',
    margin: '0 auto',
};

export const reviewAddress = {
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    maxWidth: '2000px',
    margin: '0 auto',
    color: 'black',
    backgroundColor: '#99c8c2',
    fontSize: '1.2rem',
    padding: '20px 0 20px 20px',
    flexDirection: 'column',
    textAlign: 'left',
    '@media (max-width: 800px)': {
        fontSize: '1rem',
        padding: '15px 0 15px 20px',
    }
};

export const reviewTitles = {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    paddingBottom: '20px',
    '@media (max-width: 800px)': {
        fontSize: '1.3rem',
    }
};

export const paddingTop = {
    padddingTop: '10px',
};

export const bold = {
    fontWeight: 'bold',
    display: 'inline-block',
    paddingLeft: '5px'
};

export const reviewBtnWrapper = {
    width: '90vw',
    maxWidth: '2000px',
    margin: '0 auto',
    display: 'flex', justifyContent: 'center',
    gap: '20px',
    '@media (max-width: 800px)': {
        width: '95vw',
    }
};

export const reviewBtnLeft = {
    mt: 6, mb: 2,
    color: 'white',
    borderBottomLeftRadius: '17px',
};

export const reviewBtnRight = {
    mt: 6, mb: 2,
    color: 'white',
    borderBottomRightRadius: '17px',
};

export const noProductsWrapper = {
    mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '5px', minHeight: '70vh'
};

export const noProductsText = {
    textAlign: 'center',
    fontSize: '1.5rem',
    fontWeight: 'bold'
};