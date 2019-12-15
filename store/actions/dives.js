export const UPDATE_DIVE = 'UPDATE_DIVE';

export const updateDive = (id, status) => {
    return {
        type: UPDATE_DIVE,
        id: id,
        diveData: {
            status
        }
    };
};
