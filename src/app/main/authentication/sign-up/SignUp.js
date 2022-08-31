/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import jwtService from '../../../auth/services/jwtService';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  email: yup
    .string()
    .email('Você deve inserir um e-mail válido')
    .required('Você deve inserir um e-mail'),
  password: yup
    .string()
    .required('Por favor, insira sua senha.')
    .min(5, 'A senha é muito curta - deve ter no mínimo 5 caracteres.'),
  passwordConfirm: yup.string().oneOf([yup.ref('password'), null], 'As senhas devem corresponder'),
});

const defaultValues = {
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUp = () => {
  const { control, formState, handleSubmit, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors, setError } = formState;

  function onSubmit({ email, password }) {
    // cria o objeto do novo usuario que sera enviado a API
    const newUser = {
      name: email,
      pass: password,
      Rpass: password,
    };

    // executa a função de chamada da api para criação do novo Usuário
    jwtService
      .createUser(newUser)
      .then((user) => {
        // No need to do anything, registered user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
  }
  return (
    <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-1 min-w-0">
      <Paper className="h-full sm:h-auto md:flex w-full sm:w-auto md:h-full py-32 px-16 sm:p-64 md:p-64 md:pt-28 md:pb-28 sm:rounded-2xl md:rounded-none sm:shadow md:shadow-none rtl:border-r-1 ltr:border-l-1">
        <div className="w-full max-w-320 sm:w-320 mx-auto sm:mx-0">
          <Typography className="mt-32 text-4xl font-extrabold tracking-tight leading-tight">
            Cadastrar-se
          </Typography>
          <div className="flex items-baseline mt-2 font-medium">
            <Typography>Já possui uma conta?</Typography>
            <Link className="ml-4" to="/sign-in">
              Entrar
            </Link>
          </div>

          <form
            name="registerForm"
            noValidate
            className="flex flex-col justify-center w-full mt-32"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="E-mail"
                  type="email"
                  error={!!errors.email}
                  helperText={errors?.email?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Senha"
                  type="password"
                  error={!!errors.password}
                  helperText={errors?.password?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  className="mb-24"
                  label="Repita a senha"
                  type="password"
                  error={!!errors.passwordConfirm}
                  helperText={errors?.passwordConfirm?.message}
                  variant="outlined"
                  required
                  fullWidth
                />
              )}
            />

            <Button
              variant="contained"
              color="secondary"
              className="w-full mt-24"
              aria-label="Register"
              disabled={_.isEmpty(dirtyFields) || !isValid}
              type="submit"
              size="large"
            >
              Crie sua conta gratuitamente
            </Button>
          </form>
        </div>
      </Paper>
      <Box className="relative hidden md:flex flex-auto items-center justify-center h-full p-64 lg:px-112 overflow-hidden fundoSign">
        <Paper className="w-3/4 p-8 flex text-center flex-col md:flex-row papersignin">
          <div className="z-10 relative w-full max-w-2xl">
            <div className="text-7xl font-bold leading-none">
              <div>Remember App</div>
            </div>
            <div className="mt-24 text-lg tracking-tight leading-6">
              Crie notas da suas tarefas, checklist, editando ou removendo para sua organização
              diária.
            </div>
            <div className="w-full flex justify-center mt-32">
              <div className="ml-16 font-medium tracking-tight">Criado por Ana Paula Venzon</div>
            </div>
          </div>
        </Paper>
      </Box>
    </div>
  );
};

export default SignUp;
