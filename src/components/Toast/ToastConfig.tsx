import Toast from './Toast';

export const toastConfig = {
  success: ({props}: {props: {message: string}}) => {
    return <Toast bg="success" message={props.message} />;
  },

  error: ({props}: {props: {message: string}}) => {
    return <Toast bg="alert" message={props.message} />;
  },
};
