export interface FortressScheduleActivity {
    "location": string;
    "name": string;
    "day": string[];
    "time_start": string;
    "time_end": string;
}

interface BattlefieldEntryTime {
    "time_start": string;
    "time_end": string;
}

export interface ScheduleBattlefieldActivity {
    "name": string;
    "entry lvl": string;
    "entries": string;
    "entry time": BattlefieldEntryTime[]
}

export interface RiftScheduleActivity {
    "region": string;
    "day": string[];
    "time_start": string;
    "time_end": string;
}