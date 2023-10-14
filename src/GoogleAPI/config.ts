const clientId = "57090579544-pq7ur7r2r42uqpd6uq5r95g3s55a9jme.apps.googleusercontent.com";
const apiKey = "AIzaSyBQLBw71zHs2WEwyepFCOmr7zhdrw9qTBU";
const discoveryDocs = "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest";
const scopes = "https://www.googleapis.com/auth/calendar.readonly";
export const configApiCalendar = {
    clientId: clientId,
    apiKey: apiKey,
    scope: scopes,
    discoveryDocs: [discoveryDocs],
};