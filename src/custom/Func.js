export const formatDate = date => {
    let a = new Date(date);
    return a.getDate() + '/' + (a.getMonth() + 1) + '/' + a.getFullYear();
}