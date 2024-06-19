function checkSession(req) {
    const session = req.session;
    return session && session.authenticated;
}

module.exports = { checkSession };