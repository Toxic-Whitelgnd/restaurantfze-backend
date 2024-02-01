import { useState } from 'react'
import TablePanel from './componets/TablePanel/TablePanel'
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import TableForm from './componets/TablePanel/CRUDtable/TableCreate';
import TableList from './componets/TablePanel/CRUDtable/TableList';
import TableEdit from './componets/TablePanel/CRUDtable/TableEdit';
import TableDelList from './componets/TablePanel/CRUDtable/TableDelList';
import TableDelete from './componets/TablePanel/CRUDtable/TableDelete';
import Pages from './componets/Pages/Pages';
import HomePanel from './componets/HomePanel/HomePanel';
import HomeEditList from './componets/HomePanel/CRUDhome/HomeEditList';
import HomeEdit from './componets/HomePanel/CRUDhome/HomeEdit';
import HomeDelete from './componets/HomePanel/CRUDhome/HomeDelete';
import HomeDelList from './componets/HomePanel/CRUDhome/HomeDelList';
import FoodPanel from './componets/FoodPanel/FoodPanel';
import FoodType from './componets/FoodPanel/CRUDfood/FoodType';
import FoodData from './componets/FoodPanel/CRUDfood/FoodData';
import FoodEditList from './componets/FoodPanel/CRUDfood/FoodEditList';
import FoodEdit from './componets/FoodPanel/CRUDfood/FoodEdit';
import FoodImageChange from './componets/FoodPanel/CRUDfood/FoodImageChange';
import FoodDelList from './componets/FoodPanel/CRUDfood/FoodDelList';
import FoodDelete from './componets/FoodPanel/CRUDfood/FoodDelete';
import FoodTypeEditList from './componets/FoodPanel/CRUDfood/FoodTypeEditList';
import FoodTypeEdit from './componets/FoodPanel/CRUDfood/FoodTypeEdit';
import FoodTypeDelList from './componets/FoodPanel/CRUDfood/FoodTypeDelList';
import FoodTypeDelete from './componets/FoodPanel/CRUDfood/FoodTypeDelete';
import KitchenPanel from './componets/Kitchenpanel/KitchenPanel';
import Runningorder from './componets/Kitchenpanel/CRUDkitchen/Runningorder';
import DeliveryPanel from './componets/DeliveryPanel/DeliveryPanel';
import DineinDeliveryorder from './componets/DeliveryPanel/CRUDfoodfelivery/dineinDeliveryorder';
import WaiterPanel from './componets/WaiterPanel/WaiterPanel';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Router>
        <Routes>
          <Route path='/' index element={<Pages/>} />
          {/* for Home panel */}
          <Route path='/homepanel'  element={<HomePanel/>} />
          <Route path='/edit-home'  element={<HomeEditList/>} />
          <Route path='/edit-home/:homeno'  element={<HomeEdit/>} />
          <Route path='/delete-home'  element={<HomeDelList/>} />
          <Route path='/delete-home/:homeno'  element={<HomeDelete />} />
          {/* for tables */}
          <Route path='/tablepanel'  element={<TablePanel/>} />
          <Route path='/create-table' element={<TableForm />} />
          <Route path='/edit-table' element={<TableList />} />
          <Route path='/edit-table/:tableno' element={<TableEdit />} />
          <Route path='/delete-table' element={<TableDelList />} />
          <Route path='/delete-table/:tableno' element={<TableDelete />} />
          {/* for food panel */}
          <Route path='/foodpanel'  element={<FoodPanel/>} />
          <Route path="/add-foodtype" element={<FoodType />} />
          <Route path='/edit-foodtype' element={<FoodTypeEditList />} />
          <Route path='/edit-foodtype/:foodid' element={<FoodTypeEdit />} />
          <Route path='/delete-foodtype' element={<FoodTypeDelList />} />
          <Route path='/delete-foodtype/:foodid' element={<FoodTypeDelete />} />
          <Route path="/add-fooddata" element={<FoodData />} />
          <Route path='/edit-fooddata' element={<FoodEditList />} />
          <Route path='/edit-fooddata/:foodid' element={<FoodEdit />} />
          <Route path='/change-food-image/:foodid' element={<FoodImageChange />} />
          <Route path='/delete-fooddata' element={<FoodDelList />} />
          <Route path='/delete-fooddata/:foodid' element={<FoodDelete />} />
          {/* for kitchen panel */}
          <Route path='/kitchenpanel'  element={<KitchenPanel/>} />
          <Route path="/running-order" element={<Runningorder />} />
          <Route path="/completed-order" element={<FoodType />} />
          {/* for kitchen panel */}
          <Route path='/deliverypanel'  element={<DeliveryPanel/>} />
          <Route path="/dinein-delivery-order" element={<DineinDeliveryorder />} />
          <Route path="/completed-order" element={<FoodType />} />
          {/* for Waiter panel */}
          <Route path='/waiterpanel'  element={<WaiterPanel/>} />
          <Route path="/dinein-delivery-order" element={<DineinDeliveryorder />} />
          <Route path="/completed-order" element={<FoodType />} />
        </Routes>
      </Router>
      </div>
    </>
  )
}

export default App
