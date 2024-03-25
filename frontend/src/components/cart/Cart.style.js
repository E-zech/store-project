import { mainColor } from "../../css/Main.style";

export const boxShadowLight = '0px 0px 0px 5px #99c8c2, 0px 0px 9px 1px #99c8c2, 0px 0px 0px 7px #99c8c2';
export const boxShadowDark = '0px 0px 0px 5px #fff, 0px 0px 9px 1px #fff, 0px 0px 0px 7px #fff';

export const hoverBoxShadowLight = '0px 0px 0px 6px #99c8c2, 0px 0px 10px 2px #99c8c2, 0px 0px 0px 8px #99c8c2';
export const hoverBoxShadowDark = '0px 0px 0px 6px #fff, 0px 0px 10px 2px #fff, 0px 0px 0px 8px #fff';


export const listStyle = {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '120px',
    backgroundColor: '#75a59f',
    gap: '25px',
    paddingTop: '10px',

};

export const bigBoxStyle = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
    // border: '3px solid black',
    // borderRadius: '15px 0px 15px 0px',

};

export const counterWrapper = {
    width: '20%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    textAlign: 'center',
    fontSize: '1rem',
    marginLeft: '5px',
    color: 'black',

};

export const counterBtn = {
    backgroundColor: 'black',
    width: '28px',
    height: '28px',
    color: mainColor,
    borderRadius: '25%',
    "&:hover": {
        backgroundColor: 'white'
    }
};


export const imgTitleWrapper = {
    width: '40%',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    color: 'white',
    textAlign: 'center',
    padding: '0px, 15px',
};

export const totalWrapper = {
    width: '35%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    textAlign: 'center',
};

export const footerBtnWrapper = {
    backgroundColor: mainColor,
    color: 'black',
    textAlign: 'center',
    position: "fixed",
    bottom: '0px',
    width: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};



