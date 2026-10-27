import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterRaceResults,
  calculateKPIs,
  calculateDriverLeaderboard,
  calculateDriverReliability,
  calculateTeamPerformance,
  calculateTyreUsageDistribution,
  calculateCountryParticipation,
  calculatePodiumAchievements,
  simulateTyreStrategy,
} from './f1-analytics';
import { CIRCUITS, CHAMPIONSHIP_STANDINGS, ALL_RACE_RESULTS } from '../data/f1-dataset';
import { GlobalFilters } from '../types/f1';

test('calculateKPIs correctly computes dataset statistics', () => {
  const kpis = calculateKPIs(ALL_RACE_RESULTS, CIRCUITS, CHAMPIONSHIP_STANDINGS);
  assert.equal(kpis.seasonsInPlay, 17);
  assert.ok(kpis.competingTeams >= 10);
  assert.ok(kpis.raceOutcomesLogged >= 6000);
  assert.ok(kpis.circuitsShowcased >= 20);
  assert.ok(kpis.overallReliabilityRate > 80 && kpis.overallReliabilityRate < 95);
});

test('filterRaceResults filters by year correctly', () => {
  const defaultFilters: GlobalFilters = {
    dnfReason: 'ALL',
    year: 2024,
    topN: 10,
    selectedTeam: 'ALL',
    selectedCircuitType: 'ALL',
    searchQuery: '',
  };

  const filtered = filterRaceResults(ALL_RACE_RESULTS, defaultFilters);
  assert.ok(filtered.length > 0);
  for (const r of filtered) {
    assert.equal(r.year, 2024);
  }
});

test('filterRaceResults filters by DNF reason correctly', () => {
  const dnfFilters: GlobalFilters = {
    dnfReason: 'Engine failure',
    year: 'ALL',
    topN: 10,
    selectedTeam: 'ALL',
    selectedCircuitType: 'ALL',
    searchQuery: '',
  };

  const filtered = filterRaceResults(ALL_RACE_RESULTS, dnfFilters);
  assert.ok(filtered.length > 0);
  for (const r of filtered) {
    assert.equal(r.dnf_reason, 'Engine failure');
    assert.equal(r.dnf, true);
  }
});

test('calculateDriverLeaderboard respects Top N parameter', () => {
  const top5 = calculateDriverLeaderboard(ALL_RACE_RESULTS, 5);
  assert.equal(top5.length, 5);
  // Leaderboard must be sorted descending by points
  assert.ok(top5[0].totalPoints >= top5[1].totalPoints);
  assert.ok(top5[1].totalPoints >= top5[2].totalPoints);

  const top15 = calculateDriverLeaderboard(ALL_RACE_RESULTS, 15);
  assert.equal(top15.length, 15);
});

test('calculateDriverReliability aggregates failure reasons accurately', () => {
  const reliabilityList = calculateDriverReliability(ALL_RACE_RESULTS);
  assert.ok(reliabilityList.length > 0);
  const first = reliabilityList[0];
  const totalDnfs =
    first.dnfByReason['Engine failure'] +
    first.dnfByReason['Brake failure'] +
    first.dnfByReason['Collision'] +
    first.dnfByReason['Mechanical'] +
    first.dnfByReason['Other'];
  assert.equal(totalDnfs, first.dnfCount);
  assert.equal(first.totalRaces, first.finishedRaces + first.dnfCount);
});

test('calculateTyreUsageDistribution covers all 5 compounds', () => {
  const distribution = calculateTyreUsageDistribution(ALL_RACE_RESULTS);
  assert.equal(distribution.length, 5);
  const compounds = distribution.map((d) => d.compound);
  assert.deepEqual(compounds, ['Soft', 'Medium', 'Hard', 'Intermediate', 'Wet']);
  const totalPercentage = distribution.reduce((sum, d) => sum + d.percentage, 0);
  assert.ok(Math.abs(totalPercentage - 100) < 1.0);
});

test('simulateTyreStrategy calculates multi-stint pit strategy', () => {
  const sim = simulateTyreStrategy('Street', 50, 'One-Stop (Med-Hard)');
  assert.equal(sim.stints.length, 2);
  assert.equal(sim.stints[0].compound, 'Medium');
  assert.equal(sim.stints[1].compound, 'Hard');
  assert.equal(sim.stints[0].lapsInStint + sim.stints[1].lapsInStint, 50);
});
