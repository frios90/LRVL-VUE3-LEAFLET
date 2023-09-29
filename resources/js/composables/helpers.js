import { toast } from 'vue3-toastify';

export const useHelpers = () => {


    const toastNotify = (payload) => {
        let content = payload.content ? payload.content : "-.Notificación.-";
        let autoClose = payload.autoClose ? payload.autoClose : 2000;
        let theme = payload.theme ? payload.theme : "dark"; /** (dark, auto, colored, light, ) */
        let type = payload.type ? payload.type : "success"; /** (success, error, info, warning, ) */
        let transition = payload.transition ? payload.transition : "flip"; /** (slide, flip, bounce, zoom, ) */
        let position = payload.transition ? payload.transition : "top-center"; /** (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right ) */

        toast(content, {
            autoClose: autoClose,
            position: toast.POSITION.TOP_RIGHT,
            theme: theme,
            type: type,
            transition: transition,
            position: position
        });
    }

     // Función para generar un valor hexadecimal aleatorio
     const getRandomHexValue = () => {
        return Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    }

    // Función para generar un color hexadecimal aleatorio
    const getRandomHexColor = () => {
        const red = getRandomHexValue();
        const green = getRandomHexValue();
        const blue = getRandomHexValue();
        return `#${red}${green}${blue}`;
    }

    return {
        getRandomHexColor,
        toastNotify
    }

}