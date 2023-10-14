export default function addDays(days: number) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}