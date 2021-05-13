const StationService = require('../services/station')

class StationController {

  static async getStationsPage(req, res) {
    if (req.query.search && req.query.search.length > 1) {
      let stations = await StationService.findByName(req.query.search) 
      return res.render('stations', {stations}) 
    }
    let stations = await StationService.findAll()
    res.render('stations', {stations})
  }

  static async createStationPage(req, res) {
    res.render('stations-new')
  }

  static async createStation(req, res) {
    let dao = req.body
    try {
      await StationService.create(dao)
      res.redirect('/stations')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/stations')
    }
  }

  static async removeStation(req, res) {
    try {
      await StationService.removeOne(req.params.station_id)
      res.redirect('/stations')
    } catch (err) {
      console.log(err)
      req.flash('error_msg', 'Last Operation Failed')
      res.redirect('/stations')
    }
  }

}

module.exports = StationController