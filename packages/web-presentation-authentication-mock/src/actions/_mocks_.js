import {CRUDService, mockRoute} from '@efr/medservice-web-presentation-utils-mock';
import rights from './_mock-rights_';
import motivation from './_motivation_'


let employeeIdHighWaterMark = 1000;
let roleIdHighWaterMark = 1000;

let currentSession;

let changePassword = true;

const employee = [
    {
        id: 123,                       // идентификатор
        login: "1",                // логин
        firstName: "Вася",             // имя
        secondName: "Пупкин",          // фамилия
        middleName: "Сергеевич",       // отчество,
        birthDate: "01.01.1970",        // дата рождения
        mobilePhone: "+79000000000",  // мобильный телефон
        innerPhone: "1001",         // внутренний телефон
        personnelNumber: "N79000000000",  // табельный номер
        email: "1@fe.fe",         // адрес электронной почты
        phone: "+79210001234",         // телефон
        position: "Администратор",               // должность
        branches: ["Амурский РФ", "Алтайский РФ"],        // филиал
        offices: [{officeId: 231600, officeName: "2316"},
            {officeId: 180000, officeName: "1800"}],               // офис
        segment: "Массовый",          // сегмент
        roles: ["admin"],               // назначенные роли
        orgUnits: [231600, 180000],     // ВСП
        segmentId: 1,                   // сегмент
        groupIds: [1, 2, 3],              // Группы пользователей
        changePassword: false,
        lockStatus: false,
        isInfoCorrect: true             // Предоставленные данные корректны
    },
    {
        id: 323,                          // идентификатор
        login: "2",                       // логин
        firstName: "Вася",                // имя
        secondName: "Пупкин",             // фамилия
        middleName: "Сергеевич",          // отчество
        mobilePhone: "+79000000000",      // мобильный телефон
        innerPhone: "1002",               // внутренний телефон
        personnelNumber: "N79000000000",  // табельный номер
        email: "change@petition.org",     // адрес электронной почты
        position: "Администратор",                  // должность
        branches: ["Амурский РФ"],        // филиал
        offices: [{officeId: 231600, officeName: "2316"}],               // офис
        segment: "Массовый",          // сегмент
        roles: ["admin"],                 // назначенные роли
        changePassword: true,             // признак первого входа
        orgUnits: [231600, 180000],       // ВСП
        segmentId: 1,                     // сегмент
        groupIds: [1, 2, 3],              // Группы пользователей
        lockStatus: false,
        isInfoCorrect: true             // Предоставленные данные корректны
    },
    {
        id: 124,                       // идентификатор
        login: "arsen777",                // логин
        firstName: "Арсен",             // имя
        secondName: "Работашвили",          // фамилия
        middleName: "Воркович",       // отчество
        birthDate: "03.03.1983",        // дата рождения
        mobilePhone: "+79000000000",  // мобильный телефон
        innerPhone: "1003",               // внутренний телефон
        personnelNumber: "N79000000000",  // табельный номер
        email: "mail@mail.ru",         // адрес электронной почты
        phone: "+79775432100",         // телефон
        position: "Администратор",               // должность
        branches: ["Амурский РФ"],        // филиал
        offices: [{officeId: 231600, officeName: "2316"}],               // офис
        segment: "Массовый",          // сегмент
        roles: ["admin"],                 // назначенные роли
        orgUnits: [231600],                     // ВСП
        segmentId: 1,                   // сегмент
        groupIds: [1,2,3],              // Группы пользователей
        lockStatus: false,
        isInfoCorrect: false,             // Предоставленные данные корректны
        incorrectInfoComment: 'Твои данные ну так себе... Посмотри еще разок по внимательней, и заполни правильно!!!'
    },
    {
        id: 125,                       // идентификатор
        login: "miha",                // логин
        firstName: "Михаил",             // имя
        secondName: "Георгадзе",          // фамилия
        middleName: "Вазгенович",       // отчество
        birthDate: "11.07.1997",        // дата рождения
        mobilePhone: "+79000000000",  // мобильный телефон
        innerPhone: "1004",               // внутренний телефон
        personnelNumber: "N79000000000",  // табельный номер
        email: "mail@mail.ru",         // адрес электронной почты
        phone: "+79050305080",         // телефон
        position: "Администратор",               // должность
        branches: ["Амурский РФ"],        // филиал
        offices: [{officeId: 231600, officeName: "2316"}],               // офис
        segment: "Массовый",          // сегмент
        roles: [],                 // назначенные роли
        orgUnits: [231600],                     // ВСП
        segmentId: 1,                   // сегмент
        groupIds: [1,2,3],              // Группы пользователей
        lockStatus: false,
        isInfoCorrect: true             // Предоставленные данные корректны
    },
    {
        id: 126,                       // идентификатор
        login: "vasya",                // логин
        firstName: "Вася",             // имя
        secondName: "Пупкин",          // фамилия
        middleName: "Сергеевич",       // отчество
        birthDate: "10.10.1990",        // дата рождения
        mobilePhone: "+79000000000",  // мобильный телефон
        innerPhone: "1005",               // внутренний телефон
        personnelNumber: "N79000000000",  // табельный номер
        email: "mail@mail.ru",         // адрес электронной почты
        phone: "+79998887766",         // телефон
        position: "Администратор",               // должность
        branches: ["Амурский РФ"],        // филиал
        offices: [{officeId: 231600, officeName: "2316"}],               // офис
        segment: "Массовый",          // сегмент
        roles: [],                 // назначенные роли
        orgUnits: [231600],                     // ВСП
        segmentId: 1,                   // сегмент
        groupIds: [1,2,3],              // Группы пользователей
        lockStatus: false,
        isInfoCorrect: true             // Предоставленные данные корректны
    },
    {
        id: 127,                       // идентификатор
        login: "mouseX",                // логин
        firstName: "Крис",             // имя
        secondName: "Касперски",          // фамилия
        middleName: "Владимирович",       // отчество
        birthDate: "31.12.1975",        // дата рождения
        mobilePhone: "+79000000000",  // мобильный телефон
        innerPhone: "1006",               // внутренний телефон
        personnelNumber: "N79000000000",  // табельный номер
        email: "mail@mail.ru",         // адрес электронной почты
        phone: "+79876543210",         // телефон
        position: "Администратор",               // должность
        branches: ["Амурский РФ"],        // филиал
        offices: [{officeId: 231600, officeName: "2316"}],               // офис
        segment: "Массовый",          // сегмент
        roles: [],                 // назначенные роли
        orgUnits: [231600],                     // ВСП
        segmentId: 1,                   // сегмент
        groupIds: [1,2,3],              // Группы пользователей
        lockStatus: false,
        isInfoCorrect: true             // Предоставленные данные корректны
    }
];

