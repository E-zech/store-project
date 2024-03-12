import { useContext } from 'react';
import { GeneralContext } from '../App';
import { black, mainColor, white } from '../css/Main.style';

export const useInputsFormColors = () => {
    const { mode } = useContext(GeneralContext);

    return {
        sx: {
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: mode === 'dark' ? white : mainColor, // Change the border color when focused
                },
            },
            '& input::placeholder': {
                color: mode === 'dark' ? white : black, // Change the placeholder color
            },
            '& .MuiInputLabel-root': {
                color: mode === 'dark' ? white : black, // Change the label color
            },
            '& .MuiInputLabel-root.Mui-focused': {
                color: mode === 'dark' ? white : mainColor, // Change the focused label color
            },
        },
    };
};