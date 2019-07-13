import { InjectableRxStompConfig } from '@stomp/ng2-stompjs';
import environment from 'src/environments/environment';

const stompConfig: InjectableRxStompConfig = {
  brokerURL: environment.stompBrokerUrl,
  heartbeatIncoming: 0,
  heartbeatOutgoing: 20000,
  reconnectDelay: 200,
  debug: (msg: string): void => {
    console.log(new Date(), msg);
  },
  connectHeaders: {
    
  }
};

export default stompConfig;
