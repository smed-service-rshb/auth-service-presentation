import {compose} from "@efr/medservice-web-presentation-core";
import {WithoutExternalDependency} from "@efr/medservice-web-presentation-utils-dev";

import devDefinition from '@efr/medservice-web-presentation-authentication/dependency';

export default compose(
    devDefinition({WithoutExternalDependency}), //dev-определение модуля (с указанием зависимостей)
);