const orgUnits = [
    {
        "branchId": 1,
        "name": "Алтайский РФ",
        "offices": [
            {
                "officeId": 180000,
                "name": "1800",
                "city": "Барнаул"
            },
            {
                "officeId": 180001,
                "name": "1801",
                "city": "Барнаул"
            },
            {
                "officeId": 180002,
                "name": "1802",
                "city": "Барнаул"
            },
            {
                "officeId": 180003,
                "name": "1803",
                "city": "Барнаул"
            },
            {
                "officeId": 180004,
                "name": "1804",
                "city": "Барнаул"
            },
            {
                "officeId": 180005,
                "name": "1805",
                "city": "Барнаул"
            },
            {
                "officeId": 180006,
                "name": "1806",
                "city": "Барнаул"
            },
            {
                "officeId": 180007,
                "name": "1807",
                "city": "Барнаул"
            },
            {
                "officeId": 180008,
                "name": "1808",
                "city": "Барнаул"
            },
            {
                "officeId": 180009,
                "name": "1809",
                "city": "Барнаул"
            },
            {
                "officeId": 180010,
                "name": "1810",
                "city": "Барнаул"
            },
            {
                "officeId": 180011,
                "name": "1811",
                "city": "Барнаул"
            }
        ]
    },
    {
        "branchId": 2,
        "name": "Амурский РФ",
        "offices": [
            {
                "officeId": 231600,
                "name": "2316",
                "city": "Благовещенск"
            },
            {
                "officeId": 230000,
                "name": "2300",
                "city": "Благовещенск"
            },
            {
                "officeId": 230200,
                "name": "2302",
                "city": "Благовещенск"
            },
            {
                "officeId": 231300,
                "name": "2313",
                "city": "Зея"
            },
            {
                "officeId": 230400,
                "name": "2304",
                "city": "Ивановка"
            }
        ]
    }
];

