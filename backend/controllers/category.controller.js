const { response } = require('express');
const fs = require('fs');
const { request } = require('http');
const uuid = require('uuid');

const dataFile = process.cwd() + "/data/category.json";

exports.getAll = (request, response) => {
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const saveData = JSON.parse(data);

        return response.json({ status: true, message: saveData});
    });
};

exports.create = (request, response) => {
    //id, categoryName
    const{ categoryName} = request.body;

    console.log(request.body);

    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status:false, message:readErr});
        }
        
        const parsedData = data ? JSON.parse(data) : [];

        const newObj = {id:uuid.v4(), categoryName};

        parsedData.push(newObj);

        fs.writeFile(dataFile, JSON.stringify(parsedData), (writeErr) =>{
            if (writeErr) {
                return response.json({ status:false, message:writeErr});
            }

            return response.json({ status:true, result: parsedData });
        });
    });
};

exports.update = (req,res) => {
    const{ id, categoryName } = req.body;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr});
        }

        const parsedData = JSON.parse(data);

        const updateData = parsedData.map((cateObj) => {
            if (cateObj.id == id) {
                return {...cateObj,categoryName};
            } else {
                return cateObj;
            }
        });
        fs.writeFile(dataFile,JSON.stringify(updateData), (writeErr) => {
            if (writeErr) {
                return response.json({ status: false, message: writeErr});
            }

            return response.json({ status: true, result: updateData });
        });
    });
};

exports.delete = (req,res) => {
    const { id } = req.params;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr});
        }

        const parsedData = JSON.parse(data);

        const deleteData = parsedData.filter((e) => e.id != id); 

        fs.writeFile(dataFile,JSON.stringify(deleteData), (writeErr) => {
            if (writeErr) {
                return response.json({ status: false, message: writeErr});
            }

            return response.json({ status: true, result: deleteData });
        });
    });
};
