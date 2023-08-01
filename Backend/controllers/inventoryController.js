const mongoose = require('mongoose');
const Usermodel = require("../models/Usermodel");
const inventoryModel = require("../models/inventoryModel");


const createInventoryController = async (req, res) => {
    try {
        const {email , inventoryType } = req.body;
        
        //validation
        const user = await Usermodel.findOne({ email });
        if(!user){
            throw new Error("User not found");
        }
        if(!inventoryType === "in" && user.role !== "donar"){
            throw new Error("Not a donar account");
        }
        if(inventoryType === "out" && user.role !== "hospital"){
            throw new Error("Not a hospital");
        }

        // save record 
        const invetory = new inventoryModel(req.body);
        await invetory.save();

        return res.status(201).send({
            success : true,
            message : "New Blood Record Found"
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success : false,
            message : "Error while creating Invetory API",
            error
        })
    }
}

// get all blood records
const getInventoryController = async(req , res) =>{
    try {
        const inventory = await inventoryModel.find({organisation : req.body.UserId})
        .populate("donar")
        .populate("hospital")
        .sort({ createdAt : -1 });
        res.status(200).send({
            success : true,
            message : 'Get all records successfully',
            inventory
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success : false,
            message : 'Error in GET All Inventory',
            error
        })
    }
}

module.exports = { createInventoryController  , getInventoryController};