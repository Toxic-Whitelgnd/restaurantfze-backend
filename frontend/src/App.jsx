import { useState } from 'react'
import './App.css'
import TablePanel from './componets/TablePanel/TablePanel'
import { HashRouter as Router, Route, Routes } from "react-router-dom";

//ADMIN COMPONENTS
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
import AddWaiter from './componets/WaiterPanel/CRUDwaiter/AddWaiter';
import EditWaiterList from './componets/WaiterPanel/CRUDwaiter/WaiterList';
import EditWaiterForm from './componets/WaiterPanel/CRUDwaiter/EditWaiter';
import DeleteWaiterList from './componets/WaiterPanel/CRUDwaiter/DeleteList';
import DeleteWaiter from './componets/WaiterPanel/CRUDwaiter/DeleteWaiter';
import ChangeFoodAvil from './componets/Kitchenpanel/CRUDkitchen/ChangeFoodAvil';
import ChangeAvailability from './componets/Kitchenpanel/CRUDkitchen/ChangeAvailability';
import BillPanel from './componets/BillPanel/BillPanel';
import BillEditPanel from './componets/BillPanel/CRUDbill/BillEditPanel';
import RunningOrderDeliverySale from './componets/Kitchenpanel/CRUDkitchen/RunningOrderDeliverySale';
import RunningOrderTakeAway from './componets/Kitchenpanel/CRUDkitchen/RunningOrderTakeAway';
import  DelevrysaleDeliveryorder from "./componets/DeliveryPanel/CRUDfoodfelivery/delevrysaleDeliveryorder"
import TakeawayDeliveryorder from "./componets/DeliveryPanel/CRUDfoodfelivery/takeawayDeliveryorder";
import MessPanel from './componets/MessPanel/MessPanel';
import EditMessDetailsList from './componets/MessPanel/CRUDmess/EditMessDetailsList';
import EditMessForm from './componets/MessPanel/CRUDmess/EditMessDetails';
import DeleteMessDetailsList from './componets/MessPanel/CRUDmess/DeleteMessDetailsList';
import DeleteMessDetails from './componets/MessPanel/CRUDmess/DeleteMessDetails';

