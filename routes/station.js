const router = require('express').Router()
const StationController = require('../controllers/station')

router.get('/', StationController.getStationsPage)

router.get('/new', StationController.createStationPage)

router.post('/new', StationController.createStation)

router.get('/remove/:station_id', StationController.removeStation)

module.exports = router