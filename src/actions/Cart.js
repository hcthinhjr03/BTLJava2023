export const add = (id, item) => {
    return {
        type: "ADD_ITEM",
        id: id,
        info: item,
    };
}

export const updateItem = (id, quantity) => {
    return {
        type: "UPDATE_ITEM",
        id: id,
        quantity: quantity
    };
}

export const deleteItem = (id) => {
    return {
        type: "DELETE_ITEM",
        id: id
    }
}

export const deleteAll = () => {
    return {
        type: "DELETE_ALL"
    }
}