import type { FortressScheduleActivity, RiftScheduleActivity, ScheduleBattlefieldActivity } from "../../../types";

export interface CurrentActivitiesProps {
    rifts: RiftScheduleActivity[];
    fortress: FortressScheduleActivity[];
    battlefields: ScheduleBattlefieldActivity[];

}