import screen1 from './components/screen1/screen1.js'
import screen2 from './components/screen2/screen2.js'
import screen3 from './components/screen3/screen3.js'




var pageArray = [
    {
        component : screen2,status : true,
        path  : "/screen2"

    },
    {
        component : screen3 ,status : true,
        path  : "/screen3"

    },
    
    {
        component : screen1 ,status : true ,
        path  : "/"

    },

    

]

export default pageArray