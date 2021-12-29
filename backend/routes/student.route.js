let mongoose = require('mongoose'),
  express = require('express'),
  router = express.Router();
let jwt = require('jsonwebtoken');

const got = require('got');
const superagent = require('superagent');
const tiempoTranscurrido = Date.now();
const hoy = new Date(tiempoTranscurrido+3);

let studentSchema = require('../models/Student');
let adminSchema = require('../models/Admin');
let configSchema = require('../models/data_config');
let servicesSchema = require('../models/Services');

router.route('/create-service').post(ensureToken, (req, res, next) => {
  jwt.verify(req.token, 'ENSURE_KEY258741', (err, dat) =>{
      if(err){
          res.sendStatus(403)
          console.log('no autorized')
      } else {
        const serviceObject = {
           typeService:req.body.service,
           price: req.body.price,
           details: req.body.detailService
        };

        servicesSchema.create(serviceObject, (error, data) => {
            if (error) {
              return next(error)
            } else {
              console.log(hoy.toLocaleDateString())
              res.json(data)
            }
        })
      }
  })
});

router.route('/create-student').post(ensureToken, (req, res, next) => {
  console.log(req.body)
  /*
        servicesSchema.findOne({"typeService" : req.body.serviceState}, (err, data)=>{
            if (err) {
              console.log(err)
            }else{
              console.log(data.price)
              var e = new Date()
              const Limitnew = Number(req.body.vence);
              const payThis = Limitnew*Number(data.price)
              
              e.setMonth(e.getMonth() + Limitnew)

              var totalVence = e.getFullYear() +"/"+ (e.getMonth()+1) +"/"+ e.getDate()

              if (req.body.serviceState == "Netflix") {
                var saldoNetflix = "";
                if(req.body.acount == 'Basico'){
                   saldoNetflix = Limitnew*3
                }

                if(req.body.acount == 'Estandar'){
                  saldoNetflix = Limitnew*9
                }

                if(req.body.acount == 'Premium'){
                saldoNetflix = Limitnew*12
                }

                 var userObject = {
                    phone:req.body.phone,
                    plan: data._id,
                    day: hoy.toLocaleDateString(),
                    status: 1,
                    vence: totalVence,
                    numberVence: req.body.vence,
                    typeAcount: req.body.acount,
                    pinNetflix: req.body.pinNet,
                    saldo: saldoNetflix,
                    mail: req.body.mail,
                    pass: req.body.pass,
                    perfilNet: req.body.perfilNet,
                    notes: ''
                  };

                studentSchema.create(userObject, (error, data2) => {
                    if (error) {
                      return next(error)
                    } else {
                      function idj(j){
                        console.log(j)
                      }
                      configSchema.find((err, dataConfig) => {

                        const regex = /cuenta_deposito/i;
                        var procesedMenssage = dataConfig[0].menssage1.replace(regex, dataConfig[0].depo);

                        const regex2 = /cuenta_transferencia/i;
                        var procesedMenssage2 = procesedMenssage.replace(regex2, dataConfig[0].trans);

                        const regex3 = /su_servicio/i;
                        var procesedMenssage3 = procesedMenssage2.replace(regex3, req.body.serviceState);

                        const regex4 = /su_saldo/i;
                        var procesedMenssage4 = procesedMenssage3.replace(regex4, saldoNetflix+' Pesos');

                        const regex5 = /su_tipo/i;
                        var procesedMenssage5 = procesedMenssage4.replace(regex5, req.body.acount);

                        const regex6 = /su_correo/i;
                        var procesedMenssage6 = procesedMenssage5.replace(regex6, req.body.mail);

                        const regex7 = /su_contraseña/i;
                        var procesedMenssage7 = procesedMenssage6.replace(regex7, req.body.pass);

                        const regex8 = /su_piNet/i;
                        var procesedMenssage8 = procesedMenssage7.replace(regex8, req.body.pinNet);

                        const regex9 = /su_perfilNet/i;
                        var procesedMenssage9 = procesedMenssage8.replace(regex9, req.body.perfilNet);
                        
                        console.log(procesedMenssage9)
                        superagent.post('https://wazbot.com/api/send.php?number='+req.body.phone+'&type=text&message='+procesedMenssage9+'&instance_id=61BBE477B4EF9&access_token=eaf402b5ea7a4391fa1346e1099a5215').then(res => idj(res.text)).catch(console.error);
                      })

                      res.json(data2)

                    }
                })
              }
              else{
               var userObject = {
                  phone:req.body.phone,
                  plan: data._id,
                  day: hoy.toLocaleDateString(),
                  status: 1,
                  numberVence: req.body.vence,
                  vence: totalVence,
                  saldo: payThis,
                  mail: req.body.mail,
                  pass: req.body.pass,
                  perfilNet: '',
                  pinNetflix:'',
                  notes: '',
                  typeAcount: ''
                };
                  studentSchema.create(userObject, (error, data3) => {
                    if (error) {
                      return next(error)
                    } else {
                      function idj(j){
                        console.log(j)
                      }

                      configSchema.find((err, dataConfig) => {

                        const regex = /cuenta_deposito/i;
                        var procesedMenssage = dataConfig[0].menssage1.replace(regex, dataConfig[0].depo);

                        const regex2 = /cuenta_transferencia/i;
                        var procesedMenssage2 = procesedMenssage.replace(regex2, dataConfig[0].trans);

                        const regex3 = /su_servicio/i;
                        var procesedMenssage3 = procesedMenssage2.replace(regex3, req.body.serviceState);

                        const regex4 = /su_saldo/i;
                        var procesedMenssage4 = procesedMenssage3.replace(regex4, payThis+' Pesos');

                        const regex5 = /su_tipo/i;
                        var procesedMenssage5 = procesedMenssage4.replace(regex5, req.body.acount);

                        const regex6 = /su_correo/i;
                        var procesedMenssage6 = procesedMenssage5.replace(regex6, req.body.mail);

                        const regex7 = /su_contraseña/i;
                        var procesedMenssage7 = procesedMenssage6.replace(regex7, req.body.pass);

                        const regex8 = /su_piNet/i;
                        var procesedMenssage8 = procesedMenssage7.replace(regex8, '');

                        const regex9 = /su_perfilNet/i;
                        var procesedMenssage9 = procesedMenssage8.replace(regex9, '');

                        console.log(procesedMenssage9)

                        superagent.post('https://wazbot.com/api/send.php?number='+req.body.phone+'&type=text&message='+procesedMenssage9+'&instance_id=61BBE477B4EF9&access_token=eaf402b5ea7a4391fa1346e1099a5215').then(res => idj(res.text)).catch(console.error);
                      })

                      res.json(data3)
                    }
                })
              }
            }
        })*/
});

