export const UPDATE_DIVE = 'UPDATE_DIVE';

export const updateDive = (id, name, skg, status) => {
    return {
        type: UPDATE_DIVE,
        id: id,
        diveData: {
            name,
            skg,
            status
        }
    };
};
