import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import StudentTableRow from './StudentTableRow';
import Cookies from 'universal-cookie';
import $ from 'jquery'
const cookies = new Cookies()
var collections = []

export default class SearchUser extends Component {

  constructor(props) {
    super(props)
            this.statusNew = '';
            this.id = '';
            this.plan = '';
            this.phone = '';
            this.pinNetflix = '';
            this.typeAcounts = '';
            this.mail = '';
            this.pass = '';
            this.saldo = '';
            this.perfilNet = '';
  }

  onSubmit(e) {
      var toSearch = document.getElementById("searchField").value;
      var print = document.getElementById("userShow")
      var showPrint = []
      
    function search(elem){

      let result = elem.phone.match(toSearch);
      let result2 = elem.status.match(toSearch);
      let result3 = elem.day.match(toSearch);
      let result4 = elem.mail.match(toSearch);
      let result5 = elem.perfilNet.match(toSearch);
      let result6 = elem.plan.match(toSearch);
      let result7 = elem.typeAcounts.match(toSearch);
      let result8 = elem.saldo.match(toSearch);
      let result9 = elem.vence.match(toSearch);
      
    
      if(result || result2 || result3 || result4 || result5 || result6 || result7 || result8 || result9){
            showPrint.push(elem);
            var divClone = $("#tableUsers").text("")

            if(showPrint.length > 1){
              showPrint.forEach(user => $('#tableUsers').append('<tr><td>'+user.phone+'</td><td>'+user.plan+'</td><td>'+user.day+'</td><td>'+user.vence+'</td><td><select id="'+user.id+'" class="selectStatus_Table_search"><option  selected disabled>Seleccione un estado de usuario</option><option value="1">Vigente</option><option value="0">Por pagar</option><option value="2">Prorroga</option><option value="3">Suspendido</option></select>'+user.status+'</td><td>'+user.saldo+'</td><td>'+user.mail+'</td><td>'+user.pass+'</td><td>'+user.perfilNet+'<br><hr>'+user.typeAcounts+'<br>'+user.pinNetflix+'</td><td>'+user.nota+'</td><br><td> <a class="aTable" href="/edit-user/'+user.id+'">Edit</a><hr><a class="ButtonTable" href="/delete-user/'+user.id+'" type="button">Delete</a></td></tr>'));
             }
            else{
              $('#tableUsers').html('<tr><td>'+elem.phone+'</td><td>'+elem.plan+'</td><td>'+elem.day+'</td><td>'+elem.vence+'</td><td><select id="'+elem.id+'" class="selectStatus_Table_search"><option  selected disabled>Seleccione un estado de usuario</option><option value="1">Vigente</option><option value="0">Por pagar</option><option value="2">Prorroga</option><option value="3">Suspendido</option></select>'+elem.status+'</td><td>'+elem.saldo+'</td><td>'+elem.mail+'</td><td>'+elem.pass+'</td><td>'+elem.perfilNet+'<br><hr>'+elem.typeAcounts+'<br>'+elem.pinNetflix+'</td><td>'+elem.nota+'</td><br><td><a class="aTable" href="/edit-user/'+elem.id+'">Edit</a><hr><a class="ButtonTable" href="/delete-user/'+elem.id+'" type="button">Delete</a></td></tr>');
            }
      }
      else{
         $('#tableUsers').html('<tr><td>'+elem.phone+'</td><td>'+elem.plan+'<td>'+elem.day+'</td><td>'+elem.vence+'</td><td>'+elem.status+'</td><td>'+elem.saldo+'</td><td><select id="'+elem.id+'" class="selectStatus_Table_search"><option  selected disabled>Seleccione un estado de usuario</option><option value="1">Vigente</option><option value="0">Por pagar</option><option value="2">Prorroga</option><option value="3">Suspendido</option></select>'+elem.mail+'</td><td>'+elem.pass+'</td><td>'+elem.perfilNet+'<br><hr>'+elem.typeAcounts+'<br>'+elem.pinNetflix+'</td><td>'+elem.nota+'</td><br><td><a class="aTable" href="/edit-user/'+elem.id+'">Edit</a><hr><a class="ButtonTable" href="/delete-user/'+elem.id+'" type="button">Delete</a></td></tr>');
      }
    }
    collections.forEach(element => search(element));
    
      $( ".selectStatus_Table_search" ).change(function() {
        var id = $(this).attr('id')
        var value = $(this).val()
        
        var userStatus = {
          statusNew: value,
          id: id
        };
        
       axios.post('http://75.102.23.138:4000/students/zz', userStatus, {headers: {authorization: 'Bearer '+cookies.get('token')}})
        .then(res => window.location.replace("/dashboard"));
      });    
  }



  componentDidMount() {
      axios.get('http://75.102.23.138:4000/students/', {
        headers: {
          authorization: 'Bearer '+cookies.get('token')
        }
      })
      .then(res => {
        collections = res.data
        console.log(collections)
        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  DataTable() {
    return this.state.students.map((res, i) => {
      return <StudentTableRow obj={res} key={i} />;
    });
  }

    render() {
        return (<div className="form-wrapper">
            <div className="container">
              <div className="row" id="userShow">

              </div>
            </div>
            <Form.Group controlId="Name">
              <Form.Label>Buscar Usuario</Form.Label>
              <Form.Control type="text" placeholder='Buscar' id="searchField" onChange={this.onSubmit}/>
            </Form.Group>
        </div>);
    }

}
