import { PropType } from 'vue';
import { IAppData } from '@apps/_common/appInterfaces';

export const appProps = {
  appData: {
    type: Object as PropType<IAppData>,
    require: true,
  },
};
