import { MOTIVATION_PAGE } from "../page-keys";
import Motivation from "./Motivation";
import permissions from "../../../permissions";

export const MotivationPage = {
    key: MOTIVATION_PAGE,
    path: '/motivation',
    component: Motivation,
    availability: authContext => authContext.checkPermission(permissions.PARTICIPATE_MOTIVATION)
};
