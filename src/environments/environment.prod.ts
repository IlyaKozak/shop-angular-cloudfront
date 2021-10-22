import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product:
      'https://racul759t9.execute-api.eu-west-1.amazonaws.com/dev/products',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://xc76c6s438.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://zz73b76oel.execute-api.eu-west-1.amazonaws.com/rds',
    cart: 'https://ua69tkrc21.execute-api.eu-west-1.amazonaws.com/dev/api',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: true,
    cart: true,
  },
};
