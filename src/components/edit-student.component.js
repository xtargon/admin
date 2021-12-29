import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Cookies from 'universal-cookie';
import $ from 'jquery'
const cookies = new Cookies()
export default class EditStudent extends Component {

  constructor(props) {
    super(props)

    this.phone = '';
    this.plan = '';
    this.vence = '';
    this.note = '';
    this.numVence = '';
    this.perfilNetflix = '';
    this.pinNet = '';
    this.acountType = '';
    this.sendM = '';

    this.pass = '';
    this.mail = '';
    this.changePassword = false;

    this.onChangeStudentPhone = this.onChangeStudentPhone.bind(this);
    this.onChangeStudentPlan = this.onChangeStudentPlan.bind(this);
    this.onChangeStudentVence = this.onChangeStudentVence.bind(this);
    this.onChangeStudentNumVence = this.onChangeStudentNumVence.bind(this);
    this.onChangeStudentNote = this.onChangeStudentNote.bind(this);
    this.onChangeNetfxBasic = this.onChangeNetfxBasic.bind(this);
    this.onChangeStudentsend = this.onChangeStudentsend.bind(this);

    this.onChangeStudentMail = this.onChangeStudentMail.bind(this);
    this.onChangeStudentPass = this.onChangeStudentPass.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {

    var host = window.location.hostname;

    axios.get('http://75.102.23.138:4000/students/services/', {
      headers: {
        authorization: 'Bearer '+cookies.get('token')
      }
    })
      .then(res => {
        res.data.map(service => $('#selectService').append('<option>'+service.typeService+'</option>'))
        
      })
      .catch((error) => {
        console.log(error);
      })

    axios.get('http://75.102.23.138:4000/students/edit-student/' + this.props.match.params.id)
      .then(res => {
          this.phone = res.data.phone;
          this.plan = res.data.plan;
          this.pass =res.data.pass;
          this.mail = res.data.mail;
          this.vence = res.data.vence;
          this.numVence = res.data.vence;
          this.perfilNetflix = res.data.perfilNet;
          this.pinNet = res.data.pinNetflix;
          this.acountType = res.data.typeAcounts;

          if (this.acountType == 'Basico') {
            $('#selectTypeAcount').html('<input type="text" placeholder="Pin de Netflix" id="pinNetfilx" required><hr> Perfil de esta cuenta<select class="select" id="perfilNetflix" required><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>')
          }
          if (this.acountType == 'Estandar') {
            $('#selectTypeAcount').html('<input type="text" placeholder="Pin de Netflix" id="pinNetfilx" required><hr> Perfiles para esta cuenta<select class="select" id="perfilNetflix" required><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select><select class="select" id="perfilNetflix2" required><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>')
          }    
          if (this.acountType == 'Premium'){
            $('#selectTypeAcount').html('')
          }

          if (this.plan == "Netflix") {
            $('#selectedType').css('display','inline-block')
          } 

          else{
            $('#selectTypeAcount').html('')
          }     
          $('#numberInput').val(this.phone)
          $('#notesInput').val(this.note)
          $('#selectService').val(this.plan)
          $('#venceInput').val(this.numVence)
          $('#mailInput').val(this.mail)
          $('#passInput').val(this.pass)        


  
          
        console.log(this.phone)
      })
      .catch((error) => {
        console.log(error);
      })
      console.log(this.phone)
  }
  onChangeStudentVence(e) {
    this.vence = e.target.value 
  }

  onChangeNetfxBasic(e) {
    if (e.target.value == 'Basico') {
      $('#selectTypeAcount').html('<input type="text" placeholder="Pin de Netflix" id="pinNetfilx" required><hr> Perfil de esta cuenta<select class="select" id="perfilNetflix" required><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>')
    }
    if (e.target.value == 'Estandar') {
      $('#selectTypeAcount').html('<input type="text" placeholder="Pin de Netflix" id="pinNetfilx" required><hr> Perfiles para esta cuenta<select class="select" id="perfilNetflix" required><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select><select class="select" id="perfilNetflix2" required><option>1</option><option>2</option><option>3</option><option>4</option><option>5</option></select>')
    }    
    if (e.target.value == 'Premium'){
      $('#selectTypeAcount').html('')
    }
  }

  onChangeStudentNumVence(e) {
    this.numVence = e.target.value 
  }

  onChangeStudentsend(e) {
    $('#Delete').html('')
    this.sendM = e.target.value
    console.log(this.sendM)
  }


  onChangeStudentMail(e) {
    this.mail = e.target.value
  }

  onChangeStudentPass(e) {
    this.changePassword = true
    this.pass = e.target.value
    console.log('esta cambiando su contraseña')
  }



  onChangeStudentPlan(e) {
    this.plan = e.target.value

    console.log(this.plan)
    if (this.plan == "Netflix") {
      $('#selectedType').css('display','inline-block')
    } 
    else{
      $('#selectedType').val(undefined)
      $('#selectedType').css('display','none')
      $('#selectTypeAcount').html('')
    } 
  }

  onChangeStudentPhone(e) {
    this.phone = e.target.value 
  }

  onChangeStudentNote(e) {
    this.note = e.target.value 
  }


  onSubmit(e) {
    var host = window.location.hostname;
    e.preventDefault()

    var userObject = {};

    var typeA = $('#selectedType').val()
    if (typeA == 'Estandar') {

      this.pinNet = $('#pinNetfilx').val()
      this.perfilNetflix = $('#perfilNetflix').val()+' - '+$('#perfilNetflix2').val()

    }
    if (typeA == 'Basico') {

      this.pinNet = $('#pinNetfilx').val()
      this.perfilNetflix = $('#perfilNetflix').val()

    }
    if (typeA == undefined) {
      userObject = {
        phone: this.phone,
        nota: this.note,
        plan: this.plan,
        vence: this.vence,
        typeAcc: '',
        perfilNet: '',
        pinNet: '',
        send: this.sendM,
        mail: this.mail,
        pass: this.pass
      };
    }
    else{
      userObject = {
        phone: this.phone,
        nota: this.note,
        plan: this.plan,
        vence: this.vence,
        typeAcc: typeA,
        perfilNet: this.perfilNetflix,
        pinNet: this.pinNet,
        send: this.sendM,
        mail: this.mail,
        pass: this.pass
      };
    }
    axios.put('http://75.102.23.138:4000/students/update-user/' + this.props.match.params.id, userObject)
      .then((res) => {
        console.log(res.data)
        console.log('Student successfully updated')
      }).catch((error) => {
        console.log(error)
      })

    // Redirect to Student List 
    /*window.location.replace("/dashboard");*/

    if (this.changePassword) {
      alert('Cambio la contraseña de este Usuario por → '+this.pass)
    } else {
      console.log('No ha cambiado la contraseña de este Usuario')
    }




    console.log(userObject)
  }


  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>

        <Form.Group controlId="numberInput">
          <Form.Label>Telefono</Form.Label>
          <Form.Control id="numberInput" type="text" onChange={this.onChangeStudentPhone} required/>
        </Form.Group>

        <Form.Group controlId="mailInput">
          <Form.Label>Correo para este usuario</Form.Label>
          <Form.Control id="mailInput" type="text" onChange={this.onChangeStudentMail} placeholder="Correo para este usuario"/>
        </Form.Group>
        <br />

        <Form.Group controlId="passInput">
          <Form.Label>Contraseña* para este usuario</Form.Label>
          <Form.Control id="passInput" type="text" onChange={this.onChangeStudentPass} placeholder="Contraseña para este usuario"/>
        </Form.Group>
        <br />

        <Form.Group controlId="notesInput">
          <Form.Label>Nota para este usuario</Form.Label>
          <Form.Control id="notesInput" type="text" onChange={this.onChangeStudentNote} placeholder="Nota para este usuario"/>
        </Form.Group>
        <br />
        <spam>Selecciona un servicio</spam>
        <br />
        <select id="selectService" class="select" onChange={this.onChangeStudentPlan} required>

        </select>
        <div id="selectTypeAcount"></div>
        <select class="selectTypeNet" id="selectedType" onChange={this.onChangeNetfxBasic}>
          <option>Basico</option>
          <option>Estandar</option>
          <option>Premium</option>
        </select>        
        <br />
        <spam>Enviar mensajes automaticamente</spam>
        <br />
        <select class="select" id="selectedType" onChange={this.onChangeStudentsend}>
          <option value="1" selected>Si</option>
          <option value="0">No</option>
        </select>

        <br />
        <spam>Meses de subscripción </spam>
        <br />

        <input type="date" class="select" id="venceInput" name="calendar" onChange={this.onChangeStudentVence} required />

        <Button variant="danger" size="lg" block="block" type="submit">
          Editar usuario
        </Button>
      </Form>
    </div>);
  }
}
