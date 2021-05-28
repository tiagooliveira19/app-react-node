import React, { Component } from 'react';
import { Link, withRouter  } from 'react-router-dom';
import api from '../../services/api';

import Logo from '../../assets/login.svg';
import { Form, Container } from './styles';
import Swal from 'sweetalert2';

class Cadastrar extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        error: ''
    }

    handleCadastro = async  e => {
        e.preventDefault();

        const { username, email, password } = this.state;

        if (!username || !email || !password) {
            Swal.fire({
                title: 'Atenção!',
                text: 'Preencha os campos para se cadastrar!',
                icon: 'warning',
                confirmButtonText: 'Ok',
                confirmButtonColor: '#2778C4'
            })
        } else {
            try {
                await api.post("/usuarios", { username, email, password });
                this.props.history.push("/");
            } catch (err) {
                console.log(err);
                Swal.fire({
                    title: 'Erro!',
                    text: 'Ocorreu um erro ao realizar o cadastro!',
                    icon: 'error',
                    confirmButtonText: 'Ok',
                    confirmButtonColor: '#F05F70'
                })
            }
        }
    }

    render() {
        return (
            <Container>
                <Form onSubmit={this.handleCadastro} autoComplete="off">
                    <img src={Logo} alt="Login logo" />

                    {this.state.error && <p>{this.state.error}</p>}
                    <input
                        type="text"
                        placeholder="Nome de usuário"
                        onChange={e => this.setState({ username: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Endereço de e-mail"
                        onChange={e => this.setState({ email: e.target.value })}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        onChange={e => this.setState({ password: e.target.value })}
                    />
                    <button type="submit">Cadastrar</button>

                    <hr/>

                    {/*<button type="button" id="btnLogin" >Fazer login</button>*/}
                    <Link to="/login">Fazer login</Link>
                </Form>
            </Container>
        );
    }
}

export default withRouter(Cadastrar);
