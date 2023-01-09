import { getBottomBarHtml } from "./BottomBarPage";

let Bottombar = {
    render: async () => {
        let view =  getBottomBarHtml()
        return view
    },
    after_render: async () => { 
        
    }

}

export default Bottombar;