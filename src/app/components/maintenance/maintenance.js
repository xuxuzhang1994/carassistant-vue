import maintenance from './maintenance.vue';
import maintenanceRecommend from './maintenance-recommend/maintenance-recommend';
import maintenanceVehicleConfig from './maintenance-vehicle-config/maintenance-vehicle-config';
import maintenanceCycle from './maintenance-cycle/maintenance-cycle';
import maintenanceOther from './maintenance-other/maintenance-other';
import maintenanceFeedback from './maintenance-feedback/maintenance-feedback';

let maintenanceModule = [
    { path: '/maintenance', component: maintenance, meta:{title:'maintenance'} },
]
maintenanceModule=maintenanceModule.concat(
    maintenanceRecommend,
    maintenanceVehicleConfig,
    maintenanceCycle,
    maintenanceOther,
    maintenanceFeedback
);

export default maintenanceModule;