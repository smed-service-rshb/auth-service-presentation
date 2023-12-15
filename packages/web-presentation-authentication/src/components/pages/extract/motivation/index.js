import MotivationReport from './MotivationReport';
import permissions from "../../../../permissions";
import {MOTIVATION_REPORT_PAGE} from '../../page-keys'

export const motivationReportPage = {
    key: MOTIVATION_REPORT_PAGE,
    path: '/motivation-report',
    component: MotivationReport,

    availability: authContext =>
        (authContext.checkPermission(permissions.MOTIVATION_REPORT_CREATE))
};
