import { useSnackbar, type EnqueueSnackbar } from 'notistack';

let snackbarRef: EnqueueSnackbar;

export const SnackbarUtilsConfigurator = () => {
  const { enqueueSnackbar } = useSnackbar();
  snackbarRef = enqueueSnackbar;
  return null;
};

export const SnackbarUtils = {
  success(msg: string) {
    snackbarRef && snackbarRef(msg, { variant: 'success' });
  },
  error(msg: string) {
    snackbarRef && snackbarRef(msg, { variant: 'error' });
  },
  warning(msg: string) {
    snackbarRef && snackbarRef(msg, { variant: 'warning' });
  },
  info(msg: string) {
    snackbarRef && snackbarRef(msg, { variant: 'info' });
  },
};
