import { mockRoute } from '@efr/medservice-web-presentation-utils-mock';

const motivations = [{
    id: 123,
    creationDateTime: Date.now().toString(),
    accountNumber: '40000242305430234',
    bikCode: '400574832',
    bankName: 'SBERBANK',
    inn: '777900222333',
    registrationAddress: 'Krasnodar',
    index: '350000',
    comment: 'kjsdhkhdsh',
    motivationCorrectStatus: 'INCORRECT',
    documentName: 'documentAAA',
    passportName: 'passssssss'
}];

const latestMotivation = [{
    id: 3838,
    userId: 123,
    creationDateTime: 'Sep 9 2019',
    endDateTime: 'Oct 9 2019',
    accountNumber: '0239494323',
    bikCode: '234324324',
    bankName: 'Sber',
    inn: '38834843848',
    registrationAddress: 'AAAA',
    index: '33333333',
    comment: 'kjsdhkhdsh',
    motivationCorrectStatus: 'NOT_CHECKED',
    isActive: true,
    documentName: 'sdsdsd',
    passportName: 'passssssss'
}];

const CHECK_MOTIVATION = ({ success, request, error }) => {
    return success(false)
};

const GET_MOTIVATION = ({ success, request, error }) => {
    return success(motivations[0])
};
const GET_ADMIN_MOTIVATION = ({ success, request, error }) => {
    return success(latestMotivation[0])
};

const MOTIVATION_EDIT = ({ success, request, error }) => {
    console.log(request.body);

    return success({})
};

const MOTIVATION_ADMIN_EDIT = ({ success, request, error }) => {
    console.log(request.body);

    return success(request.body)
};

const GET_MOTIVATION_CONFIG = ({ success, request, error }) => {
    console.log(request.body);

    return success(200)
};

const SET_MOTIVATION_CONFIG = ({ success, request, error }) => {
    console.log(request.body);

    return success({})
};

const PRINT_CONSENT = ({ success, request, error }) => {
    return success({})
};

const ATTACH_CONSENT = ({ success, request, error }) => {
    console.log(request.body);
    return success({})
};
const GET_ATTACH_CONSENT = ({ success, request, error }) => {
    return success({})
};
const GET_ATTACH_CONSENT_ADMIN = ({ success, request, error }) => {
    return success({})
};

export default [
    mockRoute.get('/auth/v1/motivation/hide-window', CHECK_MOTIVATION),
    mockRoute.get('/auth/v1/motivation', GET_MOTIVATION),
    mockRoute.get('/auth/v1/motivation/:id/get-latest', GET_ADMIN_MOTIVATION),
    mockRoute.post('/auth/v1/motivation', MOTIVATION_EDIT),
    mockRoute.post('/auth/v1/motivation/:id/edit', MOTIVATION_ADMIN_EDIT),
    mockRoute.get('/auth/v1/motivation/print', PRINT_CONSENT),
    mockRoute.post('/auth/v1/motivation/attach-document', ATTACH_CONSENT),
    mockRoute.get('/auth/v1/motivation/attach-document', GET_ATTACH_CONSENT),
    mockRoute.get('/auth/v1/motivation/:id/get-document', GET_ATTACH_CONSENT_ADMIN),

    mockRoute.get('/auth/v1/settings/motivation-config', GET_MOTIVATION_CONFIG),
    mockRoute.put('/auth/v1/settings/motivation-config', SET_MOTIVATION_CONFIG)
]
