// offsets a path by a given amount
// to be used in a path expression
// add path-offset expression slider control to the layer

const path = thisProperty
const pathOffset = effect("path-offset")(1).value

const sampleSize = 0.01;
const p1 = path.pointOnPath(0)
const p2 = path.pointOnPath(sampleSize)

// estimate path length
const pathLength = length(p1, p2) * 1 / sampleSize

const nPoints = Math.ceil(pathLength * 0.3)
const points = []

for (let i = 0; i < nPoints; i++) {
    const offset = (i / (nPoints - 1)) * 0.9999999 // avoid 1.0 for last normalOnPath point
    const point = path.pointOnPath(offset)
    const norm = normalize(path.normalOnPath(offset))
    const offsetPoint = add(point, mul(norm, pathOffset))
    points.push(offsetPoint)
}

createPath(points, [], [], path.isClosed())