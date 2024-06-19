const express = require('express');
const router = express.Router();
const { checkSession } = require('./utils');

// Mit Hilfestellung von AI erstellt
/**
* @name POST login
* @description Login with credentials (pw = m295)
* @tags Auth
* @method POST
* @route localhost:3000/login
* @type Content-Type: application/json
* @body { "email": "zli", "password": "m295" }
* @success 200 {Object} swagger-autput.json
* @failure 404 {string} - "credentials are missing"
* @failure 500 {string} - "Server error."
*/
// Ende AI-Eingriff
router.post('/login', (req, res) => {
    try {
        const cred = req.body;
        console.warn(cred)
    //     // in Postman:
    //     // body = {
    //     //     email: "random"
    //     //     password: "m295",
    //     // }
    if (!cred.PASSWORD) {
        return res.setHeader('Content-Type', 'application/json').status(404).json({ error: 'credentials are missing'}).end();
    }
    req.session.authenticated = true
    output = req.session
    res.setHeader('Content-Type', 'application/json').status(200).json(output).end();

    } catch (error) {
    console.error(error);
    res.setHeader('Content-Type', 'application/json').status(500).json({ error: 'Server error' }).end();
    }
});

// Mit Hilfestellung von AI erstellt
/**
* @name GET verify
* @description Verify if user is authenticated
* @tags Auth
* @method GET
* @route localhost:3000/verify
* @type Content-Type: application/json
* @success 200 {string} - "authenticated"
* @failure 401 {string} - "unauthorized" || "not authenticated"
* @failure 500 {string} - "Server error."
*/
// Ende AI-Eingriff
router.get('/verify', (req, res) => {
    if (!checkSession(req)) {
        console.warn("session check failed");
        return res.status(401).json({ error: "unauthorized" });
    } 
    try {
        const session = req.session;
        if (!session || !session.authenticated) {
            res.setHeader('Content-Type', 'application/json').status(401).json({ error: "not authenticated" }).end();
        }
        res.setHeader('Content-Type', 'application/json').status(200).json({ message: "authenticated"}).end();    
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json').status(500).json({ error: 'Server error' }).end();
    }
});

// Mit Hilfestellung von AI erstellt
/**
 * @name DELETE logout
* @tags Auth
* @method POST
* @route localhost:3000/logout
* @type Content-Type: application/json
* @success 204 {Object} SessionCookie 
* @failure 401 {string} - "not authorized"
* @failure 404 {string} - "no session found"
* @failure 500 {string} - "Server error."
*/
// Ende AI-Eingriff
router.delete('/logout', (req, res) => {
    if (!checkSession(req)) {
        console.warn("session check failed");
        return res.status(401).json({ error: "unauthorized" });
    } 
    try {
        const session = req.session;
        if (!session) {
            res.setHeader('Content-Type', 'application/json').status(404).json({ error: "no session found" }).end();
        }
        if (!session.authenticated) {
            res.setHeader('Content-Type', 'application/json').status(401).json({ error: "not authorized" }).end();
        }
        session.authenticated = false
        res.setHeader('Content-Type', 'application/json').status(204).end();
    } catch (error) {
        console.error(error);
        res.setHeader('Content-Type', 'application/json').status(500).json({ error: 'Server error' }).end();
    } 
});

module.exports = router;
