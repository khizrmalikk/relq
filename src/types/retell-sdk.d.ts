declare module 'retell-sdk' {
  export interface RetellOptions {
    apiKey: string;
  }

  export interface CallData {
    id: string;
    start_timestamp?: number;
    end_timestamp?: number;
    call_analysis?: {
      call_summary?: string;
      user_sentiment?: string;
      call_successful?: boolean;
      custom_analysis_data?: any;
      in_voicemail?: boolean;
    };
    [key: string]: any;
  }

  export interface CallClient {
    retrieve(callId: string): Promise<CallData>;
  }

  export default class Retell {
    constructor(options: RetellOptions);
    call: CallClient;
  }
} 