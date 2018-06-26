export default function checkCollision(matchCoords, arrCoords) {
    return arrCoords.some(coords => coords[0] === matchCoords[0] &&
        coords[1] === matchCoords[1]);
}