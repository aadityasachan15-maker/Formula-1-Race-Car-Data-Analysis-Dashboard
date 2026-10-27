export type CircuitType = 'Permanent' | 'Street' | 'Street/Park' | 'High-Speed' | 'Technical';
export type CircuitDirection = 'Clockwise' | 'Anti-clockwise' | 'Mixed';

export interface Circuit {
  circuit_id: string;
  circuit_name: string;
  name: string;
  grand_prix: string;
  country: string;
  city: string;
  length_km: number;
  lap_km: number;
  laps: number;
  race_distance_km: number;
  circuit_type: CircuitType;
  type: string;
  altitude_m: number;
  direction: CircuitDirection;
  lat: number;
  lng: number;
  first_gp_year: number;
  lap_record_s: number;
  lap_record_driver: string;
}

export type TyreCompound = 'Soft' | 'Medium' | 'Hard' | 'Intermediate' | 'Wet';
export type DNFAttribution = 'Engine failure' | 'Brake failure' | 'Collision' | 'Mechanical' | 'Other' | 'None';

export interface RaceResult {
  race_id: string;
  year: number;
  round: number;
  grand_prix: string;
  circuit_id: string;
  date: string;
  driver: string;
  driver_code: string;
  nationality: string;
  team: string;
  grid_position: number;
  finish_position: number | null; // null if DNF
  points: number;
  laps_completed: number;
  laps_led: number;
  drs_overtakes: number;
  tyre_compound: TyreCompound;
  pit_stops: number;
  dnf: boolean;
  dnf_reason: DNFAttribution;
  gap_to_leader_s: number | null;
  air_temp_celsius: number;
  track_temp_celsius: number;
  weather: 'Dry' | 'Mixed' | 'Wet';
  fastest_lap: boolean;
}

export interface ChampionshipStanding {
  year: number;
  team: string;
  points: number;
  rank: number;
  wins: number;
  podiums: number;
  pole_positions: number;
  engine_supplier: string;
  color: string;
}

export interface LapIntelligence {
  race_id: string;
  driver: string;
  lap: number;
  lap_time_s: number;
  tyre_compound: TyreCompound;
  tyre_age_laps: number;
  speed_trap_kmh: number;
  sector_1_s: number;
  sector_2_s: number;
  sector_3_s: number;
  drs_active: boolean;
}

export interface QualifyingResult {
  race_id: string;
  year: number;
  driver: string;
  team: string;
  q1_s: number;
  q2_s: number;
  q3_s: number;
  grid: number;
  delta_to_pole_s: number;
}

export interface GlobalFilters {
  dnfReason: 'ALL' | DNFAttribution;
  year: 'ALL' | number;
  topN: number;
  selectedTeam: 'ALL' | string;
  selectedCircuitType: 'ALL' | CircuitType;
  searchQuery: string;
}

export interface DriverReliabilityStats {
  driver: string;
  team: string;
  nationality: string;
  totalRaces: number;
  finishedRaces: number;
  dnfCount: number;
  dnfByReason: Record<Exclude<DNFAttribution, 'None'>, number>;
  reliabilityScore: number; // percentage (0 - 100%)
  pointsTotal: number;
}

export interface TeamPerformanceStats {
  team: string;
  color: string;
  totalPoints: number;
  totalWins: number;
  totalPodiums: number;
  totalRaces: number;
  dnfCount: number;
  dnfRate: number;
  avgGridPosition: number;
  avgFinishPosition: number;
  championshipTitles: number;
}

export interface StoryScene {
  id: number;
  title: string;
  subtitle: string;
  narrative: string;
  focusPersona: 'Arnold' | 'Lisa' | 'Gilchrist' | 'All';
  keyInsights: string[];
  suggestedFilter?: Partial<GlobalFilters>;
  chartRef: string;
}
