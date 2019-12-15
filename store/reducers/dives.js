import DIVES from '../../data/dummy-data';
import {
  UPDATE_DIVE
} from '../actions/dives';
import Dive from '../../models/dive';

const initialState = {
  dives: DIVES,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_DIVE:

      const diveIndex = state.dives.findIndex(
        dive => dive.id === action.id
      );

      if (diveIndex === -1) {
        return {
          ...state
        }
      }

      const updatedDives = [...state.dives];

      const status = updatedDives[diveIndex].status;

      status["1"] = { ...updatedDives[diveIndex].status["1"], ...action.diveData.status["1"] };
      status["3"] = { ...updatedDives[diveIndex].status["3"], ...action.diveData.status["3"] };
      status["5"] = { ...updatedDives[diveIndex].status["5"], ...action.diveData.status["5"] };
      status["7"] = { ...updatedDives[diveIndex].status["7"], ...action.diveData.status["7"] };
      status["10"] = { ...updatedDives[diveIndex].status["10"], ...action.diveData.status["10"] };

      const updatedDive = new Dive(
        action.id,
        updatedDives[diveIndex].name,
        updatedDives[diveIndex].skg,
        status,
      );

      updatedDives[diveIndex] = updatedDive;

      return {
        ...state,
        dives: updatedDives
      };
  }
  return state;
};
