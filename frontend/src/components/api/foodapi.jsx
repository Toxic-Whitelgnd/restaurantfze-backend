import img1 from "../../assets/foods/idly.jpg"
import img2 from "../../assets/foods/sambarice.jpg";
import img3 from "../../assets/foods/ravadosa.jpg";
import img4 from "../../assets/foods/Plain-Dosa.jpg";
import img5 from "../../assets/foods/prawn.jpg";
import img6 from "../../assets/foods/chickensoup.jpg";
import img7 from "../../assets/foods/mysoredosa.jpg";
import img8 from "../../assets/foods/upma.jpg";

const FoodApi = [
    {

        id: 1,
        type: 'breakfast',
        foodname: 'Idly',
        img: img1,
        price: '2',
        qty: 1,
        available:1,

    },
    {

        id: 2,
        type: 'breakfast',
        foodname: 'Dosa',
        img: img4,
        price: '5',
        qty: 1,
        available:1,
        
    },
    {

        id: 3,
        type: 'lunch',
        foodname: 'Sambar',
        img:img2,
        price: '4',
        qty: 1,
        available:1,
        
    },
    {

        id: 4,
        type: 'dinner',
        foodname: 'Upma',
        img: img8,
        price: '4',
        qty: 1,
        available:1,
        
    },
    {

        id: 5,
        type: 'seafood',
        foodname: 'Prawn',
        img: img5,
        price: '4',
        qty: 1,
        available:1,
        
    },
    {

        id: 6,
        type: 'soup',
        foodname: 'chicken soup',
        img: img6,
        price: '4',
        qty: 1,
        available:1,
        
    },
    {

        id: 7,
        type: 'veg',
        foodname: 'panner rice',
        img: '',
        price: '4',
        qty: 1,
        available:0,
        
    },
    {

        id: 8,
        type: 'non-veg',
        foodname: 'Idly',
        img: '',
        price: '4',
        qty: 2,
        available:1,
        
    },

    {

        id: 9,
        type: 'breakfast',
        foodname: 'Mysore Dosa',
        img: img7,
        price: '3',
        qty: 1,
        available:0,
        
    },
    {

        id: 11,
        type: 'breakfast',
        foodname: 'Rava Dosa',
        img: img3,
        price: '10',
        qty: 2,
        available:1,
        
    },

]

export default FoodApi