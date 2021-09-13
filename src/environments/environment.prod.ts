import { Config } from './config.interface';

export const environment: Config = {
  production: true,
  apiEndpoints: {
    product:
      'https://zz73b76oel.execute-api.eu-west-1.amazonaws.com/rds/products',
    order: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
    import: 'https://xc76c6s438.execute-api.eu-west-1.amazonaws.com/dev',
    bff: 'https://zz73b76oel.execute-api.eu-west-1.amazonaws.com/rds',
    cart: 'https://.execute-api.eu-west-1.amazonaws.com/dev',
  },
  apiEndpointsEnabled: {
    product: true,
    order: false,
    import: true,
    bff: true,
    cart: false,
  },
};