router.route('/admin').post((req, res, next) => {
    adminSchema.find({'name':req.body.name, 'pass': req.body.pass}, (err, data) => {
    if (err) {
      return 'none'
    }if(data[0] != undefined) {
        var webToken = jwt.sign({data}, 'ENSURE_KEY258741')
        var response = {
          name: data[0].name,
          id: data[0]._id,
          volatilToken: webToken
        } 

        console.log(response)
        res.json(response)
    }
  })
    console.log('name → '+req.body.name+' | pass → '+req.body.pass)
});

//
router.route('/config').get((req, res, next) => {
  configSchema.find((err, data) => {
    if (err) {
      return 'none'
    }
    res.send(data)
  })
});

router.route('/zz').post((req, res, next) => {
  jwt.verify(req.token, 'ENSURE_KEY258741', (err, dat) =>{
    var jsonStatus = {status: req.body.statusNew}
    studentSchema.findByIdAndUpdate(req.body.id, {$set: jsonStatus},
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('status updated successfully !')
      }
    })
    console.log(req.body.statusNew+' → '+req.body.id)
  })
    
});


router.route('/updateStatus').get((req, res) => {

  function sendRememberDay (days){
    var day = new Date()
    day.setDate(day.getDate() + days)

    studentSchema.find((error, data) => {
      if (error) {
        return 'none'
      }
      configSchema.find((err, data2) => {
        if (err) {
          return 'none'
        }
        var data_config = data2[0]

        data.forEach(elem => sendMenssages(elem));

        function sendMenssages(client){

          var numWhats2 = client.phone 
          var saldo2 = client.saldo

          var veceDate = client.vence
          var dayy = day.getMonth()+1 +'-'+day.getDate()+'-'+day.getFullYear()
          var veceDatee = veceDate.getMonth()+1 +'-'+veceDate.getDate()+'-'+veceDate.getFullYear()
          var thisDate= new Date(dayy)
          var thisVence= new Date(veceDatee)
          
            if (dayy == veceDatee){
              console.log(thisDate +' -- '+ thisVence)
                var numWhats = client.phone 
                var saldo = client.saldo
                var sendMensagge = client.send
                var idUpdate = client._id
                var typeAcountThis = client.typeAcount

                console.log("por pagar")

                servicesSchema.findById(client.plan, (err, plan)=>{
                       if (days == 2) {

                          const regex = /cuenta_deposito/i;
                          var procesedMenssage = data_config.menssage2.replace(regex, data_config.depo);

                          const regex2 = /cuenta_transferencia/i;
                          var procesedMenssage2 = procesedMenssage.replace(regex2, data_config.trans);

                          const regex3 = /su_servicio/i;
                          var procesedMenssage3 = procesedMenssage2.replace(regex3, plan.typeService);

                          const regex4 = /su_saldo/i;
                          var procesedMenssage4 = procesedMenssage3.replace(regex4, saldo+' Pesos');

                          const regex5 = /su_tipo/i;
                          var procesedMenssage5 = procesedMenssage4.replace(regex5, client.typeAcount);

                          const regex6 = /su_correo/i;
                          var procesedMenssage6 = procesedMenssage5.replace(regex6, client.mail);

                          const regex7 = /su_contraseña/i;
                          var procesedMenssage7 = procesedMenssage6.replace(regex7, client.pass);

                          const regex8 = /su_piNet/i;
                          var procesedMenssage8 = procesedMenssage7.replace(regex8, client.pinNetflix);

                          const regex9 = /su_perfilNet/i;
                          var procesedMenssage9 = procesedMenssage8.replace(regex9, client.perfilNet);
                          
                          superagent.post('https://wazbot.com/api/send.php?number='+client.phone+'&type=text&message='+procesedMenssage9+'&instance_id=61BBE477B4EF9&access_token=eaf402b5ea7a4391fa1346e1099a5215').then(res => console.log(res.text)).catch(console.error);

                        }

                        if (days == 1) {

                          const regex = /cuenta_deposito/i;
                          var procesedMenssage = data_config.menssage3.replace(regex, data_config.depo);

                          const regex2 = /cuenta_transferencia/i;
                          var procesedMenssage2 = procesedMenssage.replace(regex2, data_config.trans);

                          const regex3 = /su_servicio/i;
                          var procesedMenssage3 = procesedMenssage2.replace(regex3, plan.typeService);

                          const regex4 = /su_saldo/i;
                          var procesedMenssage4 = procesedMenssage3.replace(regex4, saldo+' Pesos');

                          const regex5 = /su_tipo/i;
                          var procesedMenssage5 = procesedMenssage4.replace(regex5, client.typeAcount);

                          const regex6 = /su_correo/i;
                          var procesedMenssage6 = procesedMenssage5.replace(regex6, client.mail);

                          const regex7 = /su_contraseña/i;
                          var procesedMenssage7 = procesedMenssage6.replace(regex7, client.pass);

                          const regex8 = /su_piNet/i;
                          var procesedMenssage8 = procesedMenssage7.replace(regex8, client.pinNetflix);

                          const regex9 = /su_perfilNet/i;
                          var procesedMenssage9 = procesedMenssage8.replace(regex9, client.perfilNet);
                          
                          superagent.post('https://wazbot.com/api/send.php?number='+client.phone+'&type=text&message='+procesedMenssage9+'&instance_id=61BBE477B4EF9&access_token=eaf402b5ea7a4391fa1346e1099a5215').then(res => console.log(res.text)).catch(console.error);

                        }
                        if (days == 0) {

                          const regex = /cuenta_deposito/i;
                          var procesedMenssage = data_config.menssage4.replace(regex, data_config.depo);

                          const regex2 = /cuenta_transferencia/i;
                          var procesedMenssage2 = procesedMenssage.replace(regex2, data_config.trans);

                          const regex3 = /su_servicio/i;
                          var procesedMenssage3 = procesedMenssage2.replace(regex3, plan.typeService);

                          const regex4 = /su_saldo/i;
                          var procesedMenssage4 = procesedMenssage3.replace(regex4, saldo+' Pesos');

                          const regex5 = /su_tipo/i;
                          var procesedMenssage5 = procesedMenssage4.replace(regex5, client.typeAcount);

                          const regex6 = /su_correo/i;
                          var procesedMenssage6 = procesedMenssage5.replace(regex6, client.mail);

                          const regex7 = /su_contraseña/i;
                          var procesedMenssage7 = procesedMenssage6.replace(regex7, client.pass);

                          const regex8 = /su_piNet/i;
                          var procesedMenssage8 = procesedMenssage7.replace(regex8, client.pinNetflix);

                          const regex9 = /su_perfilNet/i;
                          var procesedMenssage9 = procesedMenssage8.replace(regex9, client.perfilNet);

                          var theMessage = procesedMenssage9;
                          
                          superagent.post('https://wazbot.com/api/send.php?number='+client.phone+'&type=text&message='+procesedMenssage9+'&instance_id=61BBE477B4EF9&access_token=eaf402b5ea7a4391fa1346e1099a5215').then(res => console.log(res.text)).catch(console.error);
                        }


                })
            }

        }

      })

    })
  }
  sendRememberDay(1)
  sendRememberDay(2)
  sendRememberDay(0)

});


