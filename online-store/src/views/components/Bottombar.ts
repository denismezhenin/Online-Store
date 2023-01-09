import getBottomBarHtml from './BottomBarPage';

const Bottombar = {
  render: async () => {
    const view = getBottomBarHtml();
    return view;
  },
     after_render: async () => {},
};

export default Bottombar;
