import '../css/index.css';
import ManualInputPage from './view/manualInputPage';
import OrderDecider from './orderDecider';

const orderDecider = new OrderDecider();
// eslint-disable-next-line no-new
new ManualInputPage(orderDecider);
