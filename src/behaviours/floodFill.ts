import { manhattanDistance, isCorner } from '../helpers';
import { ISnake, ICoordinate, Matrix, IBoard } from '../Types';
import { pathToFileURL } from 'url';

const visited = new Set;

export function findWalkable(arr: Matrix) {
  const walkableAreas: string[][] = [];

  // Iterate over the rows and columns
  for (let y = 0; y < arr.length; y++) {
    for (let x = 0; x < arr[y].length; x++) {
      // If the node is in the set, continue
      if (visited.has(`${x},${y}`)) {
        continue;
      }

      // If the node is not in the set,
      // kick off a traversal
      const area: string[] = traverse(arr, x, y);

      if (area) {
        walkableAreas.push(area);
      }
    }
  }

  const coordinateArrays: ICoordinate[][] = [];

  // For each walkable area
  walkableAreas.forEach((area: string[]): void => {
    // Map the coordinate strings to an ICoordinate[]
    const coordinateArray: ICoordinate[] = area.map((coordString: string) => {
      const coords = coordString.split(',');
      return {
        x: Number(coords[0]),
        y: Number(coords[1])
      }
    });

    coordinateArrays.push(coordinateArray);
  });

  // Return the coordinates for each
  // distinct walkable region on the board
  return coordinateArrays;
}

function traverse(arr: Matrix, x: number, y: number, path: string[] = []): string[] {
  // If we're going off the board, return
  if (x < 0 || y < 0 || x > arr.length - 1 || y > arr[0].length - 1) {
    return;
  }

  // If we've already looked at this node,
  // or it is unwalkable, return
  if (arr[y][x] !== 0 || visited.has(`${x},${y}`)) {
    return;
  }

  // If the space is walkable, add it to the
  // path array and the visited set
  path.push(`${x},${y}`);
  visited.add(`${x},${y}`);

  // Recursively traverse each neighbouring node
  traverse(arr, x, y + 1, path);
  traverse(arr, x, y - 1, path);
  traverse(arr, x - 1, y, path);
  traverse(arr, x + 1, y, path);

  // Return the array
  return path;
}

export function findAdjacent(us: ISnake, walkableRegions: ICoordinate[][]): ICoordinate[] {
  const ourHead = us.body[0];
  const adjacentRegions: ICoordinate[][] = [];

  for (const region of walkableRegions) {
    for (const coordinate of region) {
      if (manhattanDistance(coordinate, ourHead) === 1) {
        adjacentRegions.push(region);
        break;
      }
    }
  }

  if (adjacentRegions.length === 0) {
    return;
  }

  return adjacentRegions
    .reduce((a, b) => (a.length > b.length ? a : b), []);
}

export function findFurthestTarget(us: ISnake, region: ICoordinate[], board: IBoard) {
  const ourHead = us.body[0];
  let greatestDistance = 0;
  let furthestTarget: ICoordinate = null;

  for (const coordinate of region) {
    const distance = manhattanDistance(coordinate, ourHead);

    if (distance > greatestDistance && !isCorner(coordinate, board)) {
      greatestDistance = distance;
      furthestTarget = coordinate;
    }
  }

  return furthestTarget;
}

export function getSinglePath(start: ICoordinate, region: ICoordinate[], beenHere: Set<String>, path = []) {
  let current = start;
  if (beenHere.has(`${current.x},${current.y}`)) {
    return;
  }

  beenHere.add(`${current.x},${current.y}`);

  for (const coordinate of region) {
    if (manhattanDistance(coordinate, current) === 1) {
      path.push([coordinate.x, coordinate.y]);
      current = coordinate;

      getSinglePath(current, region, beenHere, path);
      return path;
    }
  }
}