function ensureToken(req, res, next){
  const bererHeader = req.headers['authorization'];
  if (bererHeader != undefined) {
      const berer = bererHeader.split(" ")
      const bererToken = berer[1]
      req.token = bererToken
      next()

  } else {
    console.log('/***')
  }
}

router.route('/').get(ensureToken, (req, res) => {
  var arrayResponse = []

  jwt.verify(req.token, 'ENSURE_KEY258741', (err, dat) =>{
      if(err){
          res.sendStatus(403)
          console.log('no autorized')
      } else {
//si el toquen existe buscamos todos los usuarios en la base de datos
          studentSchema.find((error, data) => {
            if (error) {
              return next(error)
            } else {
//ahora deglosamos los datos y los procesamos uno por uno buscando su plan correspondiente
                for (let i=0; i < data.length; i++) {
                 servicesSchema.findById(data[i].plan, (err, plan)=>{

                    if (err) {
                      console.log(err)
                    }else{
                      
                      var setingState = ""

                      if (data[i].status == 3) {
                        setingState = "Suspendido 😕"
                      }
                      if (data[i].status == 1) {
                        setingState = "Pagado 😀"
                      }
                      if (data[i].status == 2) {
                        setingState = "Prorroga 😐"
                      }

                      if (data[i].status == 0) {
                        setingState = "Por pagar 😐"
                      }

//editamos el plan: primero era id ahora es el nombre correspondiente y los agrupamos en un array
                    if (data[i].typeAcount != '') {
                      var expired = new Date(data[i].vence)
                      var totalVence = expired.getFullYear() +"/"+ (expired.getMonth()+1) +"/"+ expired.getDate()
                      var long = new Date(data[i].day)
                      var totalDay = long.getFullYear() +"/"+ (long.getMonth()+1) +"/"+ long.getDate()

                      var jsonResponse =  {
                        phone: data[i].phone,
                        plan: plan.typeService,
                        planDetails: plan.details,
                        day: totalDay,
                        id: data[i]._id,
                        status: setingState,
                        vence: totalVence,
                        saldo: data[i].saldo,
                        numVence: data[i].numberVence,
                        typeAcounts: data[i].typeAcount,
                        pinNetflix: data[i].pinNetflix,
                        mail: data[i].mail,
                        pass: data[i].pass,
                        perfilNet: data[i].perfilNet,
                        nota: data[i].notes
                      }
                      arrayResponse.push(jsonResponse)
                      add(arrayResponse)
                    }
                    else{
                      var expired = new Date(data[i].vence)
                      var totalVence = expired.getFullYear() +"/"+ (expired.getMonth()+1) +"/"+ expired.getDate()
                      var long = new Date(data[i].day)
                      var totalDay = long.getFullYear() +"/"+ (long.getMonth()+1) +"/"+ long.getDate()

                      var jsonResponse =  {
                        phone: data[i].phone,
                        plan: plan.typeService,
                        planDetails: plan.details,
                        day: totalDay,
                        id: data[i]._id,
                        status: setingState,
                        vence: totalVence,
                        saldo: data[i].saldo,
                        numVence: data[i].numberVence,
                        typeAcounts: '',
                        pinNetflix: '',
                        mail: data[i].mail,
                        pass: data[i].pass,
                        perfilNet: data[i].perfilNet,
                        nota: data[i].notes
                      }

                      arrayResponse.push(jsonResponse)
                      add(arrayResponse)
                    }                       
                  }
                })
              }
          }
//ahora esperamos a que el for agrupe todos los usuarios editados y verificamos que la cantidad de elementos en el array
//sea la misma que esta en la base de datos!
            function add(elementsPrepare){
              if (elementsPrepare.length == data.length) {
                res.json(elementsPrepare)
              }
            }
          }).sort({date: 'desc'})
      }
  })
})

