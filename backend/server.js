const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const axios = require("axios");
const Razorpay = require("razorpay");
const escpos = require("escpos")
escpos.USB = require("escpos-usb")


const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "35mb" }));

app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "35mb",
    parameterLimit: 50000,
  })
);

const razorpay = new Razorpay({
  key_id: "rzp_test_AZ9LyozDGv5aSK",
  key_secret: "k7q5Fkbd9EAoJaJ5JPl5dzrH",
});

// connection string
mongoUri =
  "mongodb+srv://whitelegend56:q1olisZZfHsPMazm@cluster0.jsetkub.mongodb.net/fzerestaurant";

// Define a Mongoose schema *********** START ************
const homePageSchema = new mongoose.Schema({
  home_id: String,
  home_name: String,
  home_icon: String,
  home_color: String,
});

const tablePageSchema = new mongoose.Schema({
  table_id: String,

  table_type: String,

  table_no: String,

  table_capacity: String,

  table_pploccupied: String,

  table_itemsordered: String,

  table_color: String,

  table_taken: String,

  table_url: String,
});

const foodTypeSchema = new mongoose.Schema({
  food_name: String,
});

const foodDataSchema = new mongoose.Schema({
  foodName: String,
  foodPrice: String,
  foodImage: Buffer, // Store as base64 string
  foodQty: String,
  foodAvailability: String,
  foodType: String,
});

const itemSchema = new mongoose.Schema({
  foodname: { type: String, required: true },
  qty: { type: Number, required: true },
  id: { type: String, required: true },
  price: { type: Number, required: true },
  amt: { type: Number, required: true },
  status: { type: String, required: true },
  table_no: { type: String, required: true },
  orderFrom: { type: String, required: true },
});








const currentOrderSchema = new mongoose.Schema({
  customer_details: {
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    numberOfSeats: { type: String, required: true },
  },
  floor_no: { type: String, required: true },
  items: [itemSchema],
  items_ordered: { type: Number, required: true },
  no_of_seats: { type: String, required: true },
  waiterName: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  order_no: { type: Number, required: true },
  running_order: { type: String, required: true },
  table_no: { type: String, required: true },
  orderFrom: { type: String, required: true },
  total: { type: Number, required: true },
});

const customerSchema = new mongoose.Schema({
  customer_mobileNumber: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  items: [itemSchema], // Array of items using the defined itemSchema
  items_ordered: {
    type: Number,
    required: true,
  },
  orderFrom: {
    type: String,
    required: true,
  },
  order_no: {
    type: Number,
    required: true,
  },
  ordered_tableno: {
    type: String,
    required: true,
  },
  paid_by: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  total_ppl: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  vat: String,
  waiter_name: String,
  discount: Number,
  amountpaid: Number,
  amountbalance: Number,
  receiptNo: String,
  totalwithoutvat: Number,
});

const runningorderSchema = new mongoose.Schema({
  orderNo: Number,
  tableNo: String,
  type: String,
  from: String,
  items: [itemSchema],
});

const waiterSchema = new mongoose.Schema({
  waiterName: {
    type: String,
    required: true,
  },
  waiterNumber: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: String,
    // required: true,
    // get: (date) => date.toISOString().split('T')[0], // Custom getter to return only the date string
    // set: (dateString) => new Date(dateString)
  },
});

// for Takeaway schema
const itemTakeawaySchema = new mongoose.Schema({
  foodname: { type: String, required: true },
  qty: { type: Number, required: true },
  id: { type: String, required: true },
  price: { type: Number, required: true },
  amt: { type: Number, required: true },
  status: { type: String, required: true },
  orderFrom: { type: String, required: true },
  orderno: { type: Number, required: true },
});

