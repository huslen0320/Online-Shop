const { response } = require('express');
const fs = require('fs');
const { request } = require('http');
const uuid = require('uuid');

const dataFile = process.cwd() + "/data/menu.json";

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
    const{ menuName, link } = request.body;

    console.log(request.body);

    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status:false, message:readErr});
        }
        
        const parsedData = data ? JSON.parse(data) : [];

        const newObj = {id:uuid.v4(), menuName, link};

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
    const{ id, menuName,link, position } = req.body;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr});
        }

        const parsedData = JSON.parse(data);

        const updateData = parsedData.map((menuObj) => {
            if (menuObj.id == id) {
                return {...menuObj, menuName, link, position };
            } else {
                return menuObj;
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

    console.log(req.params);

    const { mid } = req.params;



    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr});
        }

        const parsedData = JSON.parse(data);

        const deleteData = parsedData.filter((e) => e.id != mid); 

        fs.writeFile(dataFile,JSON.stringify(deleteData), (writeErr) => {
            if (writeErr) {
                return response.json({ status: false, message: writeErr});
            }

            console.log(deleteData);

            return response.json({ status: true, result: deleteData });
        });
    });
};
