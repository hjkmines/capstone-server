module.exports = function(app) {
    let profile = require('../controllers/profileController'); 

    // todo list Routes 
    app.route('/profiles')
      .get(profile.all_profiles)
      .post(profile.create_profile); 

    app.route('/profiles/:profileId')
      .get(profile.user_profile)
      .put(profile.update_profile)
      .delete(profile.delete_profile)
}; 