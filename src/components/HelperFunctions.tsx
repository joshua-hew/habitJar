
export const getTodaysDate = () => {
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const today_string = mm + '-' + dd + '-' + yyyy;

    return today_string
}

export const dateToString = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();

    const date_string = mm + '-' + dd + '-' + yyyy;

    return date_string
}
