const GetEmployeesList = ({RestClient}, filter, offset, size) => RestClient
    .put(`/auth/v1/employees`, !!filter ? filter : {})
    .query({
        hasFilter: !!filter,
        page: offset === 0 ? 0 : offset / size,
        size,
        sort: 'id'
    })
    .then(response => response.body);

const GetRolesList = ({RestClient}) => {
    return RestClient
        .get(`/auth/v1/roles`)
        .then(response => response.body)
};

const GetEmployee = ({RestClient}, id) => {
    return RestClient
        .get(`/auth/v1/employees/${id}`)
        .then(response => response.body)
};

const GetRole = ({RestClient}, id) => {
    return RestClient
        .get(`/auth/v1/roles/${id}`)
        .then(response => response.body)
};

const GetServicesList = ({RestClient}) => {
    return RestClient
        .get(`/auth/v1/rights`)
        .then(response => response.body)
};

const SaveEmployee = ({RestClient}, id, employee) => {
    return RestClient
        .put(`/auth/v1/employees/${id}`, employee)
        .then(response => response.body)
};
const CreateEmployee = ({RestClient}, role) => {
    return RestClient
        .post(`/auth/v1/employees`, role)
        .then(response => response.body)
};
const UnlockEmployee = ({RestClient}, id) => {
    return RestClient
        .post(`/auth/v1/employees/${id}/unlock`, {})
        .then(response => response.body)
};
const ResetPassword = ({RestClient}, id) => {
    return RestClient
        .get(`/auth/v1/resetPassword/${id}`, {})
        .then(response => response.body)
};
const LockEmployee = ({RestClient}, id) => {
    return RestClient
        .post(`/auth/v1/employees/${id}/lock`, {})
        .then(response => response.body)
};
const DeleteEmployee = ({RestClient}, id) => {
    return RestClient
        .delete(`/auth/v1/employees/${id}`)
        .then(response => response.body)
};

const SaveRole = ({RestClient}, role) => {
    return RestClient
        .put(`/auth/v1/roles/${role.id}`, role)
        .then(response => response.body)
};
const CreateRole = ({RestClient}, role) => {
    return RestClient
        .post(`/auth/v1/roles`, role)
        .then(response => response.body)
};

const DeleteRole = ({RestClient}, id) => {
    return RestClient
        .delete(`/auth/v1/roles/${id}`)
        .then(response => response.body)
};

const GetOrgUnits = ({RestClient}) => {
    return RestClient
        .get(`/auth/v1/orgunits`)
        .then(response => response.body)
};

const GetSegments = ({RestClient}) => {
    return RestClient
        .get(`/auth/v1/segments`)
        .then(response => response.body)
};

const transformSessionData = response => {
    const {user, rights, changePassword} = response.body;
    return {user, rights, changePassword};
};

const login = ({RestClient}, data) => {
    return RestClient
        .post(`/auth/v1/login`, data)
        .send(data)
        .then(transformSessionData)
};

const changePassword = ({RestClient}, data) => {
    return RestClient
        .post(`/auth/v1/changePassword`, data)
        .send(data)
        .then(response => response.body)
};

const logout = ({RestClient}) => {
    return RestClient
        .post('/auth/v1/logout')
        .catch(() => {
            console.log("logout")
        })
};

const session = ({RestClient}) => {
    return RestClient
        .get('/auth/v1/session')
        .then(transformSessionData)
};

const PutSettingsPassword = ({RestClient}, data) => {
    return RestClient
        .put('/auth/v1/settings/password')
        .set('Content-Type', 'application/json')
        .send(data)
        .then(response => response.body);
};

const GetSettingsPassword = ({RestClient}) => {
    return RestClient
        .get('/auth/v1/settings/password')
        .then(response => response.body);
};

export const PutSettingsPasswordAction = {
    name: 'put.settings.password',
    action: PutSettingsPassword
};

export const GetSettingsPasswordAction = {
    name: 'get.user.settings.password',
    action: GetSettingsPassword
};

export const GetEmployeesListAction = {
    name: 'auth.employees.getList',
    action: GetEmployeesList
};
export const GetRolesListAction = {
    name: 'auth.roles.getList',
    action: GetRolesList
};

export const GetEmployeeAction = {
    name: 'auth.employees.get',
    action: GetEmployee
};

