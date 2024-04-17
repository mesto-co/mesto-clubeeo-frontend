import { PropType } from 'vue';
import { IAppData } from 'src/apps/_common/appInterfaces';

export const appProps = {
  appData: {
    type: Object as PropType<IAppData>,
    require: true
  }
}
