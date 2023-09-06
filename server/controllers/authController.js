const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require("../config")
const Pizza = require("../models/Pizza");
const ApiError = require("../error/ApiError");

const generateAccessToken = (id, roles, username) => {
    const payload = {
        id,
        roles,
        username
    }
    return jwt.sign(payload, secret, {expiresIn: "24h"})
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {username, password, address, phone} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "User"})
            const user = new User({username, password: hashPassword, roles: [userRole.value], address, phone})
            await user.save()
            const mongoUser = await User.findOne({username})
            const token = generateAccessToken(mongoUser._id, mongoUser.roles, username)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Registration error"})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${username} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введён неверный пароль`})
            }
            const token = generateAccessToken(user._id, user.roles, username)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: "Login error"})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {

        }
    }

    async getUser(req, res) {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token)
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        const {id: userId} = jwt.verify(token, secret);
        const user = await User.findById(userId);
        console.log(user)
        return res.json(user)
    }

    async check(req, res) {
        const oldToken = req.headers.authorization.split(' ')[1]
        const payload = jwt.decode(oldToken, secret)
        const token = generateAccessToken(payload.id, payload.roles, payload.username)
        return res.json({token})
    }

    async changePassword(req, res) {
        const password = req.body.password
        const id = req.body.id
        const hashPassword = bcrypt.hashSync(password, 7)
        await User.updateOne({_id: `${id}`}, {$set: {password: hashPassword}})
        return res.status(200).json({message: "Обновлено успешно"})
    }

    async changeAddress(req, res) {
        const address = req.body.address
        const id = req.body.id
        await User.updateOne({_id: `${id}`}, {$set: {address}})
        return res.status(200).json({message: "Обновлено успешно"})
    }

    async changePhone(req, res) {
        const phone = req.body.phone
        const id = req.body.id
        await User.updateOne({_id: `${id}`}, {$set: {phone}})
        return res.status(200).json({message: "Обновлено успешно"})
    }
}

module.exports = new authController()