export const GetRoleAction = {
    name: 'auth.roles.get',
    action: GetRole
};

export const GetServicesListAction = {
    name: 'auth.services.getList',
    action: GetServicesList
};

export const SaveEmployeeAction = {
    name: 'auth.employees.save',
    action: SaveEmployee
};

export const CreateEmployeeAction = {
    name: 'auth.employees.create',
    action: CreateEmployee
};

export const DeleteEmployeeAction = {
    name: 'auth.employees.delete',
    action: DeleteEmployee
};

export const SaveRoleAction = {
    name: 'auth.roles.save',
    action: SaveRole
};

export const CreateRoleAction = {
    name: 'auth.roles.create',
    action: CreateRole
};

export const DeleteRoleAction = {
    name: 'auth.roles.delete',
    action: DeleteRole
};

export const GetOrgUnitsAction = {
    name: 'auth.orgunits.get',
    action: GetOrgUnits
};

export const GetSegmentsAction = {
    name: 'auth.segments.get',
    action: GetSegments
};

export const LoginAction = {
    name: 'auth.login',
    action: login
};

export const ChangePasswordAction = {
    name: 'auth.change.password',
    action: changePassword
};

export const LogoutAction = {
    name: 'auth.logout',
    action: logout
};

export const SessionAction = {
    name: 'auth.session',
    action: session
};

export const LockEmployeeAction = {
    name: 'auth.employee.lock',
    action: LockEmployee
};

export const UnlockEmployeeAction = {
    name: 'auth.employee.unlock',
    action: UnlockEmployee
};

export const ResetPasswordAction = {
    name: 'auth.employee.resetPassword',
    action: ResetPassword
};

const resetClientPassword = ({RestClient}, clientId) => {
    return RestClient
        .post(`/registration-service/v1/reset-password/${clientId}`)
        .then(response => response.body);
};

export const resetClientPasswordAction = {
    name: 'get.auth.resetClientPasswordAction',
    action: resetClientPassword
};

const SyncEmployees = ({RestClient}) => {
    return RestClient
        .get(`/auth/v1/employees/import/sync`)
        .then(response => response.body)
};

export const SyncEmployeesAction = {
    name: 'auth.employees.sync',
    action: SyncEmployees
};

const getStrategyGroups = ({RestClient}) => {
    return RestClient
        .get(`/auth/v1/groups`)
        .query({
            sort: 'id'
        })
        .then(response => response.body);
};

export const GetStrategiesGroupsListAction = {
    name: 'auth.dict.strategy.groups',
    action: getStrategyGroups
};

const checkMotivation = ({RestClient}) => {
    return RestClient
        .get('/auth/v1/motivation/hide-window')
        .then(response => response.body);
}

export const CheckMotivationAction = {
    name: 'auth.motivation.check',
    action: checkMotivation
};

const getMotivation = ({RestClient}) => {
    return RestClient
        .get('/auth/v1/motivation')
        .then(response => response.body);
};

export const GetMotivationAction = {
    name: 'auth.motivation.get',
    action: getMotivation
};
const getMotivationAdmin = ({RestClient}, id) => {
    return RestClient
        .get(`/auth/v1/motivation/${id}/get-latest`)
        .then(response => response.body);
};

export const GetMotivationAdminAction = {
    name: 'auth.motivation.admin.get',
    action: getMotivationAdmin
};
const editMotivation = ({RestClient}, data) => {
    return RestClient
        .post('/auth/v1/motivation', data)
        .set('Content-Type', 'application/json')
        .send(data)
        .then(response => response.body);
};

export const EditMotivationAction = {
    name: 'auth.motivation.edit',
    action: editMotivation
};
const editMotivationAdmin = ({RestClient}, data) => {
    return RestClient
        .post(`/auth/v1/motivation/${data.id}/edit`, data)
        .set('Content-Type', 'application/json')
        .send(data)
        .then(response => response.body);
};

export const EditMotivationAdminAction = {
    name: 'auth.motivation.admin.edit',
    action: editMotivationAdmin
};

const motivationReport = ({RestClient}, data) => {
    return RestClient
        .post(`/auth/v1/motivation/report`)
        .set('Content-Type', 'application/json')
        .send(data)
        .then(response => response.body);
};

export const motivationReportAction = {
    name: 'auth.motivation.admin.motivationReport',
    action: motivationReport
};
