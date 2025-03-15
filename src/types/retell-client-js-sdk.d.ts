declare module 'retell-client-js-sdk' {
  export interface StartCallOptions {
    accessToken: string;
  }

  export type EventType = 
    | 'agent_start_talking'
    | 'agent_stop_talking'
    | 'call_started'
    | 'call_ended'
    | 'error';

  export type EventHandler = (event?: any) => void;

  export class RetellWebClient {
    constructor();
    startCall(options: StartCallOptions): Promise<void>;
    stopCall(): Promise<void>;
    on(event: EventType, handler: EventHandler): void;
    off(event: EventType, handler: EventHandler): void;
  }
} 