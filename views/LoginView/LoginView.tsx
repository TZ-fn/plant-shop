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
    email: { value: '', wasTouched: false },
    password: { value: '', wasTouched: false },
    confirmPassword: { value: '', wasTouched: false },
  });
  const [loginPageValues, setLoginPageValues] = useState({
    email: { value: '', wasTouched: false },
    password: { value: '', wasTouched: false },
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
      if (registerPageValues.email.wasTouched) {
        setIsEmailValid(checkIfEmailIsValid(registerPageValues.email.value));
      }
      if (registerPageValues.password.wasTouched) {
        setIsPasswordValid(checkIfPasswordIsValid(registerPageValues.password.value));
      }
      if (registerPageValues.confirmPassword.wasTouched) {
        setArePasswordsMatching(
          comparePasswords(
            registerPageValues.password.value,
            registerPageValues.confirmPassword.value,
          ),
        );
      }
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
            value={registerPageValues.email.value}
            onChangeFunction={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterPageValues({
                ...registerPageValues,
                email: { value: e.target.value, wasTouched: true },
              })
            }
          />

          {!isPasswordValid && <FormLabel type='wrong-password' />}
          <Input
            id='password'
            type='password'
            placeholder='Enter your password...'
            label='Password'
            value={registerPageValues.password.value}
            onChangeFunction={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterPageValues({
                ...registerPageValues,
                password: { value: e.target.value, wasTouched: true },
              })
            }
          />

          {!arePasswordsMatching && <FormLabel type='no-match-password' />}
          <Input
            id='confirm-password'
            type='password'
            placeholder='Confirm your password...'
            label='Confirm password'
            value={registerPageValues.confirmPassword.value}
            onChangeFunction={(e: ChangeEvent<HTMLInputElement>) =>
              setRegisterPageValues({
                ...registerPageValues,
                confirmPassword: { value: e.target.value, wasTouched: true },
              })
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
            value={loginPageValues.email.value}
            onChangeFunction={(e: ChangeEvent<HTMLInputElement>) =>
              setLoginPageValues({
                ...loginPageValues,
                email: { value: e.target.value, wasTouched: true },
              })
            }
          />
          <Input
            id='password'
            type='password'
            placeholder='Enter your password...'
            label='Password'
            value={loginPageValues.password.value}
            onChangeFunction={(e: ChangeEvent<HTMLInputElement>) =>
              setLoginPageValues({
                ...loginPageValues,
                password: { value: e.target.value, wasTouched: true },
              })
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