const currentTakeawayOrderSchema = new mongoose.Schema({
  customer_details: {
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  floor_no: { type: String, required: true },
  items: [itemTakeawaySchema],
  items_ordered: { type: Number, required: true },

  order_no: { type: Number, required: true },
  running_order: { type: String, required: true },

  orderFrom: { type: String, required: true },
  total: { type: Number, required: true },
});

const customerTakeawaySchema = new mongoose.Schema({
  customer_mobileNumber: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  customer_address: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  items: [itemTakeawaySchema], // Array of items using the defined itemSchema
  items_ordered: {
    type: Number,
    required: true,
  },
  orderFrom: {
    type: String,
    required: true,
  },
  order_no: {
    type: Number,
    required: true,
  },

  paid_by: {
    type: String,

  },

  time: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  vat: String,
  waiter_name: String,
  discount: Number,
  amountpaid: Number,
  amountbalance: Number,
  receiptNo: String,
  totalwithoutvat: Number,
});

// For Deliver schema
const itemDeliverySaleSchema = new mongoose.Schema({
  foodname: { type: String, required: true },
  qty: { type: Number, required: true },
  id: { type: String, required: true },
  price: { type: Number, required: true },
  amt: { type: Number, required: true },
  status: { type: String, required: true },
  orderFrom: { type: String, required: true },
  orderno: { type: Number, required: true },
});

const currentDeliverySaleOrderSchema = new mongoose.Schema({
  customer_details: {
    name: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  floor_no: { type: String, required: true },
  items: [itemDeliverySaleSchema],
  items_ordered: { type: Number, required: true },

  order_no: { type: Number, required: true },
  running_order: { type: String, required: true },

  orderFrom: { type: String, required: true },
  total: { type: Number, required: true },
});

const customerDeliverySaleSchema = new mongoose.Schema({
  customer_mobileNumber: {
    type: String,

  },
  customer_name: {
    type: String,

  },
  customer_address: {
    type: String,

  },
  customer_vehicleno: {
    type: String,

  },
  date: {
    type: String,
    required: true,
  },
  delivered_by: String, // backend dashboard handling
  delivery_vehicle_no: String, //backend dashboard handling
  items: [itemDeliverySaleSchema], // Array of items using the defined itemSchema
  items_ordered: {
    type: Number,
    required: true,
  },
  orderFrom: {
    type: String,
    required: true,
  },
  order_no: {
    type: Number,
    required: true,
  },

  paid_by: {
    type: String,
    required: true,
  },

  time: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  vat: String,
  waiter_name: String,
  discount: Number,
  amountpaid: Number,
  amountbalance: Number,
  receiptNo: String,
  totalwithoutvat: Number,
});

const billdSchema = new mongoose.Schema({
  VAT: {
    type: Number,
    required: true,
  },
  creditSale: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    required: true,
  },
  cardSale: {
    type: Number,
    required: true,
  },
});

const messDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: String,
    required: true,
  },
  closingDate: {
    type: String,
    default: "",
  },
  mealItem1: {
    type: Number,
    default: 0,
  },
  mealItem2: {
    type: Number,
    default: 0,
  },
  mealItem3: {
    type: Number,
    default: 0,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const recipietSchema = new mongoose.Schema({
  companyname: String,
  companycaption: String,
  address: String,
  description: String,
})

const CashAtStartingSchema = new mongoose.Schema({
  selectedDate: {
    type: String,

  },
  cash: {
    type: Number,

  }
});

const ExpensesSchema = new mongoose.Schema({
  category: {
      type: String,
      
  },
  companyName: {
      type: String,
      
  },
  description: {
      type: String,
      
  },
  invoiceNo: {
      type: String,
      
  },
  netTotal: {
      type: String,
      
  },
  purchaseDate: {
      type: String,
  },
  subTotal: {
      type: String,
      
  },
  trnNo: {
      type: String,
      
  },
  vat: {
      type: String,
      
  },
  vatAmount: {
      type: String,
      
  }
});





// ****************** END **********************

// Multer configuration for handling image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Create a Mongoose model based on the schema
// ****************** START *********************
const HomePage = mongoose.model("HomePage", homePageSchema, "home_page");
const TablePage = mongoose.model("TablePage", tablePageSchema, "table_page");
const FoodType = mongoose.model("FoodType", foodTypeSchema, "food_type");
const FoodData = mongoose.model("FoodData", foodDataSchema, "food_data");
const CurrentOrder = mongoose.model(
  "CurrentOrder",
  currentOrderSchema,
  "current_order"
);
const CustomerDetails = mongoose.model(
  "CustomerDetails",
  customerSchema,
  "customer_details"
);
const RunningOrder = mongoose.model(
  "RunningOrder",
  runningorderSchema,
  "running_order"
);
const Waiter = mongoose.model("Waiter", waiterSchema);
const Billd = mongoose.model("Billd", billdSchema);
const MessDetails = mongoose.model("messDetails", messDetailsSchema);

const TakeAwayCurrentOrder = mongoose.model(
  "TakeAwayCurrentOrder",
  currentTakeawayOrderSchema,
  "takeaway_current_order"
);
const TakeAwayCustomerDetails = mongoose.model(
  "TakeAwayCustomerDetails",
  customerTakeawaySchema,
  "takeaway_customer_details"
);

const DeliverySaleCurrentOrder = mongoose.model(
  "DeliverySaleCurrentOrder",
  currentDeliverySaleOrderSchema,
  "delivery_sales_current_order"
);
const DeliverySaleCustomerDetails = mongoose.model(
  "DeliveryCustomerDetails",
  customerDeliverySaleSchema,
  "delivery_sales_customer_details"
);

const Recipiet = mongoose.model("recipiet", recipietSchema);

const CashAtStarting = mongoose.model('cashatstarting', CashAtStartingSchema);

const Expenses = mongoose.model('Expenses', ExpensesSchema);
// ****************** END *********************

// Connect to MongoDB
const db1 = mongoose.connect(mongoUri);

// **************************** FOR PRINTING ON POS ****************************
// Assuming you have identified the correct USB devices for each printer
//const deviceReceiptPrinter = new escpos.USB(/* vid, pid for receipt printer */);
//const deviceKitchenPrinter = new escpos.USB(/* vid, pid for kitchen printer */);

//const options = { encoding: "GB18030" /* Default encoding */ };

// Initialize printers
//const receiptPrinter = new escpos.Printer(deviceReceiptPrinter, options);
//const kitchenPrinter = new escpos.Printer(deviceKitchenPrinter, options);
/*
function printReceipt(content) {
  deviceReceiptPrinter.open(function (error) {
    receiptPrinter
      .font('a')
      .align('ct')
      .text(content)
      .cut()
      .close();
  });
}

function printKitchenOrder(content) {
  deviceKitchenPrinter.open(function (error) {
    kitchenPrinter
      .font('a')
      .align('ct')
      .text(content)
      .cut()
      .close();
  });
}


app.post('/print', (req, res) => {
  try {
    const device = new escpos.USB();
    const printer = new escpos.Printer(device);

    printReceipt("Printing on Reciept printer")
    printKitchenOrder("Printing on Kitchen Order")

    res.send('Print success');
  } catch (error) {
    console.error('Print error:', error);
    res.status(500).send('Print failed');
  }
});
*/

// **************************** For HOME PAGE ********************************
app.get("/home_page_data", async (req, res) => {
  try {
    // Fetch all documents from the 'home_page' collection
    const data = await HomePage.find({});
    // console.log(data);
    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/single_home_page/:homeid", async (req, res) => {
  const { homeid } = req.params;
  try {
    // Fetch all documents from the 'home_page' collection
    const data = await HomePage.find({ home_id: homeid });
    console.log(data);
    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// POST endpoint to add new data
app.post("/post_home_page_data", async (req, res) => {
  try {
    const newHomePageData = new HomePage(req.body);
    const result = await newHomePageData.save();
    res.json(result);
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// PUT endpoint to update data based on home_id
app.put("/update_home_page_data/:home_id", async (req, res) => {
  const { home_id } = req.params;

  try {
    // Find the document with the specified home_id and update it with the request body
    const result = await HomePage.findOneAndUpdate(
      { home_id: home_id },
      { $set: req.body },
      { new: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Send the updated document as a JSON response
    res.json(result);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Delete
app.delete("/delete_home_page_data/:home_id", async (req, res) => {
  const { home_id } = req.params;

  try {
    // Find the document with the specified home_id and delete it
    const result = await HomePage.findOneAndDelete({ home_id: home_id });

    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ***************************** END HOME PAGE *******************************

// ***************************** START OF TABLES *****************************
app.get("/table_data", async (req, res) => {
  try {
    // Fetch all documents from the 'home_page' collection
    const data = await TablePage.find({});
    // console.log(data);
    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/single_table_data/:tableno", async (req, res) => {
  const { tableno } = req.params;
  try {
    // Fetch all documents from the 'home_page' collection
    const data = await TablePage.find({ table_no: tableno });
    // console.log(data);
    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/post_table_data", async (req, res) => {
  try {
    const newTablePageData = new TablePage(req.body);
    const result = await newTablePageData.save();
    res.json(result);
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/update_table_data/:tableno", async (req, res) => {
  // here changing with tablenumber
  const { tableno } = req.params;

  try {
    const findtable = await TablePage.find({
      table_no: tableno,
    });
    console.log("findtable - updatetabledata", findtable);
    const { table_type } = req.body;
    console.log(table_type);
    // Find the document with the specified home_id and update it with the request body
    const result = await TablePage.findOneAndUpdate(
      {
        table_no: tableno,
        table_type: table_type,
      },
      { $set: req.body },
      { new: true }
    );
    console.log("after updating", result);
    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Send the updated document as a JSON response
    res.json(result);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/delete_table_data/:table_no", async (req, res) => {
  const { table_no } = req.params;

  try {
    // Find the document with the specified home_id and delete it
    const result = await TablePage.findOneAndDelete({ table_no });

    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ***************************** END OF TABLES *******************************

// ***************************** START OF FOOD-TYPE **************************

app.post("/post_food_type", async (req, res) => {
  console.log(req.body);
  const { foodType } = req.body;
  try {
    const newFoodType = new FoodType({ food_name: foodType });
    const result = await newFoodType.save();
    res.json(result);
  } catch (error) {
    console.error("Error adding data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get_food_type", async (req, res) => {
  try {
    // Fetch all documents from the 'home_page' collection
    const data = await FoodType.find({});
    // console.log(data);
    // Send the data as a JSON response
    res.json(data);
  } catch (error) {
    // Handle errors
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get_singlefood_type/:foodid", async (req, res) => {
  const { foodid } = req.params;
  try {
    const result = await FoodType.find({
      _id: foodid,
    });
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.put("/update_food_type/:foodid", async (req, res) => {
  const { foodid } = req.params;
  const { food_name } = req.body;
  try {
    const result = await FoodType.findByIdAndUpdate(
      foodid,
      {
        food_name: food_name,
      },
      { new: true }
    );
    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Send the updated document as a JSON response
    res.json(result);
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/delete_food_type/:foodid", async (req, res) => {
  const { foodid } = req.params;
  try {
    const result = await FoodType.findByIdAndDelete({ _id: foodid });
    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    // Send the updated document as a JSON response
    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// ***************************** END OF FOOD-TYPE ****************************

//  ***************************** START OF FOOD-DATA ****************************

app.post(
  "/post_add_food_data",
  upload.single("foodImage"),
  async (req, res) => {
    try {
      console.log(req.body);

      // Save the food data to MongoDB
      const { foodName, foodPrice, foodQty, foodAvailability, foodType } =
        req.body;

      const newFood = new FoodData({
        foodName,
        foodPrice,
        foodImage: req.file.buffer,
        foodQty,
        foodAvailability,
        foodType,
      });

      await newFood.save();

      res.status(201).json({ message: "Food data added successfully" });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

app.get("/get_food_data", async (req, res) => {
  try {
    const foodData = await FoodData.find();
    const foodDataWithBase64Images = foodData.map((item) => ({
      ...item.toObject(),
      foodImage: item.foodImage.toString("base64"),
    }));
    res.json(foodDataWithBase64Images);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_food_data_image/:foodid", async (req, res) => {
  const { foodid } = req.params;
  try {
    const foodData = await FoodData.find({
      _id: foodid,
    });
    console.log(foodData);
    const foodDataWithBase64Images = foodData.map((item) => ({
      ...item.toObject(),
      foodImage: item.foodImage.toString("base64"),
    }));
    res.json(foodDataWithBase64Images);
  } catch (error) {
    console.error("Error fetching food data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put(
  "/update_food_data/:foodid",
  upload.single("foodImage"),
  async (req, res) => {
    try {
      const { foodid } = req.params;
      const { foodName, foodPrice, foodQty, foodAvailability, foodType } =
        req.body;

      const updatedFood = await FoodData.findByIdAndUpdate(
        foodid,
        {
          foodName,
          foodPrice,
          //   foodImage: req.file.buffer,
          foodQty,
          foodAvailability,
          foodType,
        },
        { new: true }
      );

      res.json({ message: "Food data updated successfully", updatedFood });
    } catch (error) {
      console.error("Error updating food data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

app.put(
  "/update-food-image/:foodid",
  upload.single("foodImage"),
  async (req, res) => {
    const { foodid } = req.params;

    try {
      const updatedFood = await FoodData.findByIdAndUpdate(
        foodid,
        {
          foodImage: req.file.buffer,
        },
        { new: true }
      );

      res.json({ message: "Food data updated successfully", updatedFood });
    } catch (error) {
      console.error("Error updating food data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

app.delete("/delete_food_data/:foodid", async (req, res) => {
  const { foodid } = req.params;

  try {
    // Find the document with the specified home_id and delete it
    const result = await FoodData.findOneAndDelete({ _id: foodid });

    if (!result) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

//  ***************************** END OF FOOD-DATA ****************************

//  ***************************** START OF ORDERSAVING ****************************
app.post("/save_current_order", async (req, res) => {
  try {
    const newOrder = new CurrentOrder(req.body);
    const result = await newOrder.save();

    const {
      table_no,
      no_of_seats,
      running_order,
      items_ordered,
      order_no,
      items,
      orderFrom,
    } = req.body;
    const update_data = {
      table_taken: running_order,
      table_pploccupied: no_of_seats,
      table_itemsordered: items_ordered,
      table_type: orderFrom,
    };

    // adter saving just update the table details page
    await axios.put(`http://localhost:9999/update_table_data/${table_no}`, update_data)
    // this is for kitche to dispaly  the current order to prepare
    const send_order = {
      tableNo: table_no,
      orderNo: order_no,
      items: items,
      from: orderFrom,
      type: 'dinein' // should be changed
    }
    await axios.post('http://localhost:9999/save_running_order', send_order);
    res.status(201).json({ message: 'Items saved successfully and updated' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get("/get_saved_orders", async (req, res) => {
  try {
    const orders = await CurrentOrder.find({});
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/get_saved_orders/:tableno", async (req, res) => {
  const { tableno } = req.params;
  try {
    const orders = await CurrentOrder.find({
      table_no: tableno,
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).send("Internal Server Error");
  }
});

// fixed here
app.put('/update_current_order/:tableno', async (req, res) => {
  const { tableno } = req.params;
  try {
    const { items, items_ordered, total, orderFrom } = req.body;
    console.log(req.body);
    const updateOrder = await CurrentOrder.findOneAndUpdate(
      { table_no: tableno },
      {
        $set: req.body

      }, { new: true }
    );
    console.log("updated order:", updateOrder.orderFrom);
    const orderfrom = updateOrder.orderFrom;
    const update_data = {
      table_type: orderfrom,
      table_itemsordered: items_ordered,
    }
    console.log("thevidiya:", update_data);
    // update the table data ?? s
    await axios.put(`http://localhost:9999/update_table_data/${tableno}`, update_data)

    // for current trunning orders
    const send_update_order = {
      items: items,
    }
    await axios.put(`http://localhost:9999/update_running_order/${tableno}`, send_update_order)

    res.status(201).json({ message: 'Items Updated successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/get_current_order_indoor/:tableno', async (req, res) => {
  const { tableno } = req.params;
  try {
    const getindoororder = await CurrentOrder.findOne({
      table_no: tableno,
      orderFrom: 'indoor',
    });
    console.log(getindoororder);
    res.json(getindoororder);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/get_current_order_outdoor/:tableno', async (req, res) => {
  const { tableno } = req.params;
  try {
    const getindoororder = await CurrentOrder.findOne({
      table_no: tableno,
      orderFrom: 'outdoor',
    });
    console.log(getindoororder);
    res.json(getindoororder);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.delete("/delete_current_indoor_order/:tableno", async (req, res) => {
  const { tableno } = req.params;
  try {
    const findtable = await TablePage.find({
      table_no: tableno,
    });
    console.log("inside deleting", findtable);

    const table_type = "indoor";
    console.log("befor deelting:", table_type);

    const update_table = {

      table_taken: '0',
      table_pploccupied: '0',
      table_itemsordered: '0',
      table_type: table_type,


    }
    console.log("update table before deleting", update_table);
    await axios.put(`http://localhost:9999/update_table_data/${tableno}`, update_table);

    const updateNewtable = await CurrentOrder.findOneAndDelete({
      table_no: tableno,
    });
    console.log("delete oredr", updateNewtable);

    await axios.delete(`http://localhost:9999/delete_running_indoor_order/${tableno}`);

    res
      .status(201)
      .json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete_current_outdoor_order/:tableno", async (req, res) => {
  const { tableno } = req.params;
  try {
    const findtable = await TablePage.find({
      table_no: tableno,
    });
    console.log("inside deleting", findtable);

    const table_type = "outdoor";
    console.log("befor deelting:", table_type);

    const update_table = {

      table_taken: '0',
      table_pploccupied: '0',
      table_itemsordered: '0',
      table_type: table_type,


    }
    console.log("update table before deleting", update_table);
    await axios.put(`http://localhost:9999/update_table_data/${tableno}`, update_table);

    const updateNewtable = await CurrentOrder.findOneAndDelete({
      table_no: tableno,
    });
    console.log("delete oredr", updateNewtable);

    await axios.delete(`http://localhost:9999/delete_running_outdoor_order/${tableno}`);

    res
      .status(201)
      .json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  ***************************** END OF ORDERSAVING ****************************
//  ***************************** START OF RUNNINGORDER ****************************
app.get("/get_running_order", async (req, res) => {
  try {
    const runningorder = await RunningOrder.find({});
    res.json(runningorder);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/save_running_order", async (req, res) => {
  try {
    const saveorder = new RunningOrder(req.body);
    await saveorder.save();
    console.log("saved the running order");
    res.json(saveorder);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update_running_order/:tableno", async (req, res) => {
  const { tableno } = req.params;
  // console.log(req.body);
  // const tablnoupdated = req.body.filter(x => x.tableNo == tableno);
  // console.log(tablnoupdated);
  // tablnoupdated[0].items.map((val)=>{
  //     console.log(val.status);
  // })
  try {
    const updateorder = await RunningOrder.findOneAndUpdate(
      {
        tableNo: tableno,
      },
      {
        $set: req.body,
      }
    );
    res.json({ msg: "updated from running order" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update_running_items/:tableno", async (req, res) => {
  const { tableno } = req.params;
  try {
    const { _id } = req.body;
    console.log(_id);
    const updateitem = await RunningOrder.updateOne(
      { tableNo: tableno },
      {
        $pull: {
          items: {
            _id: _id,
          },
        },
      }
    );
    res.json({ msg: "updated the item from running order" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete_running_indoor_order/:tableno", async (req, res) => {
  const { tableno } = req.params;
  try {
    const updateNewtable = await RunningOrder.findOneAndDelete({
      tableNo: tableno,
    });

    res
      .status(201)
      .json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete_running_outdoor_order/:tableno", async (req, res) => {
  const { tableno } = req.params;
  try {
    const updateNewtable = await RunningOrder.findOneAndDelete({
      tableNo: tableno,
    });

    res
      .status(201)
      .json({ success: true, message: "Document deleted successfully" });
  } catch (error) {
    console.log(error);
  }
});

//  ***************************** END OF RUNNINGORDER ****************************

//  ***************************** START OF CUTOMERDETAILS ****************************
app.post('/save_customer_details', async (req, res) => {
  try {
    const CustomerDetail = new CustomerDetails(req.body);
    await CustomerDetail.save();

    res.status(201).json({ message: 'Customer Details Saved', success: true });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.put("/update_customer_details/:orderid", async (req, res) => {
  try {
    const { orderid } = req.params;
    const updateCustomer = await CustomerDetails.findOneAndUpdate(
      {
        order_no: orderid,
      },
      {
        $set: req.body,
      }
    );
    res.status(201).json({ message: "Items Updated successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_customer_details", async (req, res) => {
  try {
    const cust_det = await CustomerDetails.find({ }).lean();
    const delv_cust = await DeliverySaleCustomerDetails.find({ }).lean();
    const takaw_cust = await TakeAwayCustomerDetails.find({ }).lean();
    const customer_deatails = [...cust_det,...delv_cust,...takaw_cust]
    res.json(customer_deatails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_customerbyid/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const res2 = await CustomerDetails.findById({
      _id: id,
    });
    res.json(res2);
  } catch (error) {
    console.log(error);
  }
});

app.get('/get_customerby_order_no/:orderno', async (req, res) => {
  const { orderno } = req.params;
  try {
    const res2 = await CustomerDetails.findOne({
      order_no: orderno,
    });
    res.json(res2);
  } catch (error) {
    console.log(error);
  }
})
//  ***************************** END OF CUTOMERDETAILS ****************************

//  ***************************** START OF WAITER ****************************
app.post("/add_waiter_details", async (req, res) => {
  try {
    const waiterData = new Waiter(req.body);
    waiterData.save();
    res.json({ msg: "Waiter created successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_waiter", async function (req, res) {
  try {
    const getWaiter = await Waiter.find({});
    res.json(getWaiter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_waiter/:waiterid", async function (req, res) {
  const { waiterid } = req.params;
  try {
    const getWaiter = await Waiter.findById({
      _id: waiterid,
    });

    res.json(getWaiter);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update_waiter/:waiterid", async (req, res) => {
  const { waiterid } = req.params;
  try {
    const updateWaiter = await Waiter.findOneAndUpdate(
      {
        _id: waiterid,
      },
      {
        $set: req.body,
      }
    );
    res.json({ msg: "Waiter updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete_waiter/:waiterid", async (req, res) => {
  const { waiterid } = req.params;
  try {
    const waiterDelete = await Waiter.findByIdAndDelete({
      _id: waiterid,
    });
    res.json({ msg: "deleter waiter" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  ***************************** END OF WAITER ****************************

//  ***************************** START OF BILLD ****************************
app.get("/get_billd", async (req, res) => {
  try {
    const getBild = await Billd.find({});
    res.json(getBild);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
app.put("/update_billd/:bill_id", async (req, res) => {
  const { bill_id } = req.params;
  try {
    const updateBill = await Billd.findByIdAndUpdate(
      {
        _id: bill_id,
      },
      {
        $set: req.body,
      }
    );
    // const bill = new Billd(req.body);
    // await bill.save();
    res.json("saved");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//  ***************************** END OF BILLD ****************************
// ****************************** START OF TAKEAWAY ****************************

app.post("/save_takeaway_order", async (req, res) => {
  try {
    const newOrder = new TakeAwayCustomerDetails(req.body);
    const result = await newOrder.save();

    res
      .status(201)
      .json({ success: true, message: "Items saved successfully and updated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_takeaway_order", async (req, res) => {
  try {
    const result = await TakeAwayCustomerDetails.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_bytakeaway_order/:orderid", async (req, res) => {
  const { orderid } = req.params;
  try {
    const res1 = await TakeAwayCustomerDetails.find({
      order_no: orderid,
    });
    console.log(res1);
    res.json(res1);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update_takeaway_order/:orderid", async (req, res) => {
  const { orderid } = req.params;
  try {
    const res1 = await TakeAwayCustomerDetails.findOneAndUpdate(
      {
        order_no: orderid,
      },
      {
        $set: req.body,
      }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete_takeaway_order/:orderid", async (req, res) => {
  try {
    const { orderid } = req.params;
    const delte = await TakeAwayCustomerDetails.findOneAndDelete({
      order_no: orderid,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/save_current_takeaway_order", async (req, res) => {
  try {
    const newOrder = new TakeAwayCurrentOrder(req.body);
    const result = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Items saved successfully and updated to current order",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_running_takeaway_order", async (req, res) => {
  try {
    const dlo = await TakeAwayCurrentOrder.find({});
    res.json(dlo);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_takeaway_order/:orderid", async (req, res) => {
  const { orderid } = req.params;
  try {
    const dlo = await TakeAwayCurrentOrder.findOne({
      order_no: orderid,
    });
    res.json(dlo);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update_running_takeaway_order/:orderno", async (req, res) => {
  const { orderno } = req.params;
  try {
    const newOne = await TakeAwayCurrentOrder.findOneAndUpdate(
      {
        order_no: orderno,
      },
      {
        $set: req.body,
      }
    );
    res.json({ success: true, message: "updated the food status" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update_takeaway_backend_order/:orderno", async (req, res) => {
  try {
    const { orderno } = req.params;
    const { _id } = req.body;
    console.log(_id);
    const updateitem = await TakeAwayCurrentOrder.updateOne(
      { order_no: orderno },
      {
        $pull: {
          items: {
            _id: _id,
          },
        },
      }
    );
    res.json({ msg: "updated the item from running order" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// ****************************** END OF TAKEAWAY *******************************
// ****************************** START OF DELIVERSALE ******************************
app.post("/save_deliverysale_order", async (req, res) => {
  try {
    const newOrder = new DeliverySaleCustomerDetails(req.body);
    const result = await newOrder.save();

    res
      .status(201)
      .json({ success: true, message: "Items saved successfully and updated" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_deliversale_order", async (req, res) => {
  try {
    const result = await DeliverySaleCustomerDetails.find({});
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_bydeliverysale_order/:orderid", async (req, res) => {
  const { orderid } = req.params;
  try {
    const res1 = await DeliverySaleCustomerDetails.find({
      order_no: orderid,
    });
    res.json(res1);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update_deliverysale_order/:orderid", async (req, res) => {
  const { orderid } = req.params;
  try {
    const res1 = await DeliverySaleCustomerDetails.findOneAndUpdate(
      {
        order_no: orderid,
      },
      {
        $set: req.body,
      }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete_deliverysale_order/:orderid", async (req, res) => {
  try {
    const { orderid } = req.params;
    const delte = await DeliverySaleCustomerDetails.findOneAndDelete({
      order_no: orderid,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/save_current_deliverysale_order", async (req, res) => {
  try {
    const newOrder = new DeliverySaleCurrentOrder(req.body);
    const result = await newOrder.save();

    res.status(201).json({
      success: true,
      message: "Items saved successfully and updated to current order",
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_running_deliverysale_order", async (req, res) => {
  try {
    const dlo = await DeliverySaleCurrentOrder.find({});
    res.json(dlo);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update_running_deliverysale_order/:orderno", async (req, res) => {
  const { orderno } = req.params;
  try {
    const newOne = await DeliverySaleCurrentOrder.findOneAndUpdate(
      {
        order_no: orderno,
      },
      {
        $set: req.body,
      }
    );
    res.json({ success: true, message: "updated the food status" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update_deliverysale_backend_order/:orderno", async (req, res) => {
  try {
    const { orderno } = req.params;
    const { _id } = req.body;
    console.log(_id);
    const updateitem = await DeliverySaleCurrentOrder.updateOne(
      { order_no: orderno },
      {
        $pull: {
          items: {
            _id: _id,
          },
        },
      }
    );
    res.json({ msg: "updated the item from running order" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete_running_deliverysale_order/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const delte = await DeliverySaleCurrentOrder.findOneAndDelete({
      _id: id,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ msg: "deleted successfully" });
  }
});
// ****************************** END OF DELIVERYSALE *******************************
//  ***************************** START OF MessDetails ****************************

app.get("/get_messDetails", async (req, res) => {
  try {
    const messDetails = await MessDetails.find({});
    res.json(messDetails);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/get_messDetails/:messid", async (req, res) => {
  const { messid } = req.params;
  try {
    const messDetails = await MessDetails.find({
      _id: messid,
    });
    res.json(messDetails);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.post("/save_messDetails", async (req, res) => {
  try {
    const messDetail = new MessDetails(req.body);
    const result = await messDetail.save();

    res
      .status(201)
      .json({ success: true, message: "Items saved successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.put("/update_messDetails/:messDetail_id", async (req, res) => {
  const { messDetail_id } = req.params;
  try {
    const updatedDetails = await MessDetails.findByIdAndUpdate(
      {
        _id: messDetail_id,
      },
      {
        $set: req.body,
      }
    );
    res.json("saved");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/delete_messDetails/:messDetails_id", async (req, res) => {
  try {
    const { messDetails_id } = req.params;
    const delte = await MessDetails.findOneAndDelete({
      _id: messDetails_id,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//  ***************************** END OF MessDetails ****************************
// ******************************** START OF Recipiet Details ****************************

app.get('/get_recipiet', async (req, res) => {
  try {
    const rec = await Recipiet.find({});
    res.json({ success: true, data: rec });
  } catch (error) {
    res.status(500).json({ message: "Error in get_recipiet" });
  }
});

app.put('/update_recipiet/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rec = await Recipiet.findOneAndUpdate({
      _id: id,
    }, {
      $set: req.body,
    });
    res.json({ success: true, msg: "Recipiet updated", data: rec });
  } catch (error) {
    res.status(500).json({ message: "Error in post_recipiet" });
  }
});

// ******************************** END OF RECIPIENT *******************************

// ******************************** START OF CASHATSTARTING ********************************
app.post('/add_cashatstarting', async (req, res) => {
  try {
    const res1 = CashAtStarting(req.body);
    await res1.save();
    res.json({ success: true, msg: "Cash added" });
  } catch (error) {
    res.status(500).json({ error: "error at cashat starting" });
  }
});

app.get('/get_cashatstarting', async (req, res) => {
  try {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns month index starting from 0
    const date = String(currentDate.getDate()).padStart(2, '0'); // Adding padding for single-digit dates
    const formattedDate = `${year}-${month}-${date}`;

    const cas = await CashAtStarting.findOne({
      selectedDate: formattedDate
    });

    console.log(cas);
    res.json(cas);
  } catch (error) {
    res.status(500).json({ error: "error at cashat starting" });
  }
});

app.put('/update_cashatstarting/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const casdata = await CashAtStarting.findOneAndUpdate({
      _id: id,
    },
      {
        $set: req.body,
      });

    res.json({ success: true, data: casdata });
  } catch (error) {
    res.status(500).json({ error: "error at cashat starting" });
  }
});

app.get('/get_cashatstarting1/:getdate', async (req, res) => {
  const { getdate } = req.params;
  console.log(getdate);
  try {
    // Convert the integer date to a string
    const dateString = String(getdate);

    // Extract year, month, and date from the string
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);
    const formattedDate = `${year}-${day}-${month}`;
    // console.log("from backends: " + formattedDate);
    const cas = await CashAtStarting.findOne({
      selectedDate: getdate
    });

    // console.log(cas);
    res.json(cas);
  } catch (error) {
    res.status(500).json({ message: "Error in get_cashatstarting" });
  }
});

// ******************************** END OF CASHSTARTING *******************************

// ******************************** START OF CODLOG *******************************

app.get('/get_codlog', async (req, res) => {
  try {

    const cust_det = await CustomerDetails.find({ paid_by: 'cash' }).lean();
    const delv_cust = await DeliverySaleCustomerDetails.find({ paid_by: 'cash' }).lean();
    const takaw_cust = await TakeAwayCustomerDetails.find({ paid_by: 'cash' }).lean();

    // Combine the data into one array
    const combinedData = [...cust_det, ...delv_cust, ...takaw_cust];

    res.json({ data: combinedData, success: true });
  } catch (error) {
    res.json({ message: "Error in get_codlog" });
  }
});

// ******************************** END OF CODLOG *******************************

// ********************************* START OF SETTLE SALES ****************************

app.get('/get_cashsale/:getdate', async (req, res) => {
  const { getdate } = req.params;
  console.log("from cashsale", getdate);
  try {

    const originalDate = getdate;
    const convertedDate = convertDateFormat(originalDate);
    console.log(convertedDate);

    const cust_det = await CustomerDetails.find({ paid_by: 'cash', date: convertedDate }).lean();
    const delv_cust = await DeliverySaleCustomerDetails.find({ paid_by: 'cash', date: convertedDate }).lean();
    const takaw_cust = await TakeAwayCustomerDetails.find({ paid_by: 'cash', date: convertedDate }).lean();

    console.log(cust_det);
    // Calculate total sales
    const totalSales = calculateTotalSales([...cust_det, ...delv_cust, ...takaw_cust]);

    res.json({ totalSales, success: true });

  } catch (error) {
    res.json({ message: "Error in get_cashsale" });
  }
});



app.get('/get_creditsalerecovery/:currdate', async (req, res) => {
  const {currdate} = req.params;
  try {
    const originalDate = currdate;
    const convertedDate = convertDateFormat(originalDate);
    console.log(convertedDate);

    const cust_det = await CustomerDetails.find({ paid_by: 'creditsale', date: convertedDate }).lean();
    const delv_cust = await DeliverySaleCustomerDetails.find({ paid_by: 'creditsale', date: convertedDate }).lean();
    const takaw_cust = await TakeAwayCustomerDetails.find({ paid_by: 'creditsale', date: convertedDate }).lean();

    // Calculate total sales
    const creditSales = calculateTotalSales([...cust_det, ...delv_cust, ...takaw_cust]);

    res.json({ creditSales, success: true });
  } catch (error) {
    res.json({ message: "Error in get_cashsale" });
  }
});

function convertDateFormat(dateString) {
  const parts = dateString.split('-');
  const year = parts[0];
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);

  // Format the date as MM/DD/YYYY
  const formattedDate = `${month}/${day}/${year}`;
  return formattedDate;
}

// Function to calculate total sales
function calculateTotalSales(data) {
  let total = 0;
  for (const item of data) {
    total += item.total; // Assuming there is an 'amount' field in each document
  }
  return total;
}

// ******************************** END OF SETTLE SALES ****************************
// ******************************** START OF PAYBACK ****************************
app.get('/get_payback', async (req, res) => {
  try {

    const cust_det = await CustomerDetails.find().lean();
    const delv_cust = await DeliverySaleCustomerDetails.find().lean();
    const takaw_cust = await TakeAwayCustomerDetails.find().lean();

    // Combine the data into one array
    const combinedData = [...cust_det, ...delv_cust, ...takaw_cust];
    console.log(combinedData.length);

    res.json({ data: combinedData, success: true });
  } catch (error) {
    res.json({ message: "Error in get_payback" });
  }
});
// ******************************** END OF PAYBACK ****************************
// ******************************** START OF EXPENSES ***************************
app.post('/post_expenses', async (req, res) => {
  try {
      console.log(req.body);
      const purchase = new Expenses(req.body);
     
      await purchase.save();
   
      res.status(201).send({success: true, message:"purchase saved successfully"});
  } catch (error) {
      
      res.status(400).send('Error creating purchase: ' + error.message);
  }
});

// ******************************** END OF EXPENSES ***************************

// ******************************** START OF CREDIT SALE ************************

app.get('/get_creditsale', async (req, res) => {
  try {
    const cust_det = await CustomerDetails.find({ paid_by: 'creditsale', amountpaid:0 }).lean();
    const delv_cust = await DeliverySaleCustomerDetails.find({ paid_by: 'creditsale', amountpaid:0 }).lean();
    const takaw_cust = await TakeAwayCustomerDetails.find({ paid_by: 'creditsale', amountpaid:0 }).lean();

    const creditsaledetails = [...cust_det, ...delv_cust, ...takaw_cust];
    console.log(creditsaledetails);
    res.json(creditsaledetails);
  } catch (error) {
    res.status(400).send('Error getting creditsale');
  }
});

app.put('/update_creditsale_dineincustomerdetails/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const updateCust = await CustomerDetails.findOneAndUpdate({
      _id: id,
    },
      {
        $set: req.body,
      });

      res.json({success:true});

  } catch (error) {
    res.status(404).send('Error updating cresitsale in dinine');
  }
});

app.put('/update_creditsale_deliverysalecustomerdetails/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const updateCust = await DeliverySaleCustomerDetails.findOneAndUpdate({
      _id: id,
    },
      {
        $set: req.body,
      });

      res.json({success:true});

  } catch (error) {
    res.status(404).send('Error updating cresitsale in dinine');
  }
});

app.put('/update_creditsale_takeawaysalecustomerdetails/:id', async (req, res) => {
  const {id} = req.params;
  try {
    const updateCust = await TakeAwayCustomerDetails.findOneAndUpdate({
      _id: id,
    },
      {
        $set: req.body,
      });

      res.json({success:true});

  } catch (error) {
    res.status(404).send('Error updating cresitsale in dinine');
  }
});


// ******************************** END OF CREDIT SALE **************************

// ************************************DONT NOT TOUCH ****************************
// api handler
app.get("/", (req, res) => {
  res.json("Server running");
});

app.listen(9999, () => {
  console.log("port listening on http://localhost:9999");
});

// q1olisZZfHsPMazm

// mongodb+srv://whitelegend56:q1olisZZfHsPMazm@cluster0.jsetkub.mongodb.net/?retryWrites=true&w=majority
