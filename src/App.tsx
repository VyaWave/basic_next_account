import React from 'react';
import axios from 'axios';

import { InputGroup, Input, Button, toaster, Notification } from 'rsuite';
import SortUpIcon from '@rsuite/icons/SortUp';
import EmailIcon from '@rsuite/icons/Email';
import EyeCloseIcon from '@rsuite/icons/EyeClose';
import VisibleIcon from '@rsuite/icons/Visible';
import CharacterLockIcon from '@rsuite/icons/CharacterLock';

import styles from './styles/Login.module.css';

import 'rsuite/dist/rsuite.min.css'
import './styles/globals.css'

import icon from './assets/icon.svg';

type MessageType = 'info' | 'success' | 'warning' | 'error';

const message = (config: {
  type: MessageType;
  title: string;
  content: string;
}) => {
  return (
    <Notification type={config.type} header={config.title} closable>
      <div style={{ minWidth: 200, minHeight: 40 }}>{config.content}</div>
    </Notification>
  );
};

const layout = {
  width: 300,
  marginBottom: 20,
};

const Login = () => {
  const [visible, setVisible] = React.useState(false);
  const [isLogin, setLogin] = React.useState(true);
  const [mail, setMail] = React.useState('');
  const [pass, setPass] = React.useState('');
  const [loginSystem, setLoginSystem] = React.useState(false);

  const handleInputChange = () => {
    setVisible(!visible);
  };

  const handleLoginChange = () => {
    setLogin(!isLogin);
  };

  const handlePassChange = (val: string) => {
    setPass(val.trim());
  };

  const handleMailChange = (val: string) => {
    setMail(val.trim());
  };

  const handleSignUp = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    return axios
      .post(`${baseURL}/account/register`, {
        email: mail,
        password: pass,
      })
      .then((res: any) => {
        if (res.data.code == 200) {
          setLoginSystem(true)

          toaster.push(
            message({ type: 'success', title: '提示', content: '注册成功' }),
            {
              placement: 'topEnd',
            },
          );
        }
      });
  };

  const handleLogin = () => {
    const baseURL = import.meta.env.VITE_BASE_URL;

    return axios
      .post(`${baseURL}/account/login`, {
        email: mail,
        password: pass,
      })
      .then((res: any) => {
        console.info(res);
        if (res.data.code == 200) {
          setLoginSystem(true)
          toaster.push(
            message({ type: 'success', title: '提示', content: '登录成功' }),
            {
              placement: 'topEnd',
            },
          );
        }
      });
  };


  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <img
          src={icon}
          data-origin="_media/icon.svg"
          alt="logo"
          width="250"
          height="60"
          style={{
            zIndex: 100,
            position: 'relative'
          }}
        ></img>
        { !loginSystem ? <div className={styles.ctxWrapper}>
          <InputGroup inside style={layout} className={styles.input}>
            <InputGroup.Addon>
              <EmailIcon />
            </InputGroup.Addon>
            <Input
              placeholder="Your Account"
              value={mail}
              onChange={handleMailChange}
            />
          </InputGroup>

          <InputGroup inside style={layout} className={styles.input}>
            <InputGroup.Addon>
              <CharacterLockIcon />
            </InputGroup.Addon>
            <Input
              placeholder="Your Password"
              type={visible ? 'text' : 'password'}
              value={pass}
              onChange={handlePassChange}
            />
            <InputGroup.Button onClick={handleInputChange}>
              {visible ? <EyeCloseIcon /> : <VisibleIcon />}
            </InputGroup.Button>
          </InputGroup>

          <Button
            type="submit"
            className={styles.button}
            appearance="primary"
            style={{ width: 300 }}
            color="blue"
            onClick={isLogin ? handleLogin : handleSignUp}
          >
            {isLogin ? '登录系统' : '注册账号'}
            <SortUpIcon
              style={{
                transform: 'rotate(90deg)',
                fontSize: '20px',
              }}
            />
          </Button>

          <div className={styles.tips} onClick={handleLoginChange}>
            {isLogin ? 'Go To SignUp' : 'Go To Login'}{' '}
          </div>
        </div>
        :  <p className={styles.title}>You Success Login!</p> }
      </main>
    </div>
  );
};

export default Login;
