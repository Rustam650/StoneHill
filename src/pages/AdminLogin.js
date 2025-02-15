import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styled from 'styled-components';

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Если пользователь уже авторизован, перенаправляем на дашборд
        if (isAuthenticated) {
            navigate('/admin/dashboard');
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Попытка входа:', { username }); // Для отладки

        try {
            if (username === 'admin' && password === 'admin123') {
                const userData = {
                    username: username,
                    isAdmin: true
                };
                login(userData);
                navigate('/admin/dashboard');
            } else {
                setError('Неверные учетные данные администратора');
            }
        } catch (err) {
            console.error('Ошибка при входе:', err);
            setError('Произошла ошибка при входе');
        }
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <h2>Вход в панель администратора</h2>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <InputGroup>
                    <label>Имя пользователя:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </InputGroup>
                <InputGroup>
                    <label>Пароль:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </InputGroup>
                <LoginButton type="submit">Войти</LoginButton>
            </LoginForm>
        </LoginContainer>
    );
}

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 20px;
    background-color: #f5f5f5;
`;

const LoginForm = styled.form`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;

    h2 {
        text-align: center;
        margin-bottom: 2rem;
        color: #333;
    }
`;

const InputGroup = styled.div`
    margin-bottom: 1.5rem;

    label {
        display: block;
        margin-bottom: 0.5rem;
        color: #666;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 1rem;

        &:focus {
            outline: none;
            border-color: #f1c232;
        }
    }
`;

const LoginButton = styled.button`
    width: 100%;
    padding: 0.75rem;
    background-color: #f1c232;
    color: #333;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #e3b42d;
    }
`;

const ErrorMessage = styled.div`
    color: #dc3545;
    text-align: center;
    margin-bottom: 1rem;
    padding: 0.5rem;
    background-color: #fff;
    border-radius: 4px;
`;

export default AdminLogin; 