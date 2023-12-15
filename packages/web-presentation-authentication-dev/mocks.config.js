import authenticationPackageMocks from '@efr/medservice-web-presentation-authentication-mock'

export default () => ({externalMock}) => {
    externalMock(authenticationPackageMocks());
};
