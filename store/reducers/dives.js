import DIVES from '../../data/dummy-data';
import {
  UPDATE_DIVE
} from '../actions/dives';
import Dive from '../../models/dive';

const initialState = {
  dives: DIVES,
  //userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
  switch (action.type) {
  }
  return state;
};
