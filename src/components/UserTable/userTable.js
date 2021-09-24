import React, {Component} from 'react';
import axios from 'axios';



class UserTable extends React.Component{
    constructor(props){
        super(props);
        this.state={
            'employees': []
        };
    }

    /*13/09/2021*/
    componentDidMount(){
        const url = 'http://localhost/scripts/php.php';

        axios.get(url,{ params: { emp_no: "" } }).then(response => response.data)
             .then((data) => {
                this.setState({ employees: data})
                console.log(this.state.employees)
        });
    }

    mySubmit(event){
        event.preventDefault();
        console.log('this is the submit ' + event.target.username.value);
    }

    render(){
        return(
           <div>
                <h1>This is Adali's garage</h1>

                <table>
                    <tr>
                        <th>emp_no</th>
                        <th>first_name</th>
                        <th>last_name</th>
                        <th>gender</th>
                        <th>birth_date</th>
                        <th>hire_date</th>
                    </tr>
                    {this.state.employees.map((employee) => (
                    <tr key={employee.emp_no.toString()}>
                        <td>{employee.emp_no}</td>
                        <td>{employee.first_name}</td>
                        <td>{employee.last_name}</td>
                        <td>{employee.gender}</td>
                        <td>{employee.birth_date}</td>
                        <td>{employee.hire_date}</td>
                        
                    </tr>
                    ))}
                </table>

                <form onSubmit={this.mySubmit}>
                    <input type='text' name='username'/>
                    <p>enter yout name</p>

                    <input type='text' name='age'/>
                    <p>enter yout age</p>
             
                    <input type='submit'/>
                
                </form>
           </div> 
        );
    }
}
export default UserTable;