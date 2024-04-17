import { Notify } from 'quasar';
import { IAxiosError } from 'src/lib/axiosErrorHelpers';
import { TGQLErrors } from 'src/lib/gqlInterfaces';

export const gqlErrorNotification = (errors: TGQLErrors) => {
  if (errors.length > 0) {
    errorNotification(errors[0].message);
  }
}

export const errorNotification = (message: string) => {
  Notify.create({
    type: 'negative',
    message,
  })
}

export const axiosErrorNotifier = (e: IAxiosError) => { errorNotification(e.message); throw e; }
