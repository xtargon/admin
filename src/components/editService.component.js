import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Cookies from 'universal-cookie';
import $ from 'jquery'
const cookies = new Cookies()

export default class EditService extends Component {
  constructor(props) {
    super(props)
    this.name = '';
    this.price = '';
    this.service = '';
    this.id = '';
    this.allServices = [];

    this.onChangeService = this.onChangeService.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount(){
    axios.get('http://75.102.23.138:4000/students/services/', {
      headers: {
        authorization: 'Bearer '+cookies.get('token')
      }
    })
      .then(res => {
        res.data.map(service => $('#selectedService').append('<option>'+service.typeService+'</option>'))
        res.data.map(service => this.allServices.push(service))
        console.log(this.allServices[1])
      })
      .catch((error) => {
        console.log(error);
      })
  }

  onChangeService(e) {
    for(var i=0; i<this.allServices.length; i++){
    	$('#fields').html('<input type="text" placeholder="Nombre del servicio" id="name-S" required><hr><input type="text" placeholder="Precio del servicio" id="price-S" required><hr><br>')
		$('#selSer').html('')
    	if (this.allServices[i].typeService == $('#selectedService').val()) {
    		this.name = this.allServices[i].typeService;
    		this.price = this.allServices[i].price;
    		this.id = this.allServices[i]._id;
    		console.log(this.allServices[i])

    	}
    	$('#deleteService').css('display','inline-block')
    	$('#name-S').val(this.name)
    	$('#price-S').val(this.price)
    }
  }

   onDelete(e){
    var r = window.confirm("Seguro que desea eliminar el servicio: "+this.name+"?");
    if (r == true) {
      axios.delete('http://75.102.23.138:4000/students/deleteService/'+this.id, {
          headers: {
              authorization: 'Bearer '+cookies.get('token')
          }
      })
      .then((res) => {
          this.props.history.push('/dashboard')
      }).catch((error) => {
          console.log(error)
      })
    } else {
      
    } 
  } 

  onSubmit(e){
  	var jsonService = {
  		name: $('#name-S').val(),
  		price: $('#price-S').val(),
  		id: this.id
  	}

    axios.put('http://75.102.23.138:4000/students/update-service', jsonService)
      .then((res) => {
        console.log('service successfully updated')
        //this.props.history.push('/dashboard')
      }).catch((error) => {
        console.log(error)
        alert('Ha ocurrido un error :(')
      })

      console.log(jsonService)

    // Redirect to Student List 	
  }

  render() {
    return (<div className="form-wrapper">
      <Form onSubmit={this.onSubmit}>
      	<h3>Editar servicio ↓</h3>
        <select class="select" id="selectedService" onChange={this.onChangeService}>
        	<option id="selSer">selecciona un servicio</option>
        </select>    
        <hr />    
        <div id="fields"></div>
        
        <Button variant="danger" size="lg" block="block" type="submit">
          Editar Servicio
        </Button>
        <button className="ButtonTable" id="deleteService" onClick={this.onDelete}>Eliminar este servicio</button>
      </Form>
    </div>);
  }

}
