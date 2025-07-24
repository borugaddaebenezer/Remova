import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// API Controller to handle Clerk Webhooks
// POST /api/user/webhooks

const clerkWebhooks = async (req, res) => {
  try {
    console.log("✅ Webhook hit at /api/user/webhooks");

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
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, credits: userData.creditBalance }); // ✅ spelling: "credits", not "credit"
  } catch (error) {
    console.error("❌ Credit fetch error:", error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { clerkWebhooks, userCredits };