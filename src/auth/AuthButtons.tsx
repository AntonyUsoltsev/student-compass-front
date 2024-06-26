import React, {useEffect, useState} from 'react';
import {Button, Space, Avatar} from 'antd';
import AuthModal from './AuthModal';
import RegisterModal from './RegisterModal';

const AuthButtons = () => {
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [registerModalVisible, setRegisterModalVisible] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [userInitial, setUserInitial] = useState('');
    const [avatarClicked, setAvatarClicked] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const initial = localStorage.getItem('initial')
            setLoggedIn(true);
            if (initial) {
                setUserInitial(initial.charAt(0));
            } else {
                setUserInitial(token.charAt(0));
            }

        }
    }, []);

    const showAuthModal = () => {
        setAuthModalVisible(true);
    };

    const showRegisterModal = () => {
        setRegisterModalVisible(true);
    };

    const closeAuthModal = () => {
        setAuthModalVisible(false);
    };

    const closeRegisterModal = () => {
        setRegisterModalVisible(false);
    };

    const handleAuthenticationSuccess = (username: any) => {
        setLoggedIn(true);
        localStorage.setItem('initial', username.charAt(0));
        setUserInitial(username.charAt(0));
        closeAuthModal();
    };

    const handleRegistrationSuccess = (username: any) => {
        setLoggedIn(true);
        localStorage.setItem('initial', username.charAt(0));
        setUserInitial(username.charAt(0));
        closeRegisterModal();
    };

    const exitHandle = () => {
        setLoggedIn(false);
        localStorage.removeItem('token');
    };

    const buttonStyle = {width: '160px'};
    const exitButtonStyle = {width: '160px', color: "red"};
    const avatarStyle = {cursor: 'pointer', fontSize: '24px',};

    return (
        <div style={{float: "right"}}>
            <div onClick={() => setAvatarClicked(true)} style={avatarStyle}>
                {isLoggedIn ? (
                    <div>
                        <Avatar style={avatarStyle}>
                            {userInitial}
                        </Avatar>
                        {avatarClicked && (
                            <Button style={exitButtonStyle} onClick={exitHandle}>
                                Выйти
                            </Button>
                        )}
                    </div>
                ) : (
                    <Space direction="vertical">
                        <Button style={buttonStyle} onClick={showAuthModal}>
                            Авторизоваться
                        </Button>
                        <Button style={buttonStyle} onClick={showRegisterModal}>
                            Зарегистрироваться
                        </Button>
                    </Space>
                )}
            </div>

            <AuthModal visible={authModalVisible} onClose={closeAuthModal}
                       onAuthenticationSuccess={handleAuthenticationSuccess}/>
            <RegisterModal visible={registerModalVisible} onClose={closeRegisterModal}
                           onRegistrationSuccess={handleRegistrationSuccess}/>
        </div>
    );
};

export default AuthButtons;
