const fs = require('fs');
const path = require('path');
const uuidv4 = require('uuid');
const { promisify } = require('util')
const writeFileAsync = promisify(fs.writeFile)

const User = require('../models/user');
const { SchemaTypeOptions } = require('mongoose');

exports.index = async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        data: users
    });

}

exports.insert = async (req, res, next) => {
    const {userName, nickName, firstName, lastName, position, nationality, telephoneNumber, startingDate,
        address, subdistrict, district, province, postalCode, facebook, lineId, skills, instagram, interests,
        educations, experiences, guild, profileImage, backgroundImage} = req.body

    let user = new User({
        userName: userName,
        nickName: nickName,
        firstName: firstName,
        lastName: lastName,
        position: position,
        nationality: nationality,
        telephoneNumber: telephoneNumber,
        startingDate: startingDate,
        address: address,
        subdistrict: subdistrict,
        district: district,
        province: province,
        postalCode: postalCode,
        facebook: facebook,
        lineId: lineId,
        instagram: instagram,
        skills: skills,
        educations: educations,
        experiences: experiences,
        interests: interests,
        guild: guild,
        profileImage: await saveImageToDisk(profileImage),
        backgroundImage: await saveImageToDisk(backgroundImage)
    });
    await user.save();

    // console.log(req.fields)
    // console.log(req.files)
    // const obj = JSON.parse(req.fields.skill)

    res.status(200).json({
        message: 'Create new user successfully'
    });

}

exports.show = async (req, res, next) => {

    try{
        const {id} = req.params;
        const user = await User.findById(id)
    
        res.status(200).json({
            data: user
        });       
    } catch (error){
  
        res.status(400).json({
            error:{
                message: 'not found id'
            }
        });
    }

}

async function saveImageToDisk(baseImage) {
    //หา path จริงของโปรเจค
    const projectPath = path.resolve('./') ;
    //โฟลเดอร์และ path ของการอัปโหลด
    const uploadPath = `${projectPath}/public/images/`;

    //หานามสกุลไฟล์
    const ext = baseImage.substring(baseImage.indexOf("/")+1, baseImage.indexOf(";base64"));

    //สุ่มชื่อไฟล์ใหม่ พร้อมนามสกุล
    let filename = '';
    if (ext === 'svg+xml') {
        filename = `${uuidv4.v4()}.svg`;
    } else {
        filename = `${uuidv4.v4()}.${ext}`;
    }

    //Extract base64 data ออกมา
    let image = decodeBase64Image(baseImage);

    //เขียนไฟล์ไปไว้ที่ path
    await writeFileAsync(uploadPath+filename, image.data, 'base64');
    //return ชื่อไฟล์ใหม่ออกไป
    return 'http://localhost:3000/images/'+filename;
}

function decodeBase64Image(base64Str) {
    var matches = base64Str.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    var image = {};
    if (!matches || matches.length !== 3) {
        throw new Error('Invalid base64 string');
    }

    image.type = matches[1];
    image.data = matches[2];

    return image;
}