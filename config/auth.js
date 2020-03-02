module.exports = {
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) {
      console.log('User is authenticated.');
      return next();
    }

    let unverified = [];
    unverified.push({ alert: 'Very sneaky of you, but you shall not pass. Please register and/or login.' });

    res.render('index', {
      unverified
    });
  }
}
