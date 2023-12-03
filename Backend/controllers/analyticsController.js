const inventoryModel = require("../models/inventoryModel");
const mongoose = require("mongoose");

// GET BOOD DATA
const bloodGroupDetailsController = async (req , res ) => {
    try {
        const bloodGroups = ["O+", "O-", "AB+" , "AB-" , "A+" , "A-" , "B+" , "B-" ];
        const bloodGroupData = [];
        const organistaion = new mongoose.Types.ObjectId(req.body.userId)  

        // get single blood group
        await Promise.all(bloodGroups.map(async (bloodGroup) => {
            // Count Total In
            const totalIn = await inventoryModel.aggregate([
                {
                    $match : {
                        bloodGroup : bloodGroup,
                        inventoryType : "in",
                        organistaion
                    }
                },
                {
                    $group : {
                        _id:null, 
                        total : {$sum: '$quantity'}
                    }
                }
            ])

            // Count Total out
            const totalOut = await inventoryModel.aggregate([
                {
                    $match : {
                        bloodGroup : bloodGroup,
                        inventoryType : "out",
                        organistaion
                    }
                },
                {
                    $group : {
                        _id:null, 
                        total : {$sum: '$quantity'}
                    }
                }
            ])

            // Calculate total
            const availableBlood = (totalIn[0]?.total || 0) - (totalOut[0]?.total || 0)

            // push data
            bloodGroupData.push({
                bloodGroup,
                totalIn : totalIn[0]?.total || 0,
                totalOut : totalOut[0]?.total || 0,
                availableBlood
            })
        }))

        return res.status(200).send({
            success : true,
            message : "Blood Group Data Fetched Successfully",
            bloodGroupData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success : false,
            message : "Error in BloodGroup Data Analytics API",
            error
        })
    }
}

module.exports = { bloodGroupDetailsController};