// from components.
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import DineinHomepage from './components/DineIn/dineinHomepage';
import DineinOrderpage from './components/DineIn/dineinOrderpage';
import Sod from './components/SaleOrderDetails/Sod';
import DineoutOrderpage from './components/DineIn/dineoutOrderpage';
import Settlesale from './components/Settlesale/Settlesale';
import PayBack from './components/PayBack/PayBack';
import Expenses from './components/Expenses/Expenses';
import Creditsale from './components/Credit Sale/Creditsale';
import CashStarting from './components/CashAtStarting/CashStarting';
import CRM from './components/CRM/CRM';
import MessDetailsForm from './components/CRM/MESS';
import TakeAway from './components/TakeAway/Takeaway';
import TakeAwayLog from './components/TakeAway/TakeAwayLog';
import TakeAwayEdit from './components/TakeAway/TakeAwayEdit';
import RunningOrder from './components/DineIn/RunningOrder';
import SaleOrderView from './cards/SODCards/SaleOrderView';
import DeliverySale from './components/DeliverySale/DeliverySale';
import RecipietCard from './cards/RecipitCards/RecipietCard';
import KitchenRecipietCard from './cards/RecipitCards/KitchenRecipietCard';
import KitchenRecipietTakeawayCard from './cards/RecipitCards/KitchenRecipietTakeawayCard';
import TakeAwayPay from './components/TakeAway/TakeAwayPay';
import RecipientTakeAwayCard from './cards/RecipitCards/RecipientTakeAwayCard';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Router>
          <NavBar />
        <Routes>
          {/*MAIN PATHS */}
          <Route path='/' index element={<HomePage />} />
          <Route path='/dinein' index element={<DineinHomepage />} />
          <Route path='/itable/:id' index element={<DineinOrderpage />} />
          <Route path='/otable/:id' index element={<DineoutOrderpage />} />
          <Route path='/running-order' index element={<RunningOrder />} />
          <Route path='/saleorderdetails' index element={<Sod />} />
          <Route path='/sodcustomer/:id' index element={<SaleOrderView />} />
          <Route path='/settlesale' index element={<Settlesale />} />
          <Route path='/payback' index element={<PayBack />} />
          <Route path='/expenses' index element={<Expenses />} />
          <Route path='/creditsale' index element={<Creditsale />} />
          <Route path='/cashatstarting' index element={<CashStarting />} />
          <Route path='/crm' index element={<CRM />} />
          <Route path='/messdetails' index element={<MessDetailsForm />} />
          <Route path='/takeaway' index element={<TakeAway />} />
          <Route path='/takeawaylog' index element={<TakeAwayLog />} />
          <Route path='/takeawayedit/:id' index element={<TakeAwayEdit />} />
          <Route path='/takeawaypay/:orderid' index element={<TakeAwayPay />} />
          <Route path='/deliverysale' index element={<DeliverySale />} />
          <Route path='/print/indoor/:id' element={<RecipietCard />} />
          <Route path='/print/outdoor/:id' element={<RecipietCard />} />
          <Route path='/print/kitchen/indoor/:id' element={<KitchenRecipietCard />} />
          <Route path='/print/kitchen/outdoor/:id' element={<KitchenRecipietCard />} />
          <Route path='/printrecipiet/:orderid' element={<RecipientTakeAwayCard />} />
          <Route path='/print/kitchen/takeaway/:orderno' element={<KitchenRecipietTakeawayCard />} />
          {/*ADMIN PATHS */}
          <Route path='/admin' index element={<Pages/>} />
          {/* for Home panel */}
          <Route path='/admin/homepanel'  element={<HomePanel/>} />
          <Route path='/admin/edit-home'  element={<HomeEditList/>} />
          <Route path='/admin/edit-home/:homeno'  element={<HomeEdit/>} />
          <Route path='/admin/delete-home'  element={<HomeDelList/>} />
          <Route path='/admin/delete-home/:homeno'  element={<HomeDelete />} />
          {/* for tables */}
          <Route path='/admin/tablepanel'  element={<TablePanel/>} />
          <Route path='/admin/create-table' element={<TableForm />} />
          <Route path='/admin/edit-table' element={<TableList />} />
          <Route path='/admin/edit-table/:tableno' element={<TableEdit />} />
          <Route path='/admin/delete-table' element={<TableDelList />} />
          <Route path='/admin/delete-table/:tableno' element={<TableDelete />} />
          {/* for food panel */}
          <Route path='/admin/foodpanel'  element={<FoodPanel/>} />
          <Route path="/admin/add-foodtype" element={<FoodType />} />
          <Route path='/admin/edit-foodtype' element={<FoodTypeEditList />} />
          <Route path='/admin/edit-foodtype/:foodid' element={<FoodTypeEdit />} />
          <Route path='/admin/delete-foodtype' element={<FoodTypeDelList />} />
          <Route path='/admin/delete-foodtype/:foodid' element={<FoodTypeDelete />} />
          <Route path="/admin/add-fooddata" element={<FoodData />} />
          <Route path='/admin/edit-fooddata' element={<FoodEditList />} />
          <Route path='/admin/edit-fooddata/:foodid' element={<FoodEdit />} />
          <Route path='/admin/change-food-image/:foodid' element={<FoodImageChange />} />
          <Route path='/admin/delete-fooddata' element={<FoodDelList />} />
          <Route path='/admin/delete-fooddata/:foodid' element={<FoodDelete />} />
          {/* for kitchen panel */}
          <Route path='/admin/kitchenpanel'  element={<KitchenPanel/>} />
          <Route path="/admin/running-order" element={<Runningorder />} />
          <Route path="/admin/running-delivery-order" element={<RunningOrderDeliverySale />} />
          <Route path="/admin/running-takeaway-order" element={<RunningOrderTakeAway />} />
          <Route path="/admin/completed-order" element={<FoodType />} />
          {/* for kitchen panel */}
          <Route path='/admin/deliverypanel'  element={<DeliveryPanel/>} />
          <Route path="/admin/dinein-delivery-order" element={<DineinDeliveryorder />} />
          <Route path="/admin/deliverysale-delivery-order" element={<DelevrysaleDeliveryorder />} />
          <Route path="/admin/deliverysale-takeaway-order" element={<TakeawayDeliveryorder />} />
          <Route path="/admin/changeavailibilty" element={<ChangeAvailability />} />
          <Route path="/admin/change-food-availablity/:foodid" element={<ChangeFoodAvil />} />
          {/* for Waiter panel */}
          <Route path='/admin/waiterpanel'  element={<WaiterPanel/>} />
          <Route path="/admin/add-waiter" element={<AddWaiter />} />
          <Route path="/admin/edit-waiter" element={<EditWaiterList />} />
          <Route path="/admin/edit-waiter/:waiterid" element={<EditWaiterForm />} />
          <Route path="/admin/delete-waiter" element={<DeleteWaiterList />} />
          <Route path="/admin/delete-waiter/:waiterid" element={<DeleteWaiter />} />
          {/* for Bill panel */}
          <Route path='/admin/billpanel'  element={<BillPanel/>} />
          <Route path='/admin/bill-edit-panel'  element={<BillEditPanel/>} />
          {/* for Mess panel */}
          <Route path='/admin/messpanel'  element={<MessPanel/>} />
          <Route path="/admin/edit-messDetails" element={<EditMessDetailsList />} />
          <Route path="/admin/edit-messDetails/:messid" element={<EditMessForm />} />
          <Route path="/admin/delete-messDetails" element={<DeleteMessDetailsList />} />
          <Route path="/admin/delete-messDetails/:messid" element={<DeleteMessDetails />} />
        </Routes>
      </Router>
      </div>
    </>
  )
}

export default App