router.route('/services').get(ensureToken, (req, res) => {
  var arrayResponse = []

  jwt.verify(req.token, 'ENSURE_KEY258741', (err, dat) =>{
      if(err){
          res.sendStatus(403)
          console.log('no autorized')

      } else {
          servicesSchema.find((err, service)=>{
              if (err) {
                console.log(err)
              }else{
                res.json(service)
              }
          })
      }
  })
})

router.route('/edit-student/:id').get((req, res) => {
  studentSchema.findById(req.params.id, (error, data) => {
    servicesSchema.findById(data.plan, (err, plan)=>{

        const userObject = {
          phone:data.phone,
          plan: plan.typeService,
          saldo: data.saldo,
          numVence: data.numberVence,
          vence: data.vence,
          note: data.notes,
          mail: data.mail,
          pass: data.pass
        };

        if (error) {
          return next(error)
        } else {
          res.json(userObject)
        }
    })
  })
})

router.route('/update-service').put((req, res, next) => {
    const objectService = {
      typeService: req.body.name,
      price: req.body.price
    }
    servicesSchema.findByIdAndUpdate(req.body.id, {$set: objectService},
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('service updated successfully !')
      }
    })
})

//

router.route('/update-config').put((req, res, next) => {
    const jsonService = {
      menssage1: req.body.menssage1,
      menssage2: req.body.menssage2,
      menssage3: req.body.menssage3,
      menssage4: req.body.menssage4,
      menssage5: req.body.menssage5,
      depo: req.body.depo,
      trans: req.body.trans
    }
    configSchema.findByIdAndUpdate(req.body.id, {$set: jsonService},
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error)
      } else {
        res.json(data)
        console.log('service updated successfully !')
      }
    })
})

