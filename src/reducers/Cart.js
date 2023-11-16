const cartInit = [];

const cartReducer = (state = cartInit, action) => {
    let newState = [...state];
    switch (action.type) {
        case "ADD_ITEM":
            newState.push({
                id: action.id,
                quantity: 1,
                info: action.info,
            });
            return newState;
        case "UPDATE_ITEM":
            const itemUpdate = newState.find(item => item.id === action.id);
            itemUpdate.quantity += action.quantity;
            return newState;
        case "DELETE_ITEM":
            const indexItemDelete = newState.findIndex(item => item.id === action.id);
            newState.splice(indexItemDelete, 1);
            return newState;
        case "DELETE_ALL":
            return [];
        default:
            return state;
    }
}

export default cartReducer;