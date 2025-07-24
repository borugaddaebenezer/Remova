import { messageInRaw, Webhook } from "svix";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";


// API Controller to handle Clerk Webhooks
// POST /api/user/webhooks

const clerkWebhooks = async (req, res) => {
  try {

    // Create a Svix webhook instance using the correct environment variable
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    console.log("🔑 Clerk secret loaded:", !!process.env.CLERK_WEBHOOK_SECRET);

    // Verify webhook signature
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });
    console.log("🔒 Signature verified");

    const { data, type } = req.body;
    console.log("📩 Event Type:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
          creditBalance: 5,
        };

        console.log("📥 Creating user in MongoDB:", userData);
        await userModel.create(userData);
        console.log("✅ User created successfully");

        return res.status(200).json({ success: true });
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };

        console.log("✏️ Updating user:", data.id);
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        console.log("✅ User updated successfully");

        return res.status(200).json({ success: true });
      }

      case "user.deleted": {
        console.log("🗑️ Deleting user:", data.id);
        await userModel.findOneAndDelete({ clerkId: data.id });
        console.log("✅ User deleted successfully");

        return res.status(200).json({ success: true });
      }

      default:
        console.log("⚠️ Unhandled event type:", type);
        return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//api controller function to get user available credits data
const userCredits = async (req, res) => {
  try {
    const clerkId = req.userId; // ✅ comes from auth middleware
    const userData = await userModel.findOne({ clerkId });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.json({ success: true, credits: userData.creditBalance }); // ✅ spelling: "credits", not "credit"
  } catch (error) {
    console.error("❌ Credit fetch error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Gatewat initialize
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

const paymentRazorpay = async (req, res) => {
  try {
    const clerkId = req.userId; // ✅ From auth middleware
    const { planId } = req.body;

    const userData = await userModel.findOne({ clerkId });
    if (!userData || !planId) {
      return res.json({ success: false, message: "Invalid Credientials" });
    }
    let credits, plan, amount, date;
    switch (planId) {
      case "Basic":
        plan = "Basic";
        credits = 100;
        amount = 10;
        break;
      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50;
        break;
      case "Business":
        plan = "Business";
        credits = 5000;
        amount = 250;
        break;
      default:
        break;
    }
    date = Date.now();
    //creating transaction
    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    };
    const newTransaction = await transactionModel.create(transactionData);
    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    };

    try {
      const order = await razorpayInstance.orders.create(options);
      res.json({ success: true, order });
    } catch (error) {
      console.log("❌ Razorpay error:", error);
      res.json({ success: false, message: error.message });
    }
  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};

//api controller function to verify razorpay payment
const verifyRazorpay = async (req, res) => {
    try {
        const { razorpay_order_id } = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if (orderInfo.status==='paid') {
            const transactionData=await transactionModel.findById(orderInfo.receipt)
            if (transactionData.payment) {
                return res.json({success:false,message:'Payment Failed'})
            }
            //adding credits in user data
            const userData=await userModel.findOne({clerkId:transactionData.clerkId})
            const creditBalance=userData.creditBalance+transactionData.credits
            await userModel.findByIdAndUpdate(userData._id,{creditBalance})

            //making the payment true
            await transactionModel.findByIdAndUpdate(transactionData._id,{payment:true})
            res.json({success:true,message:'Credits Added'});
        }

    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


export { clerkWebhooks, userCredits, paymentRazorpay, verifyRazorpay};
