import DIVES from '../../data/dummy-data';
import {
  UPDATE_DIVE
} from '../actions/dives';
import Dive from '../../models/dive';

const hasStatus = (status, dive, height) => {
  if (dive.status[height]['A'] === status) {
    return true;
  }
  if (dive.status[height]['B'] === status) {
    return true;
  }
  if (dive.status[height]['C'] === status) {
    return true;
  }
  if (dive.status[height]['D'] === status) {
    return true;
  }
  return false;
}

const initialState = {
  dives: DIVES,
  learnedDives1: DIVES.filter(dive => hasStatus('learned', dive, '1')),
  inProgressDives1: DIVES.filter(dive => hasStatus('inProgress', dive, '1')),
  goalDives1: DIVES.filter(dive => hasStatus('goal', dive, '1')),
  learnedDives3: DIVES.filter(dive => hasStatus('learned', dive, '3')),
  inProgressDives3: DIVES.filter(dive => hasStatus('inProgress', dive, '3')),
  goalDives3: DIVES.filter(dive => hasStatus('goal', dive, '3')),
  learnedDives5: DIVES.filter(dive => hasStatus('learned', dive, '5')),
  inProgressDives5: DIVES.filter(dive => hasStatus('inProgress', dive, '5')),
  goalDives5: DIVES.filter(dive => hasStatus('goal', dive, '5')),
  learnedDives7: DIVES.filter(dive => hasStatus('learned', dive, '7')),
  inProgressDives7: DIVES.filter(dive => hasStatus('inProgress', dive, '7')),
  goalDives7: DIVES.filter(dive => hasStatus('goal', dive, '7')),
  learnedDives10: DIVES.filter(dive => hasStatus('learned', dive, '10')),
  inProgressDives10: DIVES.filter(dive => hasStatus('inProgress', dive, '10')),
  goalDives10: DIVES.filter(dive => hasStatus('goal', dive, '10')),
};

export default (state = initialState, action) => {
  switch (action.type) {
  }
  return state;
};
