import { useState, MouseEvent, ChangeEvent, useEffect } from 'react';
import Input from 'components/Input/Input';
import checkIfEmailIsValid from 'utils/checkIfEmailIsValid';
import checkIfPasswordIsValid from 'utils/checkIfPasswordIsValid';
import comparePasswords from 'utils/comparePasswords';
import styles from './LoginView.module.scss';
import FormLabel from 'components/elements/FormLabel/FormLabel';

export default function LoginView() {
  const [isLoginPage, setIsLoginPage] = useState(false);
  const [registerPageValues, setRegisterPageValues] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loginPageValues, setLoginPageValues] = useState({
    email: '',
    password: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [arePasswordsMatching, setArePasswordsMatching] = useState(true);
  const [isFirstRender, setIsFirstRender] = useState(true);

  function handleTabButtonClick(e: MouseEvent<HTMLButtonElement>) {
    return (e.target as HTMLButtonElement).id === 'registerTab'
      ? setIsLoginPage(false)
      : setIsLoginPage(true);
  }

  useEffect(() => {
    if (!isFirstRender) {
      setIsEmailValid(checkIfEmailIsValid(registerPageValues.email));
      setIsPasswordValid(checkIfPasswordIsValid(registerPageValues.password));
      setArePasswordsMatching(
        comparePasswords(registerPageValues.password, registerPageValues.confirmPassword),
      );
    }
    setIsFirstRender(false);
  }, [registerPageValues, loginPageValues]);

  function createUser() {
    if (!isPasswordValid || !arePasswordsMatching || !isEmailValid) {
      return;
    }
  }

  return (
    <div className={styles.mainContainer}>
      <div className={styles.tabsContainer}>
        <button
          id='registerTab'
          type='button'
          className={`${styles.tab} ${!isLoginPage && styles.active}`}
          onClick={(e) => handleTabButtonClick(e)}
        >
          Register
        </button>
        <button
          id='loginTab'
          type='button'
          className={`${styles.tab} ${isLoginPage && styles.active}`}
          onClick={(e) => handleTabButtonClick(e)}
        >
          Login
        </button>
      </div>
      {!isLoginPage && (
        <div className={styles.registerContainer}>
          {!isEmailValid && <FormLabel type='wrong-email' />}
          <Input
            id='email'
            type='text'
            placeholder='Enter your email...'
            label='E-mail'
            value={registerPageValues.email}
            onChangeFunction={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterPageValues({ ...registerPageValues, email: e.target.value })
            }
          />

          {!isPasswordValid && <FormLabel type='wrong-password' />}
          <Input
            id='password'
            type='password'
            placeholder='Enter your password...'
            label='Password'
            value={registerPageValues.password}
            onChangeFunction={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterPageValues({ ...registerPageValues, password: e.target.value })
            }
          />

          {!arePasswordsMatching && <FormLabel type='no-match-password' />}
          <Input
            id='confirm-password'
            type='password'
            placeholder='Confirm your password...'
            label='Confirm password'
            value={registerPageValues.confirmPassword}
            onChangeFunction={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterPageValues({ ...registerPageValues, confirmPassword: e.target.value })
            }
          />
          <button type='button' className={styles.loginButton} onClick={() => createUser()}>
            Sign me up!
          </button>
        </div>
      )}
      {isLoginPage && (
        <div className={styles.loginContainer}>
          <Input
            id='email'
            type='text'
            placeholder='Enter your email...'
            label='E-mail'
            value={loginPageValues.email}
            onChangeFunction={(e: ChangeEvent<HTMLInputElement>) =>
              setLoginPageValues({ ...loginPageValues, email: e.target.value })
            }
          />
          <Input
            id='password'
            type='password'
            placeholder='Enter your password...'
            label='Password'
            value={loginPageValues.password}
            onChangeFunction={(e: ChangeEvent<HTMLInputElement>) =>
              setLoginPageValues({ ...loginPageValues, password: e.target.value })
            }
          />
          <button type='button' className={styles.loginButton}>
            Log in!
          </button>
        </div>
      )}
    </div>
  );
}