const segments = [
    {
        "id": 1,
        "code": "retail",
        "name": "Массовый"
    },
    {
        "id": 2,
        "code": "vip",
        "name": "Премиальный"
    }
];

const roleData = [];
const usedRights = [];

const employeeService = new CRUDService(employee);
const roleDataService = new CRUDService(roleData);

const initRolesAndRights = () => {
    const flatRights = rights.map(right => right.externalId);

    roleData.push({
        id: 21,                                         // Идентификатор роли
        name: "admin",                                       // Название роли
        desc: "Прикладной администратор",   // Краткое описание(для отображения пользователю)
        rights: flatRights,
    });

    usedRights.push(...rights);
};

let currentUserLogin;

export default () => {
    initRolesAndRights();

    const EMPLOYEE_LIST = ({success, request, error}) => {
        return success({
            "content": employeeService.data
                .filter(empl => request.query.office ? empl.office === request.query.office : true)
                .map(empl => ({
                    "id": empl.id,
                    "personnelNumber": empl.personnelNumber,
                    "login": empl.login,
                    "fullName": (empl.secondName ? empl.secondName + " " : "")
                        + (empl.firstName ? empl.firstName + " " : "")
                        + (empl.middleName ? empl.middleName : ""),
                    "birthDate": empl.birthDate,
                    "email": empl.email,
                    "mobilePhone": empl.mobilePhone,
                    "offices": empl.offices.map(item => item.officeName),
                    "branches": empl.branches,
                    "segment": empl.segment,
                    "roles": empl.roles.map(roleName => roleDataService.getRecords().filter(r => r.name === roleName)[0].desc),
                    "position": empl.position,
                    "lockStatus": empl.lockStatus
                })),
            hasMore: false,
            totalElements: 6,
            totalPages: 1,
            last: true,
            size: 10,
            page: 1,
            first: true
        })
    };

    const EMPLOYEE = ({success, request}) => {
        const employee = employeeService.getRecord(request.params.id);
        !employee && error(404);

        return success({
            "id": employee.id,
            "login": employee.login,
            "firstName": employee.firstName,
            "secondName": employee.secondName,
            "middleName": employee.middleName,
            "mobilePhone": employee.mobilePhone,
            "innerPhone": employee.innerPhone,
            "email": employee.email,
            "position": employee.position,
            "personnelNumber": employee.personnelNumber,
            "branchId": employee.branchId,
            "orgUnits": employee.orgUnits,
            "segmentId": employee.segmentId,
            "groupIds": employee.groupIds,
            "roles": employee.roles.map(roleName => roleDataService.getRecords().filter(r => r.name === roleName)[0].id),
            "lockStatus": employee.lockStatus,
            "isInfoCorrect": employee.isInfoCorrect,
            "incorrectInfoComment": employee.incorrectInfoComment
        });
    };

    const GET_RESET_PASSWORD = ({success, request}) => {
        return success({});
    };

    const GET_SETTINGS_PASSWORD = ({success, request}) => {

        return success({
            "checkEnabled": true,
            "maxLength": 6,
            "minLength": 2,
            "numberOfDifferentCharacters": 3,
            "specialCharsets": "!@#$%^&*()_+",
            "enabledCharsets": [
                "DIGIT",
                "LOWERCASE_LATIN"
            ],
            "requiredCharsets": [
                "LOWERCASE_LATIN",
                "SPECIAL"
            ]
        });
    };
    const EMPLOYEE_CREATE = ({success, request, error}) => {
        if (employeeService.data.some(employee => employee.login === request.body.login)) {
            return error(409, {
                errors: [{
                    fieldName: "login",
                    errorMessage: "Пользователь с таким логином уже существует",
                }],
            });
        }
        employeeIdHighWaterMark++;
        const id = employeeIdHighWaterMark;
        console.log(JSON.stringify(request.body));
        let saved = request.body;

        if (saved.email === '') {
            return error(400, {
                errors: [{
                    fieldName: "email",
                    errorMessage: "must match \"(^(((\\w+-)|(\\w+\\.))*\\w+@(\\w+\\.)+[a-zA-Z]{2,6})$)\"",
                }],
            });
        }

        let branch = orgUnits.filter(e => e.offices.find(e => saved.orgUnits.indexOf(e.officeId) > -1) !== undefined);
        saved.id = id;
        saved.branches = branch.map(item => item.name);
        let offices = [];
        branch.map(item => offices.push(item.offices.filter(e => saved.orgUnits.indexOf(e.officeId) > -1)[0].name));
        saved.offices = offices;
        saved.segment = segments.filter(e => e.id === saved.segmentId)[0].name;
        saved.roles = saved.roles.map((employeeRole) => {
            let foundRole = roleData.find((role) => employeeRole === role.id);
            return foundRole && foundRole.name;
        });
        console.log(saved);
        const res = employeeService.createRecord(saved);
        return res ? success() : error(404);
    };
    const EMPLOYEE_UNLOCK = ({success, request, error}) => {
        const employee = employeeService.getRecord(request.params.id);
        employee.lockStatus = false;
        console.log(employee);
        return employee ? success() : error(404);
    };
    const EMPLOYEE_LOCK = ({success, request, error}) => {
        const employee = employeeService.getRecord(request.params.id);
        employee.lockStatus = true;
        console.log(employee);
        return employee ? success() : error(404);
    };


    const EMPLOYEE_UPDATE = ({success, request, error}) => {
        const id = request.params.id;
        request.body.id = id;

        if (employeeService.data.some(employee => (employee.login === request.body.login)
            && (employee.id.toString() !== request.body.id.toString()))) {
            console.log(request.body.login);
            console.log(request.body.id);
            return error(409, {
                errors: [{
                    fieldName: "login",
                    errorMessage: "Пользователь с таким логином уже существует",
                }],
            });
        }

        if (request.body.email === '') {
            return error(400, {
                errors: [{
                    fieldName: "email",
                    errorMessage: "must match \"(^(((\\w+-)|(\\w+\\.))*\\w+@(\\w+\\.)+[a-zA-Z]{2,6})$)\"",
                }],
            });
        }
        const res = employeeService.updateRecord(id, request.body);
        console.log(JSON.stringify(request.body));
        let saved = request.body;
        let branches = orgUnits.filter(e => e.offices.find(e => saved.orgUnits.indexOf(e.officeId) > -1) !== undefined);
        saved.id = id;
        saved.branches = branches.map(item => item.name);
        let offices = [];
        branches.map(item => offices.push(item.offices.filter(e => saved.orgUnits.indexOf(e.officeId) > -1)[0].name));
        saved.offices = offices;
        saved.segment = segments.filter(e => e.id === saved.segmentId)[0].name;
        saved.roles = saved.roles.map((employeeRole) => {
            let foundRole = roleData.find((role) => employeeRole === role.id);
            return foundRole && foundRole.name;
        });
        return res ? success() : error(404);
    };

    const EMPLOYEE_DELETE = ({success, request, error}) => {
        const id = request.params.id;
        const res = employeeService.deleteRecord(id);
        console.log(JSON.stringify(request.body));
        return res ? success() : error(404);
    };

    const ROLE_LIST = ({success}) => {
        success({
            roles: roleDataService.data.map(({id, name, desc}) => ({
                id,                                         // Идентификатор роли
                name,                                       // Название роли
                desc,
            }))
        });
    };

    const ROLE = ({success, request, error}) => {
        const role = roleDataService.getRecord(request.params.id);

        role && success(role);
        !role && error(404);
    };

    const ROLE_SAVE = ({success, request, error}) => {
        if (roleDataService.data.some(role => (role.name === request.body.name && role.id !== parseInt(request.params.id, 10)))) {
            return error(409, {
                errors: [{
                    fieldName: "name",
                    errorMessage: "Роль с таким названием уже существует",
                }],
            });
        }
        const res = roleDataService.updateRecord(request.params.id, request.body);

        return res ? success() : error(404);
    };

    const ROLE_CREATE = ({success, request, error}) => {
        if (roleDataService.data.some(role => role.name === request.body.name)) {
            return error(409, {
                errors: [{
                    fieldName: "name",
                    errorMessage: "Роль с таким названием уже существует",
                }],
            });
        }
        roleIdHighWaterMark++;
        const id = roleIdHighWaterMark;
        const {name, desc, rights} = request.body;
        const res = roleDataService.createRecord({
            id,                                         // Идентификатор роли
            name,                                       // Название роли
            desc,   // Краткое описание(для отображения пользователю)
            rights,
        });
        return res ? success() : error(404);
    };

    const ROLE_DELETE = ({success, request, error}) => {
        const res = roleDataService.deleteRecord(request.params.id);

        res && success();
        !res && error(404);
    };

    const SERVICES_LIST = ({success}) => {
        success({rights: usedRights});
    };

    const LOGIN = ({success, error, request}) => {
        const login = request.body.login;
        currentUserLogin = login;
        if (login.startsWith('406_')) {
            const type = login.substr('406_'.length);
            return error(406, {
                type,
                message: `${login}: ${type}`,
            });
        }

        if (login === '500') {
            return error(500);
        }

        if (!login || login.length === 0) {

            return error(400);
        }

        const employee = employeeService.data.find(current => current.login === login);

        if (!employee) {

            return error(401);
        }
        if (employee.lockStatus) {
            return error(403);
        }
        const {
            firstName: name,
            secondName: surname,
            middleName,
            email,
            mobilePhone,
            position,
            roles,
            personnelNumber,
            offices,
            branches,
            changePassword,
        } = employee;

        const office = (offices && offices.length === 1) ? offices[0].officeName : request.body.officeId;

        currentSession = {
            user: {
                email,
                middleName,
                mobilePhone,
                name,
                position,
                surname,
                personnelNumber,
                offices,
                office,
                branches,
                changePassword
            }
        };
        if (!changePassword && !!office) {
            currentSession.rights = [].concat(...roleDataService.data.filter(role => roles.includes(role.name)).map(({rights}) => rights));
            currentSession.rights = currentSession.rights.filter(right => right !== 'CREATE_CONTRACT_IN_CALL_CENTER')
        }
        return success(currentSession);
    };

    const CHANGE_PASSWORD = ({success, error, request}) => {
        const login = request.body.login;
        const newPassword = request.body.newPassword;

        if (newPassword === '500') {
            return error(500);
        }

        if (!login || login.length === 0) {

            return error(400);
        }

        if (newPassword.length < 5) {
            return error(400, {
                "errors": [{
                    "fieldName": "password",
                    "errorMessage": "Пароль должен иметь длину не менее 6 символов"
                }, {
                    "fieldName": "password",
                    "errorMessage": "Пароль обязательно должен содержать хотя бы по одному символу из следующих наборов: Цифры, Латинские прописные буквы, Латинские заглавные буквы"
                }]
            })
        }

        const employee = employeeService.data.find(current => current.login === login);

        employee.changePassword = false;

        const {
            firstName: name,
            secondName: surname,
            middleName,
            email,
            mobilePhone,
            position,
            roles,
            personnelNumber,
            branch,
            offices,
            changePassword,
        } = employee;

        const office = (offices && offices.length === 1) ? offices[0].officeName : null;

        currentSession = {
            user: {
                email,
                middleName,
                mobilePhone,
                name,
                position,
                surname,
                personnelNumber,
                office,
                offices,
                branch,
                changePassword
            }
        };
        if (!changePassword && !!office) {
            currentSession.rights = [].concat(...roleDataService.data.filter(role => roles.includes(role.name)).map(({rights}) => rights));
            currentSession.rights = currentSession.rights.filter(right => right !== 'CREATE_CONTRACT_IN_CALL_CENTER')
        }
        return success(currentSession);
    };

    const LOGOUT = ({success}) => {
        currentUserLogin = undefined;
        currentSession = null;
        success({});
    };

    const SESSION = ({success, error}) => {
        if (currentSession && currentSession.user && currentSession.user.changePassword) {
            currentSession = null;
        }
        const result = currentSession;
        if (result) {
            success(result)
        } else {
            error(401)
        }
    };

    const ORG_UNIT_LIST = ({success}) => {
        return success({
            "orgUnits": orgUnits
        })
    };

    const SEGMENT_LIST = ({success}) => {
        return success({
            "segments": segments
        })
    };

    const SYNC_USER = ({success}) => {
        return success({});
    };
    const getStrategyGroups = ({success}) => {
        success(
            {
                content: [
                    {
                        "id": 1,
                        "name": "Бенефит",
                        "code": "benefit"
                    },
                    {
                        "id": 2,
                        "name": "Альфа",
                        "code": "alpha"
                    },
                    {
                        "id": 3,
                        "name": "Вип сегмент",
                        "code": "vipsegment"
                    }
                ],
                totalPages: 1,
                totalElements: 3,
                last: true,
                number: 0,
                size: 50,
                numberOfElements: 3,
                sort: [
                    {
                        direction: "ASC",
                        property: "id",
                        ignoreCase: false,
                        nullHandling: "NATIVE",
                        ascending: true,
                        descending: false
                    }
                ],
                "first": true
            })
    };
    return [
        mockRoute.put('/auth/v1/employees', EMPLOYEE_LIST),
        mockRoute.get('/auth/v1/employees/:id', EMPLOYEE),
        mockRoute.post('/auth/v1/employees', EMPLOYEE_CREATE),
        mockRoute.put('/auth/v1/employees/:id', EMPLOYEE_UPDATE),
        mockRoute.delete('/auth/v1/employees/:id', EMPLOYEE_DELETE),
        mockRoute.get('/auth/v1/roles', ROLE_LIST),
        mockRoute.get('/auth/v1/roles/:id', ROLE),
        mockRoute.get('/auth/v1/rights', SERVICES_LIST),
        mockRoute.put('/auth/v1/roles/:id', ROLE_SAVE),
        mockRoute.post('/auth/v1/roles', ROLE_CREATE),
        mockRoute.delete('/auth/v1/roles/:id', ROLE_DELETE),
        mockRoute.get('/auth/v1/orgunits', ORG_UNIT_LIST),
        mockRoute.get('/auth/v1/segments', SEGMENT_LIST),
        mockRoute.post('/auth/v1/employees/:id/unlock', EMPLOYEE_UNLOCK),
        mockRoute.post('/auth/v1/employees/:id/lock', EMPLOYEE_LOCK),

        mockRoute.post('/auth/v1/login', LOGIN),
        mockRoute.post('/auth/v1/changePassword', CHANGE_PASSWORD),
        mockRoute.post('/auth/v1/logout', LOGOUT),
        mockRoute.get('/auth/v1/session', SESSION),
        mockRoute.get('/auth/v1/employees/import/sync', SYNC_USER),

        // mockRoute.get('/auth/v1/settings/password', PUT_SETTINGS_PASSWORD),
        mockRoute.get('/auth/v1/settings/password', GET_SETTINGS_PASSWORD),
        mockRoute.get('/auth/v1/resetPassword/:id', GET_RESET_PASSWORD),

        mockRoute.get('/auth/v1/groups/', getStrategyGroups),

        ...motivation
    ]
};
