import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Cookies from 'universal-cookie';
import $ from 'jquery'
const cookies = new Cookies()
export default class StudentTableRow extends Component {

    constructor(props) {
        super(props);

        this.status = '';
        this.onChangeStudentStatus = this.onChangeStudentStatus.bind(this);



    }
    onChangeStudentStatus(e) {
        this.status = e.target.value 
    
        var userStatus = {
            statusNew: e.target.value,
            id: this.props.obj.id,
            plan: this.props.obj.plan,
            phone: this.props.obj.phone
        };

        var host = window.location.hostname;
        axios.post('http://75.102.23.138:4000/students/zz', userStatus, {headers: {authorization: 'Bearer '+cookies.get('token')}})
        .then(res => window.location.replace("/dashboard"));


          /*var sel = window.getSelection && window.getSelection();

          if (sel && sel.rangeCount > 0) {
            console.log(window.location.hostname+' aver '+this.props.obj.id+' ← aasddds  → '+e.target.value)
          }else{
            console.log(this.props.obj.id + ' ← aasddds  → '+e.target.value)
          }*/

          

    }

    render() {
     
        return (
            <tr>
                <td>{this.props.obj.phone}</td>
                <td>{this.props.obj.plan}</td>
                <td>{this.props.obj.day}</td>
                <td>{this.props.obj.vence}</td>
                <td>

                <select id="statusInput" class="selectStatus_Table" onChange={this.onChangeStudentStatus} required>
                  <option  selected disabled>Seleccione un estado de usuario</option>
                  <option value="1">Vigente</option>
                  <option value="0">Por pagar</option>
                  <option value="2">Prorroga</option>
                  <option value="3">Suspendido</option>
                </select>

                {this.props.obj.status}</td>
                <td>{this.props.obj.saldo}</td>
                <td>{this.props.obj.mail}</td>
                <td>{this.props.obj.pass}</td>
                <td>{this.props.obj.perfilNet}<br/>{this.props.obj.planDetails}<br/>{this.props.obj.typeAcounts}<br/>{this.props.obj.pinNetflix}</td>
                <td>{this.props.obj.nota}</td>
                <br />
                <td>
                    <Link className="aTable" to={"/edit-user/" + this.props.obj.id}>
                        Editar
                    </Link>
                    <br />
                    <Link className="ButtonTable" to={"/delete-user/" + this.props.obj.id}>
                    Eliminar
                    </Link>
                </td>
            </tr>
        );
    }
}