//

router.route('/update-user/:id').put((req, res, next) => {
    var theMessage = "";

    servicesSchema.find({"typeService" : req.body.plan}, (err, dataService)=>{
        if (err) {
              res.json({'message': 'non selected'})
        }else{
         var lemitProsess = new Date(req.body.vence)
         var b = new Date()

         missingThisMonths = 0
         while(b < lemitProsess){
           b.setMonth(b.getMonth() + 1)
           missingThisMonths++ 
         }
                if (dataService[0].typeService == "Netflix") {
                  var saldoNetflix = "";

                  if(req.body.typeAcc == 'Basico'){
                     saldoNetflix = missingThisMonths*3
                  }

                  if(req.body.typeAcc == 'Estandar'){
                    saldoNetflix = missingThisMonths*9
                  }

                  if(req.body.typeAcc == 'Premium'){
                    saldoNetflix = missingThisMonths*12
                  }

                  const userObject = {
                      phone: req.body.phone,
                      vence: lemitProsess,
                      numberVence: req.body.numVence,
                      typeAcount: req.body.typeAcc,
                      saldo: saldoNetflix,
                      plan: dataService[0]._id,
                      notes: req.body.nota,
                      perfilNet: req.body.perfilNet,
                      pinNetflix: req.body.pinNet,
                      send: req.body.send,
                      mail: req.body.mail,
                      pass: req.body.pass
                  };

                  configSchema.find((err, data2) => {
                    const regex = /cuenta_deposito/i;
                    var procesedMenssage = data2[0].menssage5.replace(regex, data2[0].depo);

                    const regex2 = /cuenta_transferencia/i;
                    var procesedMenssage2 = procesedMenssage.replace(regex2, data2[0].trans);

                    const regex3 = /su_servicio/i;
                    var procesedMenssage3 = procesedMenssage2.replace(regex3, dataService[0].typeService);

                    const regex4 = /su_saldo/i;
                    var procesedMenssage4 = procesedMenssage3.replace(regex4, saldoNetflix+' Pesos');

                    const regex5 = /su_tipo/i;
                    var procesedMenssage5 = procesedMenssage4.replace(regex5, req.body.typeAcc);

                    const regex6 = /su_correo/i;
                    var procesedMenssage6 = procesedMenssage5.replace(regex6, req.body.mail);

                    const regex7 = /su_contraseña/i;
                    var procesedMenssage7 = procesedMenssage6.replace(regex7, req.body.pass);

                    const regex8 = /su_piNet/i;
                    var procesedMenssage8 = procesedMenssage7.replace(regex8, req.body.pinNet);

                    const regex9 = /su_perfilNet/i;
                    var procesedMenssage9 = procesedMenssage8.replace(regex9, req.body.perfilNet);
                    theMessage = procesedMenssage9;                          
                  })
                  console.log(theMessage)

                  studentSchema.findByIdAndUpdate(req.params.id, {
                    $set: userObject
                  }, (error, data) => {
                    if (error) {
                      return next(error);
                      console.log(error)
                    } else {
                      
                      console.log('Student updated successfully !')
                      superagent.post('https://wazbot.com/api/send.php?number='+req.body.phone+'&type=text&message='+theMessage+'&instance_id=61BBE477B4EF9&access_token=eaf402b5ea7a4391fa1346e1099a5215').then(resMessage => console.log(resMessage.text)).catch(console.error);
                      res.json(data)
                    }
                  })

              }else{
                  var mont =  Number(dataService[0].price)*missingThisMonths;
                  const userObject = {
                      phone: req.body.phone,
                      vence: lemitProsess,
                      numberVence: req.body.numVence,
                      typeAcount: req.body.typeAcc,
                      saldo: mont,
                      plan: dataService[0]._id,
                      notes: req.body.nota,
                      perfilNet: '',
                      pinNetflix: '',
                      send: req.body.send,
                      mail: req.body.mail,
                      pass: req.body.pass
                  };

                  configSchema.find((err, data2) => {
                    const regex = /cuenta_deposito/i;
                    var procesedMenssage = data2[0].menssage5.replace(regex, data2[0].depo);

                    const regex2 = /cuenta_transferencia/i;
                    var procesedMenssage2 = procesedMenssage.replace(regex2, data2[0].trans);

                    const regex3 = /su_servicio/i;
                    var procesedMenssage3 = procesedMenssage2.replace(regex3, dataService[0].typeService);

                    const regex4 = /su_saldo/i;
                    var procesedMenssage4 = procesedMenssage3.replace(regex4, mont+' Pesos');

                    const regex5 = /su_tipo/i;
                    var procesedMenssage5 = procesedMenssage4.replace(regex5, req.body.typeAcc);

                    const regex6 = /su_correo/i;
                    var procesedMenssage6 = procesedMenssage5.replace(regex6, req.body.mail);

                    const regex7 = /su_contraseña/i;
                    var procesedMenssage7 = procesedMenssage6.replace(regex7, req.body.pass);

                    const regex8 = /su_piNet/i;
                    var procesedMenssage8 = procesedMenssage7.replace(regex8, '');

                    const regex9 = /su_perfilNet/i;
                    var procesedMenssage9 = procesedMenssage8.replace(regex9, '');


                    theMessage = procesedMenssage8;                          
                  })
                  console.log(theMessage)

                  studentSchema.findByIdAndUpdate(req.params.id, {
                    $set: userObject
                  }, (error, data) => {
                    if (error) {
                      return next(error);
                      console.log(error)
                    } else {
                      console.log('Student updated successfully !')            
                      superagent.post('https://wazbot.com/api/send.php?number='+req.body.phone+'&type=text&message='+theMessage+'&instance_id=61BBE477B4EF9&access_token=eaf402b5ea7a4391fa1346e1099a5215').then(resMessage => console.log(resMessage.text)).catch(console.error);
                      res.json(data)
                    }
                  })

              }
        }
    })
    console.log( new Date(req.body.vence))
})


router.route('/delete-user/:id').delete(ensureToken,(req, res, next) => {
  jwt.verify(req.token, 'ENSURE_KEY258741', (err, dat) =>{
      if(err){
          res.sendStatus(403)
          console.log('no autorized')
      } else {
        function funcDelete(){
          console.log('delete successfully')
          res.json({"delete": "yeah!"})
        }
        studentSchema.deleteOne({"_id":req.params.id}, function (err) {
          if(err) console.log(err);
          funcDelete();
        }); 
            
      }
  })
})

router.route('/deleteService/:id').delete(ensureToken,(req, res, next) => {
  jwt.verify(req.token, 'ENSURE_KEY258741', (err, dat) =>{
      if(err){
          res.sendStatus(403)
          console.log('no autorized')
      } else {
        function funcDelete(){
          console.log('delete successfully')
          res.json({"delete": "yeah!"})
        }
        servicesSchema.deleteOne({"_id":req.params.id}, function (err) {
          if(err) console.log(err);
          funcDelete();
        }); 
            
      }
  })
})

module.exports = router;
