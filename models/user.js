const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  userName:  String,
  nickName:  String,
  firstName:  String,
  lastName:  String,
  position:  String,
  nationality:  String,
  telephoneNumber:  String,
  startingDate:  String,
  address:  String,
  subdistrict:  String,
  district:  String,
  province:  String,
  postalCode:  String,
  facebook:  String,
  lineId:  String,
  instagram:  String,
  skills: [{name: String,
           level: Number}],
  educations:[{year: String,
              name: String}],
  experiences:[{company: String,
               position: String}],
  interests: [String],
  guild: [String],
  profileImage: String,
  backgroundImage: String

});

const user = mongoose.model('users', userSchema);

module.exports = user