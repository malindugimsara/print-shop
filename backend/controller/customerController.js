import Customer from "../modules/customer.js";
import bcrypt from "bcrypt"; 
import jwd from "jsonwebtoken";
import dotenv from "dotenv";
import axios from "axios";
import nodemailer from "nodemailer";
import { OTP } from "../modules/otp.js";
dotenv.config();

// This function saves a new user to the database
export function createCustomer(req, res) {
    if (req.body.role == "admin") {
        if (req.user == null) {
            return res.status(403).json({
                message: "Please login as an admin to create a new customer"
            });
        }
        
    }
    const customer =new Customer({
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        isDisable: req.body.isDisable || false, // Default isDisable to false
    })


    customer.save().then(()=> {
        res.json({
            message: "Customer created successfully"
        })
    }).catch((err) => {
        console.error("Error creating Customer:", err);
        res.status(500).json({
            message: "Error creating user",
            error: err.message
        });
    })
}

// export function getCurrentUser(req, res) {
//     if (req.user == null) {
//         res.status(403).json({
//             message: "You need to login first"
//         });
//         return;
//     }
//     res.json({
//         user: req.user});
// }   

// export function getUser(req,res){
//   if(req.user == null){
//     res.status(403).json({
//       message: "You are not authorized to view user details."
//     })
//     return
//   }else{
//     res.json({
//       ...req.user
//     })
//   }
// }

// export function deleteUser(req, res) {
//   if (req.user == null) {
//     return res.status(403).json({ message: "You need to login first" });
//   }
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ message: "You are not authorized to delete a user" });
//   }

//   User.findByIdAndDelete(req.params.userID)
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       res.json({ message: "User deleted successfully" });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error deleting user",
//         error: err.message,
//       });
//     });
// }

// export function updateUser(req, res) {
//   if (req.user == null) {
//     res.status(403).json({
//       message: "You need to login first",
//     });
//     return;
//   }

//   // Assuming you're using MongoDB with Mongoose and User model
//   User.findByIdAndUpdate(req.params.userID, req.body, { new: true })
//     .then((user) => {
//       if (!user) {
//         return res.status(404).json({
//           message: "User not found",
//         });
//       }

//       res.json({
//         message: "User updated successfully",
//         user,
//       });
//     })
//     .catch((err) => {
//       res.status(500).json({
//         message: "Error updating user",
//         error: err.message,
//       });
//     });
// }

// export function getAllUsers(req, res) {
//     if (req.user == null) {
//         return res.status(403).json({
//             message: "You need to login first"
//         });
//     }
   
//     User.find().then((users) => {
//         res.json(users);
//     }).catch((err) => {
//         console.error("Error fetching users:", err);
//         res.status(500).json({
//             message: "Error fetching users",
//             error: err.message
//         });
//     });
// }


// ==================================
// 🔍 AUTOCOMPLETE CUSTOMER BY NAME
// ==================================
export const searchCustomerByName = async (req, res) => {
  try {
    const { name } = req.params;

    const customers = await Customer.find({
      name: { $regex: `^${name}`, $options: "i" },
    })
      .limit(10)
      .select("name email phoneNumber");

    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ==================================
// 📧 CHECK CUSTOMER BY EMAIL
// ==================================
export const getCustomerByPhoneNumber = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      phoneNumber: req.params.phoneNumber,
    });

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export function getAllCustomers(req, res) {
    if (req.user == null) {
        return res.status(403).json({
            message: "You need to login first"
        });
    }

    Customer.find().then((customers) => {
        res.json(customers);
    }).catch((err) => {
        console.error("Error fetching customers:", err);
        res.status(500).json({
            message: "Error fetching customers",
            error: err.message
        });
    });
}

export function deleteCustomer(req, res) {
  if (req.user == null) {
    return res.status(403).json({ message: "You need to login first" });
  }
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "You are not authorized to delete a Customer" });
  }

  Customer.findByIdAndDelete(req.params.customerID)
    .then((Customer) => {
      if (!Customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
      res.json({ message: "Customer deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Error deleting Customer",
        error: err.message,
      });
    });
}

export function updateCustomer(req, res) {
  if (req.user == null) {
    res.status(403).json({
      message: "You need to login first",
    });
    return;
  }

  // Assuming you're using MongoDB with Mongoose and User model
Customer.findByIdAndUpdate(req.params.customerID, req.body, { new: true })
  .then((customer) => {
    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.json({
      message: "Customer updated successfully",
      customer,
    });
  })
  .catch((err) => {
    res.status(500).json({
      message: "Error updating customer",
      error: err.message,
    });
  });
}